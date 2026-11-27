import { useCallback, useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { ArrowUpRightIcon } from '../ui/Icons';
import { profile } from '../../data/profile';

const NAV_LINKS = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Contact', '#contact']
];

const SPY_IDS = NAV_LINKS.map(([, href]) => href.slice(1));

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const sheetRef = useRef(null);

  // Header gains its surface after ~40px of scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy — the section nearest the top of the viewport wins.
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // Pick the visible section closest to the top of the page order.
        const hit = SPY_IDS.find((id) => visible.has(id));
        if (hit) setActive(hit);
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Esc closes; focus is trapped inside the sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    document.body.style.overflow = 'hidden';
    sheet?.querySelector('a[href]')?.focus();
    const focusables = () =>
      sheet?.querySelectorAll('a[href], button:not([disabled])') ?? [];
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [...focusables()].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="page site-header__inner">
        <a href="#top" className="site-header__brand mono">
          {profile.nameShort}
        </a>

        <nav className="site-nav" aria-label="Primary">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`site-nav__link${active === href.slice(1) ? ' is-active' : ''}`}
              aria-current={active === href.slice(1) ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav__link site-nav__link--resume"
          >
            Résumé <ArrowUpRightIcon />
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-sheet"
          ref={sheetRef}
          className="mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="mobile-sheet__nav" aria-label="Mobile">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="mobile-sheet__link" onClick={close}>
                {label}
              </a>
            ))}
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-sheet__link"
              onClick={close}
            >
              Résumé ↗
            </a>
          </nav>
          <div className="mobile-sheet__foot">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      )}
    </header>
  );
}
