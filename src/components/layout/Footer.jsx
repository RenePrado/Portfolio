import { SECTIONS } from '../ui/IndexRail';
import { profile } from '../../data/profile';

const ELSEWHERE = [
  { label: 'GitHub', href: profile.githubUrl },
  { label: 'LinkedIn', href: profile.linkedinUrl },
  { label: 'Résumé', href: profile.resumePath }
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="mono site-footer__copy">© {year} Rene Angelo Prado</p>
        <nav className="site-footer__nav" aria-label="Sections">
          <ul className="site-footer__list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="u-draw">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="site-footer__nav" aria-label="Elsewhere">
          <ul className="site-footer__list">
            {ELSEWHERE.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-draw"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
