import { GAME_CONFIG } from '../config/gameConfig';
// white normally, amber when low, red + pulse when critical
export default function Timer({ seconds }) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  const tone = seconds <= GAME_CONFIG.redAtSeconds ? 'red' : seconds <= GAME_CONFIG.amberAtSeconds ? 'amber' : '';
  return <div className={`timer ${tone}`}>{m}:{s}</div>;
}
