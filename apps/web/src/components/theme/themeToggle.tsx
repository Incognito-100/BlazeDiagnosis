'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import type { ThemeMode, ThemeToggleProps } from '@/types/theme';

const storageKey = 'blaze-theme';
const themeChangeEvent = 'blaze-theme-change';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

function getPreferredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  if (isThemeMode(storedTheme)) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getServerSnapshot(): ThemeMode {
  return 'light';
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  window.addEventListener('storage', onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function setStoredTheme(theme: ThemeMode) {
  window.localStorage.setItem(storageKey, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getPreferredTheme,
    getServerSnapshot,
  );
  const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} mode`;

  return (
    <Button
      aria-label={label}
      onClick={() => setStoredTheme(nextTheme)}
      size={compact ? 'icon' : 'sm'}
      type="button"
      variant="outline"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {compact ? null : <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>}
    </Button>
  );
}
