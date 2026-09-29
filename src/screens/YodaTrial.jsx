import { useState } from 'react';
import HologramButton from '../components/HologramButton';
import JediCharacter from '../components/JediCharacter';
import { play } from '../sound';
import { GAME_CONFIG, CHARACTERS } from '../config/gameConfig';

export default function YodaTrial({ next }) {
  const [phase, setPhase] = useState('intro'); // 'intro' -> 'answer'
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle');
  const submit = () => {
    const ok = val.toUpperCase().replace(/[^A-Z]/g, '') === GAME_CONFIG.yodaAnswer;
    if (ok) { setStatus('ok'); play('success'); setTimeout(next, 2200); }
    else { setStatus('error'); play('error'); setTimeout(() => { setStatus('idle'); setVal(''); }, 1100); }
  };
  const yoda = <JediCharacter image={CHARACTERS.yoda} position="bottom-right" width={phase === 'intro' ? 20 : 13} opacity={phase === 'intro' ? 0.5 : 0.28} />;

  if (phase === 'intro') return (
    <div className="stage center">{yoda}
      <div className="badge">TRIAL III</div>
      <h1>THE TRIAL OF THE WISE</h1>
      <p className="quote big-quote">
        “What is heard is not always spoken.<br />
        What is folded is not always hidden.<br />
        Seek the wisdom closest to the old master.”
      </p>
      <HologramButton variant="large" onClick={() => setPhase('answer')}>BEGIN TRIAL</HologramButton>
    </div>
  );
  return (
    <div className="stage center">{yoda}
      {status === 'error' && <div className="flash-red" />}
      {status === 'ok' ? (<><h1>TRIAL ACCEPTED</h1><p className="quote big-quote">THE FORCE REMEMBERS.</p></>) : (<>
        <p className="quote big-quote">“But the Jedi do not listen like the others.”</p>
        <input className={`holo-input ${status}`} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="ENTER ANSWER" autoCapitalize="characters" autoCorrect="off" autoComplete="off" spellCheck="false" />
        <div className="keypad-msg">{status === 'error' ? <span className="red-text">ACCESS DENIED · TRY AGAIN</span> : '\u00A0'}</div>
        <HologramButton onClick={submit}>ENTER ANSWER</HologramButton></>)}
    </div>
  );
}
