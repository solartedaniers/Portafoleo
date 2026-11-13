"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, isSupportedLang, type Lang } from "@/config/content";

type Theme = "light" | "dark";

const STORAGE_KEYS = {
  lang: "site-lang",
  theme: "site-theme",
} as const;

const DARK_QUERY = "(prefers-color-scheme: dark)";

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSystemTheme: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function detectBrowserLang(): Lang {
  const browserLang = navigator.language?.slice(0, 2);
  return isSupportedLang(browserLang) ? browserLang : DEFAULT_LANG;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [theme, setThemeState] = useState<Theme>("light");
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    const storedLang = readStorage(STORAGE_KEYS.lang);
    setLangState(isSupportedLang(storedLang) ? storedLang : detectBrowserLang());

    const storedTheme = readStorage(STORAGE_KEYS.theme);
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      setIsSystemTheme(false);
    } else {
      setThemeState(window.matchMedia(DARK_QUERY).matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (!isSystemTheme) writeStorage(STORAGE_KEYS.theme, theme);
  }, [theme, isSystemTheme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Mientras el usuario no elija tema, sigo al sistema operativo
  useEffect(() => {
    if (!isSystemTheme) return;
    const mediaQuery = window.matchMedia(DARK_QUERY);
    const handler = (e: MediaQueryListEvent) => setThemeState(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [isSystemTheme]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeStorage(STORAGE_KEYS.lang, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Lang = current === "en" ? "es" : "en";
      writeStorage(STORAGE_KEYS.lang, next);
      return next;
    });
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setIsSystemTheme(false);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsSystemTheme(false);
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, theme, toggleTheme, setTheme, isSystemTheme }),
    [lang, setLang, toggleLang, theme, toggleTheme, setTheme, isSystemTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
