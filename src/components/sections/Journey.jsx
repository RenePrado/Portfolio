import { experience, education } from '../../data/journey';

function Entry({ item, kind }) {
  return (
    <li className="journey__entry">
      <p className="mono journey__dates">{item.dates}</p>
      <div className="journey__body">
        <span className="journey__kind">{kind}</span>
        <h3 className="journey__role">
          {item.role}
          <span className="journey__org">
            {' '}
            — {item.org}
            {item.meta ? `, ${item.meta}` : ''}
          </span>
        </h3>
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
        <div className="section-head" data-spec="--step-4 · grid 1–12">
          <p className="mono section-index">04 — Journey</p>
          <h2 id="journey-title" className="section-title">
            Journey
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="journey" data-reveal>
        <span className="journey__rail" aria-hidden="true" />
        <ol className="journey__list">
          {experience.map((e) => (
            <Entry key={e.index} item={e} kind="Experience" />
          ))}
          {education.map((e) => (
            <Entry key={e.index} item={e} kind="Education" />
          ))}
        </ol>
      </div>
    </section>
  );
}
