import { useRef } from 'react';
import { profile } from '../../data/profile';
import FigureFrame from '../ui/FigureFrame';
import { usePointerAxis } from '../../hooks/usePointerAxis';
import { DownloadIcon, ExternalIcon } from '../ui/Icons';

export default function Hero() {
  const nameRef = useRef(null);
  usePointerAxis(nameRef);

  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="grid12 hero__grid">
        <div className="hero__copy">
          <p className="mono hero__role hero-in" style={{ animationDelay: '0ms' }}>
            {profile.role}
          </p>
          <h1
            id="hero-name"
            className="hero__name hero-in"
            style={{ animationDelay: '40ms' }}
            ref={nameRef}
            data-spec="--step-6 Fraunces variable"
          >
            {profile.name}
          </h1>
          <p className="hero__intro hero-in" style={{ animationDelay: '90ms' }}>
            {profile.intro}
          </p>
          <div className="hero__ctas hero-in" style={{ animationDelay: '140ms' }}>
            <a href="#projects" className="btn btn--primary">
              View projects
            </a>
            <a href="#contact" className="btn btn--secondary">
              Contact me
            </a>
          </div>
          <p className="hero__resume hero-in" style={{ animationDelay: '190ms' }}>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="u-draw"
              aria-label="Download résumé PDF"
            >
              <DownloadIcon /> Download résumé
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="u-draw"
              aria-label="Preview résumé PDF in a new tab"
            >
              Preview résumé <ExternalIcon />
            </a>
          </p>
        </div>

        <div className="hero__figure hero-in" style={{ animationDelay: '120ms' }}>
          <FigureFrame
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            avifSrcSet={profile.portrait.avifSrcSet}
            webpSrcSet={profile.portrait.webpSrcSet}
            sizes={profile.portrait.sizes}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            fetchPriority={profile.portrait.fetchPriority}
            caption="Fig. 01, Quezon City"
            className="hero__frame"
          />
        </div>
      </div>
    </section>
  );
}
