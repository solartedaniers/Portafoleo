"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Content = Record<string, unknown>;

interface ContentCtx {
  content: Content | null;
  loading: boolean;
  saveContent: (c: Content) => Promise<boolean>;
  reload: () => Promise<void>;
}

const ContentContext = createContext<ContentCtx | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Función para cargar el contenido desde el backend
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("❌ Error cargando contenido:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 💾 Guardar contenido y recargar después
  const saveContent = async (c: Content) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });

      const data = await res.json();

      if (data.ok) {
        console.log("✅ Contenido guardado. Recargando...");
        await load(); // 🔥 Recargar desde el servidor para evitar caché
        return true;
      }

      console.error("⚠️ Error: respuesta inválida del servidor:", data);
      return false;
    } catch (error) {
      console.error("❌ Error al guardar contenido:", error);
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, saveContent, reload: load }}>
      {children}
    </ContentContext.Provider>
  );
};

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent debe usarse dentro de <ContentProvider>");
  return ctx;
}
