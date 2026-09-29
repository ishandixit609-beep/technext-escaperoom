import Keypad from './Keypad';
// The bracket-framed console panel every code-entry screen shares.
export default function CodePanel({ eyebrow, title, ...keypadProps }) {
  return (
    <div className="code-panel">
      <i className="pc pc-tl" /><i className="pc pc-br" />
      {eyebrow && <div className="cp-eyebrow">{eyebrow}</div>}
      <div className="cp-title"><span className="cp-tick" />{title}</div>
      <Keypad {...keypadProps} />
    </div>
  );
}
