import Timer from './Timer';
import { GAME_CONFIG } from '../config/gameConfig';
const SpeakerIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" />
    {off ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M15.5 9a4 4 0 010 6M18 6.5a8 8 0 010 11" />}
  </svg>
);
const Emblem = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 2 L20 12 L12 22 L4 12 Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
export default function StatusBar({ timeLeft, muted, onMute }) {
  const critical = timeLeft <= GAME_CONFIG.redAtSeconds;
  return (
    <header className="status-bar">
      <div className="sb-left">
        <span className={`dot ${critical ? 'red' : ''}`} />
        <div><b>JEDI ARCHIVE</b><small>TEMPLE SECURITY NETWORK</small></div>
      </div>
      <div className="sb-mid"><Emblem /><span className={critical ? 'red-text' : ''}>{critical ? 'HOLOCRON LINK UNSTABLE' : 'HOLOCRON LINK STABLE'}</span></div>
      <div className="sb-right">
        <Timer seconds={timeLeft} />
        <button className="mute" onClick={onMute} aria-label={muted ? 'Sound off' : 'Sound on'}><SpeakerIcon off={muted} /></button>
      </div>
    </header>
  );
}
