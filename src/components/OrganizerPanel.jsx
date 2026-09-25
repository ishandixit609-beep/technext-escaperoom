import HologramButton from './HologramButton';
import Timer from './Timer';
import { HINT_COSTS } from '../config/gameConfig';
const NAMES = ['LOCKED HOLOCRON', 'TEMPLE ARCHIVE', 'LASER TRIAL', 'YODA TRIAL', 'FORCE TRIAL', 'FINAL HOLOCRON', 'VICTORY'];
export default function OrganizerPanel({ screen, timeLeft, running, score, onClose, onVerifyLaser, onVerifyYoda, onVerifyForce, onSkip, onReset, onPause, onResume, onHint }) {
  return (
    <div className="org">
      <div className="org-panel">
        <div className="org-head"><h2>JEDI GAME MASTER</h2><button className="org-close" onClick={onClose}>CLOSE ✕</button></div>
        <div className="org-row">
          <div>TIME REMAINING<Timer seconds={timeLeft} /><small>{running ? 'RUNNING' : 'PAUSED / NOT STARTED'}</small></div>
          <div>CURRENT TRIAL<b>{NAMES[screen]}</b></div>
          <div>TEAM SCORE<b>{score}</b></div>
        </div>
        <div className="org-grid">
          <HologramButton variant="org" onClick={onVerifyLaser}>VERIFY LASER</HologramButton>
          <HologramButton variant="org" onClick={onVerifyYoda}>VERIFY YODA</HologramButton>
          <HologramButton variant="org" onClick={onVerifyForce}>VERIFY FORCE</HologramButton>
          <HologramButton variant="org" onClick={onSkip}>SKIP CURRENT TRIAL</HologramButton>
          <HologramButton variant="org" onClick={onPause}>PAUSE TIMER</HologramButton>
          <HologramButton variant="org" onClick={onResume}>RESUME TIMER</HologramButton>
        </div>
        <div className="org-hints">
          {HINT_COSTS.map((h) => <HologramButton key={h.label} variant="org" onClick={() => onHint(h.cost)}>{h.label} −{h.cost}</HologramButton>)}
        </div>
        <HologramButton variant="org danger" hold={1500} onClick={onReset}>HOLD TO RESET GAME</HologramButton>
      </div>
    </div>
  );
}
