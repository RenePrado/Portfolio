import TagList from './TagList';
import PreviewPlate from './PreviewPlate';
import FigureFrame from './FigureFrame';
import { ExternalIcon } from './Icons';

// Contents-page row: serif numeral | title with dates beneath | detail
// (objective, bullets, tech, links). Visuals render only when the project
// has an image; in dev builds a marked placeholder stands in for layout
// testing.
export default function ProjectRow({ project }) {
  const hasVisual = Boolean(project.image) || import.meta.env.DEV;

  return (
    <article className="project-row" role="listitem" data-reveal>
      {hasVisual && <PreviewPlate project={project} />}

      <span className="project-row__index" aria-hidden="true">
        {project.index}
      </span>

      <div className="project-row__head">
        <h3 className="project-row__title">{project.title}</h3>
        <p className="mono project-row__dates">{project.dates}</p>
      </div>

      <div className="project-row__detail">
        <p className="project-row__objective">{project.objective}</p>
        {project.bullets?.length > 0 && (
          <ul className="project-row__bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {project.tech?.length > 0 && (
          <p className="project-row__tech">
            <TagList items={project.tech} />
          </p>
        )}
        {project.links.length > 0 && (
          <div className="project-row__links">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row__link u-draw"
                aria-label={`${l.label}, ${project.title} (opens in new tab)`}
              >
                {l.label} <ExternalIcon />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Static figure for touch/coarse pointers */}
      {hasVisual && (
        <div className="project-row__thumb" aria-hidden="true">
          <FigureFrame
            src={project.image}
            caption={project.figLabel}
            pendingFig={`Fig. ${project.index}`}
            className="project-row__thumbfig"
          />
        </div>
      )}
    </article>
  );
}
