export default function InspectToggle({ inspect, onToggle }) {
  return (
    <button
      type="button"
      className="inspect-toggle"
      onClick={onToggle}
      aria-pressed={inspect}
      aria-label="Toggle layout grid overlay (G)"
      title="Grid overlay (G)"
    >
      <span className="inspect-toggle__grid" aria-hidden="true" />
      Grid
    </button>
  );
}
