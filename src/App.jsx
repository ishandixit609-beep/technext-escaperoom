import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GAME_CONFIG } from './config/gameConfig';
import { play, prepare, unlock, setMuted, startAmbient } from './sound';
import HolocronFrame from './components/HolocronFrame';
import StatusBar from './components/StatusBar';
import OrganizerPanel from './components/OrganizerPanel';
import HologramButton from './components/HologramButton';
import StartScreen from './screens/StartScreen';
import TempleScreen from './screens/TempleScreen';
import LaserTrial from './screens/LaserTrial';
import YodaTrial from './screens/YodaTrial';
import ForceTrial from './screens/ForceTrial';
import FinalCode from './screens/FinalCode';
import VictoryScreen from './screens/VictoryScreen';

const SCREENS = [StartScreen, TempleScreen, LaserTrial, YodaTrial, ForceTrial, FinalCode, VictoryScreen];
const BG = ['start', 'temple', 'laser', 'yoda', 'force', 'final', 'victory'];
const LAST = SCREENS.length - 1;

export default function App() {
  const [screen, setScreen] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.timeLimitSeconds);
  const [running, setRunning] = useState(false);
  const [muted, setMute] = useState(false);
  const [organizer, setOrganizer] = useState(false);
  const [score, setScore] = useState(GAME_CONFIG.startingScore);
  const [signal, setSignal] = useState({ type: null, n: 0 });
  const [runId, setRunId] = useState(0);
  const taps = useRef({ n: 0, t: 0 });
  const expired = timeLeft <= 0;
  const ticking = running && !expired && screen < LAST;

  useEffect(() => {
    if (!ticking) return;
    const id = setInterval(() => setTimeLeft((t) => {
      const nt = Math.max(0, t - 1);
      // Quiet clock-tick once under the amber threshold (5:00 by default in gameConfig).
      if (nt > 0 && nt <= GAME_CONFIG.amberAtSeconds) play('tick');
      return nt;
    }), 1000);
    return () => clearInterval(id);
  }, [ticking]);
  useEffect(() => { if (running) startAmbient(); }, [running]);
  useEffect(() => { if (expired) play('error'); }, [expired]);
  useEffect(() => { if (screen > 0) play('transition'); }, [screen]);
  useEffect(() => {
    prepare();
    const firstTouch = () => { unlock(); };
    window.addEventListener('pointerdown', firstTouch, { once: true });
    const key = (e) => { if (e.shiftKey && e.key.toLowerCase() === 'o') setOrganizer((o) => !o); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const next = useCallback(() => setScreen((s) => Math.min(s + 1, LAST)), []);
  const signalTo = (type) => setSignal((s) => ({ type, n: s.n + 1 }));
  const reset = () => {
    setScreen(0); setTimeLeft(GAME_CONFIG.timeLimitSeconds); setRunning(false);
    setScore(GAME_CONFIG.startingScore); setOrganizer(false); setRunId((r) => r + 1);
  };
  const toggleMute = () => { setMute((m) => { setMuted(!m); return !m; }); };
  // Hidden organizer hotspot: tap the top-left corner 5 times quickly (or press Shift + O)
  const hotspot = () => {
    const now = Date.now(), r = taps.current;
    r.n = now - r.t < 2000 ? r.n + 1 : 1; r.t = now;
    if (r.n >= 5) { r.n = 0; setOrganizer(true); }
  };

  const Screen = SCREENS[screen];
  return (
    <HolocronFrame bgKey={BG[screen]} screen={screen} intense={screen === LAST}>
      <div className="app">
        <StatusBar timeLeft={timeLeft} muted={muted} onMute={toggleMute} />
        <div className="content">
          {expired ? (
            <div className="screen"><div className="stage center">
              <h1 className="red-text">TIME EXPIRED</h1>
              <p className="quote big-quote">THE TEMPLE HAS FALLEN.</p>
              <HologramButton variant="danger" onClick={reset}>RESTART</HologramButton>
            </div></div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={`${runId}-${screen}`} className="screen"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px) brightness(2)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px) brightness(1.4)' }}
                transition={{ duration: 0.45 }}>
                <div className="sweep" />
                <Screen next={next} startTimer={() => setRunning(true)} timeLeft={timeLeft} signal={signal} score={score} onEnd={reset} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      <div className="hotspot" onPointerDown={hotspot} />
      {organizer && (
        <OrganizerPanel screen={screen} timeLeft={timeLeft} running={running} score={score}
          onClose={() => setOrganizer(false)}
          onVerifyLaser={() => screen === 2 && signalTo('laser')}
          onVerifyYoda={() => screen === 3 && next()}
          onVerifyForce={() => screen === 4 && signalTo('force')}
          onSkip={next} onReset={reset} onPause={() => setRunning(false)} onResume={() => setRunning(true)}
          onHint={(c) => setScore((s) => Math.max(0, s - c))} />
      )}
    </HolocronFrame>
  );
}
