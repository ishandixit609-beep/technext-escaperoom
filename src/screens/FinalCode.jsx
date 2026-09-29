import CodePanel from '../components/CodePanel';
export default function FinalCode({ next }) {
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label ok-text">ALL TRIALS COMPLETE</div>
        <h1>FINAL HOLOCRON ACCESS</h1>
        <p className="quote big-quote">
          “I am not a number.<br />
          I am not a word.<br />
          I am a key.”
        </p>
      </div>
      <CodePanel eyebrow="FINAL ACCESS" title="ENTER FINAL ACCESS CODE" scramble
        length={4} dramatic successDelay={2400} enterCount={3} check={() => false} onSuccess={next} />
    </div>
  );
}
