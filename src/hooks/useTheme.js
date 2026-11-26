import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

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
      ? 'light'
      : document.documentElement.dataset.theme || systemTheme()
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

  // Follow OS changes only when the user has no explicit stored choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!readTheme()) {
        const next = systemTheme();
        apply(next);
        setTheme(next);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return { theme, toggle };
}
