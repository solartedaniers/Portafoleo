"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";
type Theme = "light" | "dark";

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void; // ✅ añadimos esto para permitir ajustes desde el sistema
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  // ✅ Detectar tema del sistema y aplicar si no hay tema guardado
  useEffect(() => {
    const storedTheme = localStorage.getItem("site-theme") as Theme | null;
    if (!storedTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // ✅ Escuchar cambios en el tema del sistema en tiempo real
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem("site-theme");
      // solo cambia automáticamente si el usuario no ha forzado un tema
      if (!storedTheme) setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ✅ Cargar idioma y tema desde localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("site-lang") as Lang;
    const storedTheme = localStorage.getItem("site-theme") as Theme;

    if (storedLang) setLang(storedLang);
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // ✅ Aplicar clase HTML segun el tema
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  // ✅ Guardar idioma
  useEffect(() => {
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  // ✅ Toggle functions
  const toggleLang = () => setLang((s) => (s === "en" ? "es" : "en"));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AppContext.Provider
      value={{
        lang,
        toggleLang,
        theme,
        toggleTheme,
        setTheme, // ✅ lo exponemos para el Hero
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
