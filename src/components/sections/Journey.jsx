import { experience, education } from '../../data/journey';

function Entry({ item }) {
  return (
    <li className="journey__entry">
      <p className="mono journey__dates">{item.dates}</p>
      <div className="journey__body">
        <h3 className="journey__role">{item.role}</h3>
        <p className="journey__org">{item.org}</p>
        {item.meta ? <p className="mono journey__meta">{item.meta}</p> : null}
        {item.bullets.length > 0 && (
          <ul className="journey__bullets">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="grid12">
        <div className="section-head" data-spec="--step-4 cols 1-12">
          <h2 id="journey-title" className="section-title">
            Experience and education
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="journey" data-reveal>
        <span className="journey__rail" aria-hidden="true" />
        <ol className="journey__list">
          {experience.map((e) => (
            <Entry key={e.index} item={e} />
          ))}
          {education.map((e) => (
            <Entry key={e.index} item={e} />
          ))}
        </ol>
      </div>
    </section>
  );
}
