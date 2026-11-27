import { projects } from '../../data/projects';
import ProjectRow from '../ui/ProjectRow';

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="grid12">
        <div className="section-head" data-spec="--step-4 cols 1-12">
          <h2 id="projects-title" className="section-title">
            Projects
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="projects-index" role="list" aria-label="Projects">
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
