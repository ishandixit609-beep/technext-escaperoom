import CodePanel from '../components/CodePanel';
import { GAME_CONFIG } from '../config/gameConfig';

export default function LaserTrial({ next }) {
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label">TRIAL II</div>
        <h1>THE BLASTER TRIAL</h1>
        <p className="quote big-quote">
          “The empire seeks the obvious path,<br />
          the Jedi sees the path unseen.<br />
          Where the fallen one hangs,<br />
          the second reflection must meet.”
        </p>
        <p className="note">WHAT YOU HAVE GATHERED IS NOT SILENT. LET IT SPEAK NOW.</p>
      </div>
      <CodePanel eyebrow="TRIAL II · BLASTER TRIAL" title="CODE 2 REQUIRED"
        length={3} check={(c) => c === GAME_CONFIG.laserCode} onSuccess={next} />
    </div>
  );
}
