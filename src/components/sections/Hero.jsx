import { profile } from '../../data/profile';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="grid12 hero__grid">
        <div className="hero__meta">
          <p className="mono hero__eyebrow">{profile.eyebrow}</p>
          <p className="hero__availability">
            <span className="hero__dot" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <h1 id="hero-name" className="hero__name">
          {profile.nameLines.map((line, i) => (
            <span
              key={line}
              className={`hero__line${i === 1 ? ' hero__line--indent' : ''}`}
              style={{ '--i': i }}
            >
              {line}
            </span>
          ))}
        </h1>

        <figure className="hero__figure">
          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            sizes={profile.portrait.sizes}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            fetchPriority={profile.portrait.fetchPriority}
            decoding="async"
          />
        </figure>

        <div className="hero__intro">
          <p className="hero__lead">{profile.intro}</p>
          <div className="hero__ctas">
            <a href="#work" className="btn btn--primary">
              See selected work ↓
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__resume"
            >
              Résumé ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
