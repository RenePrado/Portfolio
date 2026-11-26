// The Inspect overlay — 12 cells drawn with the same .page/.grid12 metrics
// as the layout, so the lines cannot drift. aria-hidden + pointer-events:none.
export default function InspectOverlay() {
  return (
    <div className="inspect-overlay" aria-hidden="true">
      <div className="page">
        <div className="grid12">
          {Array.from({ length: 12 }, (_, i) => (
            <div className="col" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
