import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
