import { useEffect, useRef, useState } from 'react';
import FigureFrame from './FigureFrame';

const FINE =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

// Project preview plate — a framed "Fig." preview that follows the pointer
// with transform-only lerp smoothing. On keyboard focus it anchors to the
// row's right edge; on touch devices a static thumb renders inside the row
// instead (handled by CSS in .project-row).
export default function PreviewPlate({ project }) {
  const plateRef = useRef(null);
  const [mode, setMode] = useState('hidden'); // hidden | follow | anchor
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, shown: false });

  useEffect(() => {
    const plate = plateRef.current;
    const row = plate?.closest('.project-row');
    if (!plate || !row) return;
    if (!window.matchMedia(FINE).matches) return;

    const p = pos.current;

    const loop = () => {
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      plate.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      if (Math.abs(p.tx - p.x) > 0.5 || Math.abs(p.ty - p.y) > 0.5) {
        p.raf = requestAnimationFrame(loop);
      } else {
        p.raf = 0;
      }
    };
    const kick = () => {
      if (!p.raf) p.raf = requestAnimationFrame(loop);
    };
    const show = (nextMode) => {
      p.shown = true;
      plate.classList.add('is-on');
      setMode(nextMode);
    };
    const hide = () => {
      p.shown = false;
      plate.classList.remove('is-on');
      setMode('hidden');
    };

    const clampPlate = (cx, cy) => {
      const w = plate.offsetWidth || 320;
      const h = plate.offsetHeight || 200;
      return {
        x: Math.min(Math.max(cx, 8), window.innerWidth - w - 8),
        y: Math.min(Math.max(cy, 8), window.innerHeight - h - 8)
      };
    };

    const onMove = (e) => {
      const { x, y } = clampPlate(e.clientX + 24, e.clientY - 100);
      p.tx = x;
      p.ty = y;
      if (!p.shown) {
        p.x = x;
        p.y = y;
        show('follow');
      }
      kick();
    };

    const onFocusIn = () => {
      const r = row.getBoundingClientRect();
      const w = plate.offsetWidth || 320;
      const h = plate.offsetHeight || 200;
      const { x, y } = clampPlate(r.right - w, r.top - h - 12);
      p.tx = x;
      p.ty = y;
      if (!p.shown) {
        p.x = x;
        p.y = y;
        show('anchor');
      }
      kick();
    };

    const onFocusOut = (e) => {
      if (!row.contains(e.relatedTarget)) hide();
    };

    row.addEventListener('pointermove', onMove, { passive: true });
    row.addEventListener('pointerleave', hide, { passive: true });
    row.addEventListener('focusin', onFocusIn);
    row.addEventListener('focusout', onFocusOut);

    return () => {
      row.removeEventListener('pointermove', onMove);
      row.removeEventListener('pointerleave', hide);
      row.removeEventListener('focusin', onFocusIn);
      row.removeEventListener('focusout', onFocusOut);
      if (p.raf) cancelAnimationFrame(p.raf);
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
        className="preview-plate__fig"
      />
    </div>
  );
}
