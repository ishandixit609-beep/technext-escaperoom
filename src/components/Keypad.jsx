import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { play } from '../sound';
const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// scramble (default on): digits are shuffled on every mount and after every wrong attempt.
// enterCount=N: any typed code is rejected; pressing ENTER N times in a row with nothing typed opens the lock.
export default function Keypad({ length, check, onSuccess, onFirstInput, successDelay = 1600, dramatic, mode = 'numeric', scramble = true, allowEmpty = false, enterCount = 0 }) {
  const [digits, setDigits] = useState('');
  const [status, setStatus] = useState('idle');
  const [round, setRound] = useState(0);
  const [charge, setCharge] = useState(0);
  const first = useRef(true);
  const order = useMemo(() => (scramble ? shuffled(DIGITS) : DIGITS), [scramble, round]);

  const fail = useCallback(() => {
    setStatus('error'); play('error');
    setTimeout(() => { setStatus('idle'); setDigits(''); setRound((r) => r + 1); }, 1300);
  }, []);
  const win = useCallback(() => {
    setStatus('ok'); play('success'); setTimeout(onSuccess, successDelay);
  }, [onSuccess, successDelay]);

  const submit = useCallback(() => {
    if (enterCount) {
      if (digits) { setCharge(0); return fail(); }
      const n = charge + 1; setCharge(n);
      if (n < enterCount) return play('click');
      return win();
    }
    if (!digits && !allowEmpty) return;
    if (check(digits)) win(); else fail();
  }, [digits, check, allowEmpty, enterCount, charge, fail, win]);

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
    <div className={`keypad ${status} ${mode} ${enterCount ? 'subtle' : ''}`}>
      {status === 'error' && <div className="flash-red" />}
      {status === 'ok' && dramatic && <div className="energy-pulse" />}
      <div className="slots">
        {Array.from({ length }, (_, i) => (
          <span key={i} className={digits[i] ? 'filled' : i === digits.length && status === 'idle' ? 'active' : ''}>
            {digits[i] || '\u00B7'}
          </span>
        ))}
      </div>
      {enterCount > 0 && (
        <div className="pips" key={charge}>
          {Array.from({ length: enterCount }, (_, i) => <span key={i} className={i < charge ? 'on' : ''} />)}
        </div>
      )}
      <div className="keypad-msg">
        {status === 'error' ? <span className="red-text">ACCESS DENIED · TRY AGAIN</span>
          : status === 'ok' ? <span className="ok-text">ACCESS GRANTED</span> : '\u00A0'}
      </div>
      {mode === 'numeric' ? (
        <div className="keys">
          {order.slice(0, 9).map((k) => <Key key={k} k={k} />)}
          <Key k="CLEAR" /><Key k={order[9]} /><Key k="ENTER" />
        </div>
      ) : (
        <div className="keys-alpha">
          {ROWS.map((r) => <div className="key-row" key={r}>{[...r].map((k) => <Key key={k} k={k} />)}</div>)}
          <div className="key-row"><Key k="CLEAR" /><Key k="ENTER" /></div>
        </div>
      )}
    </div>
  );
}
