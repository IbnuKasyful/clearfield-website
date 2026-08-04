import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Light/dark theme state.
 *
 * The theme lives on `<html data-theme>`; every colour the site uses is a token
 * in index.css, so flipping that attribute is the whole switch. The same
 * resolution logic runs as an inline script in index.html so the first paint is
 * already correct — keep the two in step if the storage key ever changes.
 */

const STORAGE_KEY = 'clearfield-theme';
const BROWSER_UI = { light: '#f2f0ec', dark: '#0d1015' };

export function resolveTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Private mode: fall through to the system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', BROWSER_UI[theme]);
}

export function useTheme() {
  const [theme, setTheme] = useState(resolveTheme);
  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;

    // Only cross-fade on a deliberate switch — never on the initial paint.
    if (firstRun.current) {
      firstRun.current = false;
      applyTheme(theme);
    } else {
      root.classList.add('theme-transition');
      applyTheme(theme);
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Nothing to do — the choice simply will not survive a reload.
    }

    const timer = setTimeout(() => root.classList.remove('theme-transition'), 500);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
