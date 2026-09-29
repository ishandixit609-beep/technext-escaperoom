// The Jedi emblem (from the PNG embedded in index.css) as a slow-floating glow.
// place: "behind" (behind the keypad) or "center".
export default function HoloGem({ place = 'behind' }) {
  return <div className={`holo-gem ${place}`} />;
}