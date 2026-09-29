import { useState } from 'react';
import CodePanel from '../components/CodePanel';
import { GAME_CONFIG } from '../config/gameConfig';

export default function StartScreen({ next, startTimer }) {
  const [phase, setPhase] = useState('welcome'); // 'welcome' -> 'code'
  const begin = () => { startTimer(); setPhase('code'); };

  if (phase === 'welcome') {
    return (
      <div className="stage center welcome" onClick={begin}>
        <div className="label">HOLOCRON SYSTEM</div>
        <h1>THE LOST JEDI HOLOCRON</h1>
        <p className="quote big-quote briefing">
          The Jedi Temple has been breached. A corrupted Holocron containing the
          location of the last Jedi has been hidden. You have 20 minutes before
          the Empire detects your presence. Follow the Force, recover the
          Holocron, and transmit its coordinates.
        </p>
        <div className="tap-prompt">TOUCH TO CONTINUE</div>
      </div>
    );
  }
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label">HOLOCRON SYSTEM</div>
        <h1 className="flicker">CORRUPTED TRANSMISSION</h1>
        <p className="quote">THE JEDI TEMPLE HAS FALLEN.</p>
      </div>
      <CodePanel eyebrow="TRIAL I · TEMPLE ARCHIVE" title="ENTER ACCESS CODE"
        length={4} check={(c) => c === GAME_CONFIG.accessCode} onSuccess={next} />
    </div>
  );
}
