import { useEffect } from 'react';

// One-time reveals for below-the-fold sections. Elements only get the
// hidden "reveal" state when IntersectionObserver exists and the user has
// not requested reduced motion — so content is always visible without JS.
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    els.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
