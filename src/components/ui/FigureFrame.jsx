/* eslint-disable react/no-unknown-property -- React 18 DOM only accepts lowercase fetchpriority */
import { useState } from 'react';

// FigureFrame — the page's only ornament: L-shaped crop marks flush with
// the media frame + mono caption. When `src` is null or fails to load, a
// marked placeholder renders (dev/layout testing only in practice).
export default function FigureFrame({
  src,
  srcSet,
  avifSrcSet,
  webpSrcSet,
  sizes,
  width,
  height,
  alt = '',
  caption,
  pendingFig = 'Fig. —',
  fetchPriority,
  className = ''
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <figure className={`fig-frame ${className}`}>
      <div className="fig-frame__media">
        <span className="crop crop--tl" aria-hidden="true" />
        <span className="crop crop--tr" aria-hidden="true" />
        <span className="crop crop--bl" aria-hidden="true" />
        <span className="crop crop--br" aria-hidden="true" />
        {showImage ? (
          <picture>
            {avifSrcSet ? (
              <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
            ) : null}
            {webpSrcSet ? (
              <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
            ) : null}
            <img
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              width={width}
              height={height}
              alt={alt}
              loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
              fetchpriority={fetchPriority}
              decoding="async"
              onError={() => setFailed(true)}
            />
          </picture>
        ) : (
          <div
            className="fig-frame__pending"
            role="img"
            aria-label={alt || caption || 'Image pending'}
          >
            <span className="mono">{pendingFig}</span>
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
