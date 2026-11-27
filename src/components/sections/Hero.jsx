import { profile } from '../../data/profile';

// Temporary minimal hero until the §6 redesign lands — keeps the build
// green after FigureFrame's removal.
export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="grid12 hero__grid">
        <div className="hero__copy">
          <p className="mono hero__role">{profile.role}</p>
          <h1 id="hero-name" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__ctas">
            <a href="#projects" className="btn btn--primary">
              View projects
            </a>
            <a href="#contact" className="btn btn--secondary">
              Contact me
            </a>
          </div>
        </div>
        <div className="hero__figure">
          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            sizes={profile.portrait.sizes}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
