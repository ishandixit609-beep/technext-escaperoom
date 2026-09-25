export default function ForceGrid({ pattern, accepted }) {
  return (
    <div className={`force-grid ${accepted ? 'accepted' : ''}`}>
      {pattern.map((on, i) => <div key={i} className={`cell ${on ? 'on' : ''}`}><span>{i + 1}</span></div>)}
    </div>
  );
}
