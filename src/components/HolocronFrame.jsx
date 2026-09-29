import { useEffect } from 'react';
import Particles from './Particles';
import HoloGem from './HoloGem';
import { BACKGROUNDS } from '../config/gameConfig';

// The "device" every screen lives inside: real backgrounds (no dark filter over them),
// thin corner brackets, and tiny technical readouts in the corners.
export default function HolocronFrame({ bgKey, screen, intense, children }) {
  useEffect(() => { Object.values(BACKGROUNDS).forEach((b) => { new Image().src = b.src; }); }, []);
  return (
    <div className={`frame ${intense ? 'intense' : ''}`} data-screen={screen}>
      {Object.entries(BACKGROUNDS).map(([k, b]) => (
        <div key={k} className={`frame-bg ${k === bgKey ? 'on' : ''}`}
          style={{ backgroundImage: `url(${b.src})`, backgroundPosition: b.position || 'center', transitionDuration: `${b.fadeMs || 1200}ms` }} />
      ))}
      <div className="edge-fade" />
      <Particles />
      <HoloGem />
      <div className="scan" />
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      {children}
    </div>
  );
}
