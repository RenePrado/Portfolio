import TagList from './TagList';
import PreviewPlate from './PreviewPlate';
import { ExternalIcon } from './Icons';

// Contents-page row: numeral · title+objective · dates · tech · contribution · links.
export default function ProjectRow({ project }) {
  return (
    <article className="project-row" role="listitem" data-reveal>
      <PreviewPlate project={project} />

      <div className="project-row__main">
        <span className="project-row__index mono" aria-hidden="true">
          {project.index}
        </span>

        <div className="project-row__id">
          <h3 className="project-row__title">{project.title}</h3>
          <p className="project-row__objective">{project.objective}</p>
        </div>

        <p className="mono project-row__dates">{project.dates}</p>

        <div className="project-row__tech">
          <TagList items={project.tech} />
        </div>

        <p className="project-row__contribution">{project.contribution}</p>

        <div className="project-row__links">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row__link mono u-draw"
              aria-label={`${l.label} — ${project.title} (opens in new tab)`}
            >
              {l.label} <ExternalIcon />
            </a>
          ))}
        </div>
      </div>

      {/* Static thumb for touch/coarse pointers */}
      <div className="project-row__thumb" aria-hidden="true">
        <span className="mono">{project.figLabel}</span>
      </div>
    </article>
  );
}
