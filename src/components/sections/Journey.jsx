import { experience, educationLine } from '../../data/journey';

export default function Journey() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="grid12">
        <div className="section-head">
          <h2 id="experience-title" className="section-title">
            Experience
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <ol className="journey__list">
        {experience.map((e) => (
          <li className="journey__entry" key={e.index}>
            <p className="mono journey__dates">{e.dates}</p>
            <div className="journey__body">
              <h3 className="journey__role">{e.role}</h3>
              <p className="journey__meta">
                {e.org}
                {e.meta ? ` · ${e.meta}` : ''}
              </p>
              <ul className="journey__bullets">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="journey__edu">{educationLine}</p>
    </section>
  );
}
