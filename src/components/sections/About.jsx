import { profile } from '../../data/profile';

// Short, résumé-facts-only. The owner's own words are a marked placeholder.
export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="grid12">
        <div className="about__col" data-reveal>
          <p className="mono section-index">02 — About</p>
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <div className="about__body">
            <p>
              {profile.name} is a front-end developer and 2026 Computer Science
              graduate based in {profile.location}. His experience spans Vue.js
              and Vuetify — translating Figma designs into responsive,
              consistently styled pages — and custom HTML, CSS, and JavaScript
              for e-commerce funnels. His listed skills also include React and
              TypeScript.
            </p>
            <p>
              Most recently he worked as an e-commerce funnel developer,
              launching 30+ Funnelish funnels for 3 clients across 5 markets,
              and completed a frontend internship at Simplevia Technologies
              Inc. resolving 14 bugs across API handling, data bindings, and
              event handlers.
            </p>
            <p className="about__placeholder mono">
              [ Owner note needed — development philosophy and approach, in
              your own words. See OPEN_ITEMS.md ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
