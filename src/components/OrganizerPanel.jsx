import HologramButton from './HologramButton';
import Timer from './Timer';
const NAMES = ['LOCKED HOLOCRON', 'TEMPLE ARCHIVE', 'LASER TRIAL', 'YODA TRIAL', 'VOICE TRIAL', 'FINAL HOLOCRON', 'VICTORY'];
export default function OrganizerPanel({ screen, timeLeft, running, onClose, onSkip, onReset, onPause, onResume }) {
  return (
    <div className="org">
      <div className="org-panel">
        <div className="org-head"><h2>JEDI GAME MASTER</h2><button className="org-close" onClick={onClose}>CLOSE ✕</button></div>
        <div className="org-row">
          <div>TIME REMAINING<Timer seconds={timeLeft} /><small>{running ? 'RUNNING' : 'PAUSED / NOT STARTED'}</small></div>
          <div>CURRENT TRIAL<b>{NAMES[screen]}</b></div>
        </div>
        <div className="org-grid">
          <HologramButton variant="org" onClick={onSkip}>SKIP CURRENT TRIAL</HologramButton>
          <HologramButton variant="org" onClick={onPause}>PAUSE TIMER</HologramButton>
          <HologramButton variant="org" onClick={onResume}>RESUME TIMER</HologramButton>
        </div>
        <HologramButton variant="org danger" hold={1500} onClick={onReset}>HOLD TO RESET GAME</HologramButton>
      </div>
    </div>
  );
}
