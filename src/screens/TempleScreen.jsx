import HologramButton from '../components/HologramButton';
export default function TempleScreen({ next }) {
  return (
    <div className="stage center">
      <div className="badge">TRIAL I · TEMPLE ARCHIVE</div>
      <div className="label ok-text">ACCESS GRANTED · TRANSMISSION RECEIVED</div>
      <h1>JEDI TEMPLE ARCHIVE</h1>
      <p className="quote big-quote">“See what cannot be seen.<br />A Jedi does not read what is written.<br />They read what is reflected.”</p>
      <HologramButton variant="large" onClick={next}>BEGIN TRIAL</HologramButton>
      <p className="note">THE FORCE IS PATIENT. YOUR TEAM IS NOT. HINTS COST POINTS.</p>
    </div>
  );
}
