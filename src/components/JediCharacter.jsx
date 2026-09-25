import { useState } from 'react';
// Decorative floating character. width is in rem. Set tint={true} for a green hologram look.
export default function JediCharacter({ image, position = 'bottom-right', width = 10, opacity = 0.3, rotate = 0, float = true, tint = false, style }) {
  const [ok, setOk] = useState(true);
  if (!image || !ok) return null;
  return (
    <img src={image} alt="" draggable={false} onError={() => setOk(false)}
      className={`jedi-char pos-${position} ${float ? 'float' : ''} ${tint ? 'tint' : ''}`}
      style={{ width: `${width}rem`, opacity, '--rot': `${rotate}deg`, ...style }} />
  );
}
