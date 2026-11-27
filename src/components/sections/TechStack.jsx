import { stackGroups } from '../../data/stack';

export default function TechStack() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="grid12">
        <div className="section-head" data-spec="--step-4 cols 1-12">
          <h2 id="stack-title" className="section-title">
            Stack
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
      </div>
      <div className="stack" data-reveal>
        {stackGroups.map((g) => (
          <div className="stack__col" key={g.label}>
            <h3 className="mono stack__label">{g.label}</h3>
            <ul className="stack__list mono">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
