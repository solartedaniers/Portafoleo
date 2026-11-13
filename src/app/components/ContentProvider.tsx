"use client";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useApp } from "./ThemeLangContext";
import { CONTENT_BY_LANG, type Content } from "@/config/content";

interface ContentCtx {
  content: Content;
  loading: boolean;
  saveContent: (c: Content) => Promise<boolean>;
  reload: () => Promise<void>;
}

const ContentContext = createContext<ContentCtx | undefined>(undefined);

// El contenido se importa en el build: sin fetch, sin parpadeo al cambiar de idioma
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useApp();
  const content = CONTENT_BY_LANG[lang];

  // Solo funciona en desarrollo: en producción la API rechaza escrituras
  const saveContent = useCallback(
    async (next: Content) => {
      try {
        const res = await fetch(`/api/content?lang=${lang}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        const data = await res.json();
        return Boolean(data.ok);
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [lang]
  );

  const reload = useCallback(async () => {}, []);

  const value = useMemo(
    () => ({ content, loading: false, saveContent, reload }),
    [content, saveContent, reload]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within <ContentProvider>");
  return ctx;
}
