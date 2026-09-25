import { useEffect, useRef, useState } from 'react';
import CodePanel from '../components/CodePanel';
import HologramButton from '../components/HologramButton';
import { GAME_CONFIG } from '../config/gameConfig';

export default function LaserTrial({ next, signal }) {
  const [verified, setVerified] = useState(false);
  const seen = useRef(signal.n);
  useEffect(() => { if (signal.n !== seen.current && signal.type === 'laser') setVerified(true); }, [signal]);

  if (!verified) {
    return (
      <div className="stage center">
        <div className="badge">TRIAL II</div>
        <h1>THE BLASTER TRIAL</h1>
        <p className="quote big-quote">“A Jedi does not attack<br />the target directly.<br />Align the path.”</p>
        <HologramButton hold={1500} onClick={() => setVerified(true)}>HOLD TO VERIFY TRIAL</HologramButton>
      </div>
    );
  }
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label ok-text">TARGET ACQUIRED</div>
        <h1>SIGNAL DECODED</h1>
        <p className="quote">LOOK BENEATH THE FALLEN ONE.</p>
      </div>
      <CodePanel eyebrow="TRIAL II · BLASTER TRIAL" title="CODE 2 REQUIRED"
        length={3} check={(c) => c === GAME_CONFIG.laserCode} onSuccess={next} />
    </div>
  );
}