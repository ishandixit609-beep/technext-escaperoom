import { useCallback, useEffect, useRef, useState } from 'react';
import { play } from '../sound';
const NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'ENTER'];
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

// mode="numeric" (default) or "alpha" (on-screen letters, so the iPad's own keyboard never pops up).
// A physical keyboard also works, which is handy while testing.
export default function Keypad({ length, check, onSuccess, onFirstInput, successDelay = 1600, dramatic, mode = 'numeric' }) {
  const [digits, setDigits] = useState('');
  const [status, setStatus] = useState('idle');
  const first = useRef(true);

  const submit = useCallback(() => {
    if (!digits) return;
    if (check(digits)) {
      setStatus('ok'); play('success'); setTimeout(onSuccess, successDelay);
    } else {
      setStatus('error'); play('error');
      setTimeout(() => { setStatus('idle'); setDigits(''); }, 1300);
    }
  }, [digits, check, onSuccess, successDelay]);

  const press = useCallback((k) => {
    if (status !== 'idle') return;
    if (first.current) { first.current = false; onFirstInput && onFirstInput(); }
    if (k === 'ENTER') return submit();
    play('click');
    if (k === 'CLEAR') return setDigits('');
    setDigits((d) => (d.length < length ? d + k : d));
  }, [status, submit, length, onFirstInput]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      const k = e.key.toUpperCase();
      if (e.key === 'Enter') press('ENTER');
      else if (e.key === 'Backspace' || e.key === 'Escape') press('CLEAR');
      else if (mode === 'numeric' ? /^[0-9]$/.test(k) : /^[A-Z]$/.test(k)) press(k);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press, mode]);

  const Key = ({ k }) => (
    <button className={`key ${k.length > 1 ? 'key-wide' : ''} ${k === 'ENTER' ? 'key-enter' : ''}`} onClick={() => press(k)}>
      {k === 'ENTER' ? <>ENTER&nbsp;→</> : k}
    </button>
  );
  return (
    <div className={`keypad ${status} ${mode}`}>
      {status === 'error' && <div className="flash-red" />}
      {status === 'ok' && dramatic && <div className="energy-pulse" />}
      <div className="slots">
        {Array.from({ length }, (_, i) => (
          <span key={i} className={digits[i] ? 'filled' : i === digits.length && status === 'idle' ? 'active' : ''}>
            {digits[i] || '\u00B7'}
          </span>
        ))}
      </div>
      <div className="keypad-msg">
        {status === 'error' ? <span className="red-text">ACCESS DENIED · TRY AGAIN</span>
          : status === 'ok' ? <span className="ok-text">ACCESS GRANTED</span> : '\u00A0'}
      </div>
      {mode === 'numeric' ? (
        <div className="keys">{NUM.map((k) => <Key key={k} k={k} />)}</div>
      ) : (
        <div className="keys-alpha">
          {ROWS.map((r) => <div className="key-row" key={r}>{[...r].map((k) => <Key key={k} k={k} />)}</div>)}
          <div className="key-row"><Key k="CLEAR" /><Key k="ENTER" /></div>
        </div>
      )}
    </div>
  );
}
