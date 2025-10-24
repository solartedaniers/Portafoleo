"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";
type Theme = "light" | "dark";

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  // 🧠 Cargar preferencias iniciales
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLang = localStorage.getItem("site-lang") as Lang | null;
    const storedTheme = localStorage.getItem("site-theme") as Theme | null;

    if (storedLang) setLang(storedLang);

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // 🎨 Aplicar tema global y guardar en localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("site-theme", theme);
  }, [theme]);

  // 🌐 Guardar idioma
  useEffect(() => {
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  // 🔘 Funciones toggle
  const toggleLang = () => setLang((s) => (s === "en" ? "es" : "en"));
  const toggleTheme = () => {
    setTheme((t) => {
      const newTheme = t === "dark" ? "light" : "dark";
      localStorage.setItem("site-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <AppContext.Provider value={{ lang, setLang, toggleLang, theme, toggleTheme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
