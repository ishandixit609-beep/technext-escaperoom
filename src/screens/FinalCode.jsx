import CodePanel from '../components/CodePanel';
import { GAME_CONFIG, TRIAL_RECORD } from '../config/gameConfig';
export default function FinalCode({ next }) {
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label ok-text">ALL TRIALS COMPLETE</div>
        <h1>FINAL HOLOCRON ACCESS</h1>
        <div className="record">
          <div className="label">TRIAL RECORD</div>
          {TRIAL_RECORD.map(([n, v]) => <div key={n} className="rec-row"><span>{n}</span><b>{v}</b></div>)}
        </div>
        <p className="quote">THE HOLOCRON REMEMBERS THE ORDER.</p>
      </div>
      <CodePanel eyebrow="FINAL ACCESS" title="ENTER FINAL ACCESS CODE"
        length={4} dramatic successDelay={2400} check={(c) => c === GAME_CONFIG.finalCode} onSuccess={next} />
    </div>
  );
}
