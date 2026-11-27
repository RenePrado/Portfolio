// Inline SVG icons — kept tiny and dependency-free.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false
};

export function SunIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...base} {...props}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...base} {...props}>
      <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" {...base} {...props}>
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" {...base} {...props}>
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base} {...props}>
      <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 12.5h11" />
    </svg>
  );
}

export function ExternalIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" {...base} {...props}>
      <path d="M6.5 3H3.5v9.5h9V9.5M9 3h4v4M13 3 7.5 8.5" />
    </svg>
  );
}

export function CopyIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...base} {...props}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="0.5" />
      <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" {...base} {...props}>
      <path d="M6 3h7v7M13 3 6.5 9.5" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...base} {...props}>
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}
