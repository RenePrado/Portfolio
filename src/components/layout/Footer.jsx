import { SECTIONS } from '../ui/IndexRail';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="mono site-footer__line">
          <span className="site-footer__links">
            {SECTIONS.map((s, i) => (
              <span key={s.id}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a href={`#${s.id}`} className="u-draw">
                  {s.label}
                </a>
              </span>
            ))}
          </span>
          <span aria-hidden="true"> — </span>
          <a
            href="https://github.com/RenePrado"
            target="_blank"
            rel="noopener noreferrer"
            className="u-draw"
          >
            GitHub
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://linkedin.com/in/reneprado50/"
            target="_blank"
            rel="noopener noreferrer"
            className="u-draw"
          >
            LinkedIn
          </a>
          <span className="site-footer__copy">
            {' '}
            — © {year} Rene Angelo Prado
          </span>
        </p>
      </div>
    </footer>
  );
}
