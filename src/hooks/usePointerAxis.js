import { useEffect } from 'react';

const FINE_POINTER =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const REST = { wght: 560, opsz: 144, soft: 0 };
const RANGE = { wght: 90, opsz: 24, soft: 22 };

// Variable-type hero: pointer x-position drives the name's wght/opsz/SOFT
// axes through CSS custom properties on `el`. One rAF-throttled passive
// listener; values ease back to defaults when the pointer leaves.
// Safe no-op when the pointer is coarse or motion is reduced.
export function usePointerAxis(elRef) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const s = { target: null, current: null, raf: 0 };

    const setVars = (v) => {
      el.style.setProperty('--fx-wght', v.wght.toFixed(1));
      el.style.setProperty('--fx-opsz', v.opsz.toFixed(1));
      el.style.setProperty('--fx-soft', v.soft.toFixed(1));
    };

    const tick = () => {
      if (!s.target || !s.current) {
        s.raf = 0;
        return;
      }
      const k = 0.12;
      for (const key of ['wght', 'opsz', 'soft']) {
        s.current[key] += (s.target[key] - s.current[key]) * k;
        if (Math.abs(s.target[key] - s.current[key]) < 0.05) {
          s.current[key] = s.target[key];
        }
      }
      setVars(s.current);
      const settled = ['wght', 'opsz', 'soft'].every(
        (key) => s.current[key] === s.target[key]
      );
      s.raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      s.target = {
        wght: REST.wght + (t - 0.5) * RANGE.wght,
        opsz: REST.opsz - Math.abs(t - 0.5) * RANGE.opsz,
        soft: REST.soft + t * RANGE.soft
      };
      if (!s.current) {
        s.current = { ...REST };
        setVars(s.current);
      }
      kick();
    };

    const onLeave = () => {
      s.target = { ...REST };
      if (s.current) kick();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (s.raf) cancelAnimationFrame(s.raf);
      el.style.removeProperty('--fx-wght');
      el.style.removeProperty('--fx-opsz');
      el.style.removeProperty('--fx-soft');
    };
  }, [elRef]);
}
