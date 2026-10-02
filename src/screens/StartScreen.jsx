import { useEffect, useState } from 'react';
import { play, stop } from '../sound';
import CodePanel from '../components/CodePanel';
import { GAME_CONFIG } from '../config/gameConfig';

export default function StartScreen({ next, startTimer }) {
  const [phase, setPhase] = useState('arm'); // 'arm' (organizer taps once) -> 'welcome' -> 'code'
  // Browsers only allow sound after a tap, so the organizer taps ENABLE SOUND first.
  // That tap starts the danger announcement, which loops until the players touch to continue.
  const arm = () => { play('announcement'); setPhase('welcome'); };
  const begin = () => { stop('announcement', 600); startTimer(); setPhase('code'); };
  useEffect(() => () => stop('announcement', 400), []);

  if (phase === 'arm') {
    return (
      <div className="stage center welcome" onClick={arm}>
        <div className="label">ORGANIZER</div>
        <div className="tap-prompt">TAP TO ENABLE SOUND</div>
      </div>
    );
  }
  if (phase === 'welcome') {
    return (
      <div className="stage center welcome" onClick={begin}>
        <div className="label">HOLOCRON SYSTEM</div>
        <h1>THE LOST JEDI HOLOCRON</h1>
        <p className="quote big-quote briefing">
          The Jedi Temple has been breached. A corrupted Holocron containing the
          location of the last Jedi has been hidden. You have 20 minutes before
          the Empire detects your presence. Follow the Force, recover the
          Holocron, and transmit its coordinates.
        </p>
        <div className="tap-prompt">TOUCH TO CONTINUE</div>
      </div>
    );
  }
  return (
    <div className="stage code-stage">
      <div className="col">
        <div className="label">HOLOCRON SYSTEM</div>
        <h1 className="flicker">CORRUPTED TRANSMISSION</h1>
        <p className="quote">THE JEDI TEMPLE HAS FALLEN.</p>
        <p className="quote clue">
          “Before hyperspace, there were worlds.<br />
          Before worlds, there were names.<br />
          Four names remain in the old archive:<br />
          the fallen, the hidden, the forested, the forsaken.<br />
          Their homes know the answer.”
        </p>
      </div>
      <CodePanel eyebrow="TRIAL I · TEMPLE ARCHIVE" title="ENTER ACCESS CODE"
        length={4} check={(c) => c === GAME_CONFIG.accessCode} onSuccess={next} />
    </div>
  );
}