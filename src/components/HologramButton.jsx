import { useRef, useState } from 'react';
import { play } from '../sound';
// variant: "primary" (animated border, for the main action) | "danger" | "org"
// hold={ms}: press-and-hold, so players can't trigger organizer-only actions by accident
export default function HologramButton({ children, onClick, hold = 0, variant = '', disabled }) {
  const [holding, setHolding] = useState(false);
  const t = useRef(null);
  const start = () => {
    if (!hold || disabled) return;
    setHolding(true);
    t.current = setTimeout(() => { setHolding(false); play('click'); onClick && onClick(); }, hold);
  };
  const stop = () => { clearTimeout(t.current); setHolding(false); };
  const click = () => { if (hold || disabled) return; play('click'); onClick && onClick(); };
  return (
    <button className={`holo-btn ${variant} ${holding ? 'holding' : ''}`} style={{ '--hold': `${hold}ms` }}
      disabled={disabled} onClick={click} onPointerDown={start} onPointerUp={stop}
      onPointerLeave={stop} onPointerCancel={stop} onContextMenu={(e) => e.preventDefault()}>
      <span className="fill" /><span className="lbl">{children}</span>
    </button>
  );
}
