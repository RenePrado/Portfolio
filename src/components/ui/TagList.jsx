// Tech/contribution lists rendered as quiet mono text — no chips.
export default function TagList({ items, className = '' }) {
  if (!items?.length) return null;
  return (
    <span className={`mono tag-list ${className}`}>
      {items.join(', ')}
    </span>
  );
}
