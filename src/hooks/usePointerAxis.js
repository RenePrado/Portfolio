import { useEffect, useRef } from 'react';

const FINE_POINTER =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

// Variable-type hero: pointer x-position drives the name's wght/opsz/SOFT
// axes through CSS custom properties on `el`. One rAF-throttled passive
// listener; values ease back to defaults when the pointer leaves.
// Safe no-op when the font lacks the axes or the pointer is coarse.
export function usePointerAxis(elRef) {
  const stateRef = useRef({ raf: 0, target: null, current: null });

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const REST = { wght: 560, opsz: 144, soft: 0 };
    const RANGE = { wght: 90, opsz: 40, soft: 45 };

    const setVars = (v) => {
      el.style.setProperty('--fx-wght', v.wght.toFixed(1));
      el.style.setProperty('--fx-opsz', v.opsz.toFixed(1));
      el.style.setProperty('--fx-soft', v.soft.toFixed(1));
    };

    const tick = () => {
      const s = stateRef.current;
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
      if (!settled) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.raf = 0;
      }
    };

    const ensureLoop = () => {
      if (!stateRef.current.raf) {
        stateRef.current.raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      // subtle: weight rises toward the right, opsz dips slightly, SOFT stays low
      stateRef.current.target = {
        wght: REST.wght + (t - 0.5) * RANGE.wght,
        opsz: REST.opsz - Math.abs(t - 0.5) * RANGE.opsz * 0.6,
        soft: REST.soft + t * RANGE.soft * 0.5
      };
      if (!stateRef.current.current) {
        stateRef.current.current = { ...REST };
        setVars(stateRef.current.current);
      }
      ensureLoop();
    };

    const onLeave = () => {
      stateRef.current.target = REST;
      if (stateRef.current.current) ensureLoop();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
      el.style.removeProperty('--fx-wght');
      el.style.removeProperty('--fx-opsz');
      el.style.removeProperty('--fx-soft');
    };
  }, [elRef]);
}
