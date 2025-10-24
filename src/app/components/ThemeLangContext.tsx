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
      // Si no hay tema guardado, usa el del sistema
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

  // 🌓 Escuchar cambios del sistema *solo si el usuario no fijó tema manualmente*
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("site-theme");
    if (storedTheme) return; // si ya hay uno, no escuchar el sistema

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 🔘 Funciones toggle
  const toggleLang = () => setLang((s) => (s === "en" ? "es" : "en"));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

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
