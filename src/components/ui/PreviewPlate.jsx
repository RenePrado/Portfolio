import { useEffect, useRef, useState } from 'react';
import FigureFrame from './FigureFrame';

const FINE =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const TEXT_SEL =
  '.project-row__index, .project-row__head, .project-row__detail, .project-row__thumb';

// Project preview plate — a framed "Fig." preview anchored beside the row
// (right side preferred, then left, then above/below) so it never covers
// the text it relates to. Position is recomputed on scroll/resize/pointer
// move via one rAF-throttled pass; transform-only, stops when hidden.
export default function PreviewPlate({ project }) {
  const plateRef = useRef(null);
  const [mode, setMode] = useState('hidden'); // hidden | anchor
  const raf = useRef(0);

  useEffect(() => {
    const plate = plateRef.current;
    const row = plate?.closest('.project-row');
    if (!plate || !row) return;
    if (!window.matchMedia(FINE).matches) return;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const place = () => {
      const w = plate.offsetWidth || 320;
      const h = plate.offsetHeight || 200;
      const r = row.getBoundingClientRect();
      const cy = r.top + r.height / 2 - h / 2;

      const obstacles = [...document.querySelectorAll(TEXT_SEL)].map((el) =>
        el.getBoundingClientRect()
      );
      const hitsText = (x, y) => {
        const pr = { left: x, top: y, right: x + w, bottom: y + h };
        return obstacles.some(
          (o) =>
            !(pr.right <= o.left || pr.left >= o.right || pr.bottom <= o.top || pr.top >= o.bottom)
        );
      };

      const candidates = [
        { x: r.right + 16, y: cy }, // right of the row
        { x: r.left - w - 16, y: cy }, // left of the row
        { x: r.right - w, y: r.bottom + 12 }, // below the row
        { x: r.right - w, y: r.top - h - 12 }, // above the row
        { x: r.left + r.width / 2 - w / 2, y: cy } // centred last resort
      ];

      for (const c of candidates) {
        const x = clamp(c.x, 8, window.innerWidth - w - 8);
        const y = clamp(c.y, 8, window.innerHeight - h - 8);
        if (!hitsText(x, y)) {
          plate.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          return;
        }
      }
      // No clear spot — dock to the right edge, vertically centred.
      plate.style.transform = `translate3d(${clamp(
        r.right + 16,
        8,
        window.innerWidth - w - 8
      )}px, ${clamp(cy, 8, window.innerHeight - h - 8)}px, 0)`;
    };

    const schedule = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        if (plate.classList.contains('is-on')) place();
      });
    };

    const show = () => {
      plate.classList.add('is-on');
      setMode('anchor');
      place();
    };
    const hide = () => {
      plate.classList.remove('is-on');
      setMode('hidden');
    };
    const onFocusOut = (e) => {
      if (!row.contains(e.relatedTarget)) hide();
    };

    row.addEventListener('pointerenter', show, { passive: true });
    row.addEventListener('pointerleave', hide, { passive: true });
    row.addEventListener('pointermove', schedule, { passive: true });
    row.addEventListener('focusin', show);
    row.addEventListener('focusout', onFocusOut);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      row.removeEventListener('pointerenter', show);
      row.removeEventListener('pointerleave', hide);
      row.removeEventListener('pointermove', schedule);
      row.removeEventListener('focusin', show);
      row.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={plateRef}
      className="preview-plate"
      aria-hidden="true"
      data-mode={mode}
    >
      <FigureFrame
        src={project.image}
        caption={project.figLabel}
        pendingFig={`Fig. ${project.index}`}
        className="preview-plate__fig"
      />
    </div>
  );
}
