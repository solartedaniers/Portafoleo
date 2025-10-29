"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useApp } from "./ThemeLangContext";

type Content = Record<string, unknown>;

interface ContentCtx {
  content: Content | null;
  loading: boolean;
  saveContent: (c: Content) => Promise<boolean>;
  reload: () => Promise<void>;
}

const ContentContext = createContext<ContentCtx | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lang } = useApp(); // idioma actual ("es" o "en")
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  // Carga el JSON según el idioma seleccionado
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content?lang=${lang}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("❌ Error cargando contenido:", error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    load();
  }, [load]);

  // Guarda los cambios y recarga el contenido desde disco
  const saveContent = async (c: Content) => {
    try {
      const res = await fetch(`/api/content?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      const data = await res.json();
      if (data.ok) {
        await load();
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Error al guardar contenido:", error);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        saveContent,
        reload: load,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx)
    throw new Error("useContent debe usarse dentro de <ContentProvider>");
  return ctx;
}
