import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { MenuIcon, CloseIcon } from '../ui/Icons';
import { profile } from '../../data/profile';

const NAV = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#journey'],
  ['Stack', '#stack'],
  ['Contact', '#contact']
];

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onFocus = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('focusin', onFocus);
    return () => document.removeEventListener('focusin', onFocus);
  }, [open]);

  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <a href="#top" className="site-header__brand mono">
          {profile.name}
        </a>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="site-nav__link u-draw">
              {label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-btn site-header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              className="mobile-menu__link"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="mono mobile-menu__num">0{i + 2}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
