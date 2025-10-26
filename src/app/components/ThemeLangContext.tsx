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
  isSystemTheme: boolean; // 🆕 Indica si sigue el sistema
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [isSystemTheme, setIsSystemTheme] = useState(true); // 🆕 Por defecto sigue el sistema

  // 🧠 Cargar preferencias iniciales
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLang = localStorage.getItem("site-lang") as Lang | null;
    const storedTheme = localStorage.getItem("site-theme") as Theme | null;

    if (storedLang) setLang(storedLang);

    if (storedTheme) {
      // Si hay tema guardado, el usuario lo fijó manualmente
      setTheme(storedTheme);
      setIsSystemTheme(false);
    } else {
      // Sin tema guardado = seguir el sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      setIsSystemTheme(true);
    }
  }, []);

  // 🎨 Aplicar tema global (sin guardarlo si sigue el sistema)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // Solo guardar si el usuario lo fijó manualmente
    if (!isSystemTheme) {
      localStorage.setItem("site-theme", theme);
    }
  }, [theme, isSystemTheme]);

  // 🌐 Guardar idioma
  useEffect(() => {
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  // 🌓 Escuchar cambios del sistema SOLO si sigue el modo automático
  useEffect(() => {
    if (!isSystemTheme) return; // Si está manual, no escuchar

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [isSystemTheme]);

  // 🔘 Funciones toggle
  const toggleLang = () => setLang((s) => (s === "en" ? "es" : "en"));
  
  const toggleTheme = () => {
    // Cuando el usuario hace clic, fijamos el tema manualmente
    setIsSystemTheme(false);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider value={{ 
      lang, 
      setLang, 
      toggleLang, 
      theme, 
      toggleTheme, 
      setTheme,
      isSystemTheme 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};