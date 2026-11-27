import { projects } from '../../data/projects';
import { ArrowUpRightIcon } from '../ui/Icons';

function ProjectMedia({ project }) {
  return (
    <figure className="project__figure">
      <div className="project__media">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="project__pending" aria-hidden="true" />
        )}
        {project.mobileImage && (
          <img
            className="project__media-mobile"
            src={project.mobileImage}
            alt={`${project.title} mobile screenshot`}
            loading="lazy"
            decoding="async"
          />
        )}
        {!project.image && import.meta.env.DEV && (
          <span className="mono project__pending-label">Screenshot coming</span>
        )}
      </div>
      <figcaption className="mono project__caption">{project.figLabel}</figcaption>
    </figure>
  );
}

function ProjectLinks({ links }) {
  const items = [];
  if (links.live) items.push({ label: 'Live ↗', href: links.live });
  if (links.repo) items.push({ label: 'Code ↗', href: links.repo });
  if (items.length === 0 && links.private) {
    return <span className="mono project__private">Private repo</span>;
  }
  if (items.length === 0) return null;
  return (
    <div className="project__links">
      {items.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project__link"
        >
          {l.label}
          <ArrowUpRightIcon className="project__link-icon" />
        </a>
      ))}
      {links.private && <span className="mono project__private">Private repo</span>}
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  const primaryHref = project.links.live || project.links.repo || null;
  return (
    <article className={`project${featured ? ' project--featured' : ''}`}>
      <ProjectMedia project={project} />
      <div className="project__body">
        <h3 className="project__title">
          {primaryHref ? (
            <a
              className="project__title-link u-draw"
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
              <ArrowUpRightIcon className="project__link-icon" />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="project__desc">{project.description}</p>
        <p className="project__result">{project.result}</p>
        {(project.tech.length > 0 || project.hosting) && (
          <p className="project__tags mono">
            {project.tech.join(' · ')}
            {project.tech.length > 0 && project.hosting ? ' · ' : ''}
            {project.hosting && <span className="project__host">Host · {project.hosting}</span>}
          </p>
        )}
        <ProjectLinks links={project.links} />
      </div>
    </article>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="grid12">
        <div className="section-head">
          <h2 id="work-title" className="section-title">
            Selected work
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="work">
        <ProjectCard project={featured} featured />
        <div className="work__pair">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
