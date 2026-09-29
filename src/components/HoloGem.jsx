// Slowly turning holocron polyhedron, bottom-centre of every screen.
export default function HoloGem() {
  return (
    <svg className="holo-gem" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="50" cy="50" r="46" strokeDasharray="3 5" className="gem-ring" />
      <g className="gem-core">
        <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" />
        <path d="M50 14 L50 86 M18 32 L82 68 M82 32 L18 68 M18 32 L50 50 L82 32 M18 68 L50 50 L82 68" opacity=".7" />
      </g>
    </svg>
  );
}
