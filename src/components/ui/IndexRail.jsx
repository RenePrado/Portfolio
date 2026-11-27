import { useEffect, useState } from 'react';

export const SECTIONS = [
  { id: 'top', index: '01', label: 'Top' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'projects', index: '03', label: 'Projects' },
  { id: 'journey', index: '04', label: 'Experience' },
  { id: 'stack', index: '05', label: 'Stack' },
  { id: 'contact', index: '06', label: 'Contact' }
];

// Sticky left index rail — visible at ≥64rem (1024px) where the header gives
// up inline section links. Below that the header nav / mobile menu covers it.
export default function IndexRail() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="index-rail" aria-label="Page sections">
      <ol className="index-rail__list">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="index-rail__link mono"
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="index-rail__num">{s.index}</span>
              <span className="index-rail__label">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
