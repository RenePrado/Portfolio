import { useCallback, useEffect, useState } from 'react';

// Inspect mode — the signature "show the workings" toggle.
// Switches html[data-inspect="on"]; CSS in inspect.css draws the real grid.
export function useInspect() {
  const [inspect, setInspect] = useState(false);

  const toggle = useCallback(() => {
    setInspect((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.dataset.inspect = 'on';
      } else {
        delete document.documentElement.dataset.inspect;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() !== 'g' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))
      ) {
        return;
      }
      toggle();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [toggle]);

  return { inspect, toggle };
}
