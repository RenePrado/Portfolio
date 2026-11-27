import { aboutParagraphs } from '../../data/about';

// First person, résumé facts only. The owner's own words are a marked
// placeholder that renders only in development builds.
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
            {import.meta.env.DEV && (
              <p className="about__placeholder mono">
                [ Owner note needed, development philosophy and approach, in
                your own words. See OPEN_ITEMS.md ]
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
