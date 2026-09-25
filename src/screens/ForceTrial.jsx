import { useEffect, useRef, useState } from 'react';
import ForceGrid from '../components/ForceGrid';
import HologramButton from '../components/HologramButton';
import { FORCE_PATTERN } from '../config/gameConfig';

export default function ForceTrial({ next, signal }) {
  const [accepted, setAccepted] = useState(false);
  const seen = useRef(signal.n);
  useEffect(() => { if (signal.n !== seen.current && signal.type === 'force') setAccepted(true); }, [signal]);
  useEffect(() => { if (accepted) { const t = setTimeout(next, 3800); return () => clearTimeout(t); } }, [accepted, next]);
  return (
    <div className="stage">
      <div className="col">
        <div className="badge">TRIAL IV</div>
        {accepted ? (<>
          <h1>FORMATION DETECTED</h1><p className="quote big-quote">JEDI FORMATION ACCEPTED.<br />THE FORCE RESPONDS.</p></>) : (<>
          <h1>THE FORCE BINDS US ALL.</h1>
          <p className="quote big-quote">“NINE POSITIONS.<br />ONE FORMATION.”</p>
          <p className="quote">Stand where the Force calls you.</p>
          <HologramButton hold={1500} onClick={() => setAccepted(true)}>HOLD TO VERIFY FORMATION</HologramButton></>)}
      </div>
      <div className="col col-keys"><ForceGrid pattern={FORCE_PATTERN} accepted={accepted} /><p className="note">GREEN TILES = OCCUPIED</p></div>
    </div>
  );
}
