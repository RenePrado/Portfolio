import { useCallback, useState } from 'react';

const STORAGE_KEY = 'theme';

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined'
      ? 'dark'
      : document.documentElement.dataset.theme || 'dark'
  );

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const commit = () => {
      apply(next);
      setTheme(next);
    };
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  }, [theme]);

  // No OS listener: dark is the default for every first visit; once the
  // visitor picks a theme it is remembered in localStorage.

  return { theme, toggle };
}
