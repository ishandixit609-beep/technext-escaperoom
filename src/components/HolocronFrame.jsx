import { useEffect } from 'react';
import { BACKGROUNDS, SCREEN_META } from '../config/gameConfig';

// The "device" every screen lives inside: real backgrounds (no dark filter over them),
// thin corner brackets, and tiny technical readouts in the corners.
export default function HolocronFrame({ bgKey, screen, intense, children }) {
  useEffect(() => { Object.values(BACKGROUNDS).forEach((b) => { new Image().src = b.src; }); }, []);
  return (
    <div className={`frame ${intense ? 'intense' : ''}`}>
      {Object.entries(BACKGROUNDS).map(([k, b]) => (
        <div key={k} className={`frame-bg ${k === bgKey ? 'on' : ''}`}
          style={{ backgroundImage: `url(${b.src})`, backgroundPosition: b.position || 'center', transitionDuration: `${b.fadeMs || 1200}ms` }} />
      ))}
      <div className="edge-fade" />
      <div className="scan" />
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      {SCREEN_META[screen] && (
        <div className="meta meta-l">{SCREEN_META[screen].map((l) => <div key={l}>{l}</div>)}</div>
      )}
      {children}
    </div>
  );
}
