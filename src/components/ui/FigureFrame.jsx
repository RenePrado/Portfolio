import { useState } from 'react';

// FigureFrame — the page's only ornament: L-shaped crop marks + mono
// caption framing a real image (or a marked placeholder when `src` is null
// or fails to load).
export default function FigureFrame({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt = '',
  caption,
  className = ''
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <figure className={`fig-frame ${className}`}>
      <span className="crop crop--tl" aria-hidden="true" />
      <span className="crop crop--tr" aria-hidden="true" />
      <span className="crop crop--bl" aria-hidden="true" />
      <span className="crop crop--br" aria-hidden="true" />
      <div className="fig-frame__media">
        {showImage ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="fig-frame__pending"
            role="img"
            aria-label={alt || caption || 'Image pending'}
          >
            <span className="mono">Fig. —</span>
            <span className="mono fig-frame__pending-note">
              screenshot pending
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mono fig-frame__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
