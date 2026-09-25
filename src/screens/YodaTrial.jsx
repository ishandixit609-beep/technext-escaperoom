import { useState } from 'react';
import HologramButton from '../components/HologramButton';
import JediCharacter from '../components/JediCharacter';
import { play } from '../sound';
import { GAME_CONFIG, CHARACTERS } from '../config/gameConfig';

export default function YodaTrial({ next }) {
  const [phase, setPhase] = useState('intro');
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
      <p className="quote big-quote">“One of us has lost<br />what makes us whole.”</p>
      <p className="label">FIND THE ONE WHO IS INCOMPLETE.</p>
      <HologramButton variant="large" onClick={() => setPhase('search')}>BEGIN TRIAL</HologramButton>
    </div>
  );
  if (phase === 'search') return (
    <div className="stage center">{yoda}
      <h1 className="pulse-text">TRIAL IN PROGRESS</h1>
      <p className="quote big-quote">THE ANSWER IS NOT ON THIS SCREEN.</p>
      <HologramButton onClick={() => setPhase('answer')}>ANSWER FOUND</HologramButton>
    </div>
  );
  return (
    <div className="stage center">{yoda}
      {status === 'error' && <div className="flash-red" />}
      {status === 'ok' ? (<><h1>TRIAL ACCEPTED</h1><p className="quote big-quote">THE FORCE REMEMBERS.</p></>) : (<>
        <div className="label ok-text">THE ANSWER HAS BEEN FOUND.</div>
        <p className="quote">BUT THE JEDI DO NOT SPEAK LIKE THE OTHERS.</p>
        <h1>“ANSWER IT AS YODA WOULD.”</h1>
        <input className={`holo-input ${status}`} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="ENTER ANSWER" autoCapitalize="characters" autoCorrect="off" autoComplete="off" spellCheck="false" />
        <div className="keypad-msg">{status === 'error' ? <span className="red-text">ACCESS DENIED · TRY AGAIN</span> : '\u00A0'}</div>
        <HologramButton onClick={submit}>ENTER ANSWER</HologramButton></>)}
    </div>
  );
}
