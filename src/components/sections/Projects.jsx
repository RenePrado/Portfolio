import { projects } from '../../data/projects';
import TagList from '../ui/TagList';
import { ExternalIcon } from '../ui/Icons';

// Temporary minimal project list until the §7 card layout lands.
export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="grid12">
        <div className="section-head">
          <h2 id="projects-title" className="section-title">
            Projects
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="projects-index" role="list" aria-label="Projects">
        {projects.map((p) => (
          <article className="project-row" role="listitem" key={p.id}>
            <div className="project-row__head">
              <h3 className="project-row__title">{p.title}</h3>
              <p className="mono project-row__dates">{p.dates}</p>
            </div>
            <div className="project-row__detail">
              <p className="project-row__objective">{p.objective}</p>
              {p.bullets?.length > 0 && (
                <ul className="project-row__bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {p.tech?.length > 0 && (
                <p className="project-row__tech">
                  <TagList items={p.tech} />
                </p>
              )}
              {p.links.length > 0 && (
                <div className="project-row__links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-row__link u-draw"
                    >
                      {l.label} <ExternalIcon />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
