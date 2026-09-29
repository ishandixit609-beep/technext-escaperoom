import HologramButton from '../components/HologramButton';

export default function VoiceTrial({ next }) {
  return (
    <div className="stage center">
      <div className="badge">TRIAL IV</div>
      <h1>THE TRIAL OF VOICES</h1>
      <p className="quote big-quote">
        “Six voices have lost their names,<br />
        six names have lost their voices.<br />
        Bring each voice back to its name.”
      </p>
      <p className="quote">
        But beware… not every voice belongs where you think.<br />
        When the wrong pair is chosen, the music will reveal what you must do.
      </p>
      <p className="note">BEGIN WHEN YOU ARE READY.</p>
      <HologramButton hold={1500} onClick={next}>HOLD TO VERIFY TRIAL</HologramButton>
    </div>
  );
}
