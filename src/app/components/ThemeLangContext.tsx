"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // ✅ Sincronizar con localStorage al montar
  useEffect(() => {
    const storedLang = localStorage.getItem("site-lang") as Lang;
    const storedTheme = localStorage.getItem("site-theme") as "light" | "dark";

    if (storedLang) setLang(storedLang);
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // ✅ Aplicar clase al <html> para modo oscuro
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    }
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  // ✅ Guardar idioma en localStorage
  useEffect(() => {
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((s) => (s === "en" ? "es" : "en"));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};