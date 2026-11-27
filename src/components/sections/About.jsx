import { aboutParagraphs } from '../../data/about';

// First person, résumé facts only. TODO(owner): add one sentence on
// development philosophy and approach, in your own words.
export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="grid12">
        <div className="section-head" data-reveal>
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <span className="section-head__rule" aria-hidden="true" />
        </div>
        <div className="about__col" data-reveal>
          <div className="about__body">
            {aboutParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
