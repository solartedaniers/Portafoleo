"use client";
import React, { useRef, useEffect, useState } from "react";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useRouter } from "next/navigation";

interface HeroLangContent {
  brand: string;
  quote: string;
  view: string;
  language: string;
}

interface HeroContent {
  es: HeroLangContent;
  en: HeroLangContent;
}

interface SiteContent {
  hero?: HeroContent;
  [key: string]: unknown;
}

type LangType = "es" | "en";

export default function Hero(): React.JSX.Element {
  const { lang, toggleLang, theme, toggleTheme, setTheme } = useApp();
  const { content } = useContent() as { content: SiteContent };
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTouch, setActiveTouch] = useState<string | null>(null);

  const t: HeroLangContent = content?.hero?.[lang as LangType] ?? {
    brand: "Daniers Solarte",
    quote: "El código es mi espada,<br />la lógica mi escudo.",
    view: "Ver Portafolio",
    language: "Inglés",
  };

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(systemDark.matches ? "dark" : "light");

      const handleSystemThemeChange = (e: MediaQueryListEvent) =>
        setTheme(e.matches ? "dark" : "light");

      systemDark.addEventListener("change", handleSystemThemeChange);
      return () => {
        systemDark.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [setTheme]);

  const handleViewClick = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch {
        /* ignore autoplay block */
      }
    }
    router.push("/portfolio");
  };

  // 🖱 Simula hover visual en móvil
  const handleTouchEffect = (id: string) => {
    if (!isMobile) return;
    setActiveTouch(id);
    setTimeout(() => setActiveTouch(null), 1500);
  };

  return (
    <section className="relative w-screen h-screen box-border border-[8px] border-gold overflow-hidden">
      {/* 🎥 Video de fondo */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/background-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🌓 Overlay */}
      <div
        className={`absolute inset-0 z-10 ${
          theme === "dark" ? "bg-black/60" : "bg-black/30"
        }`}
      />

      {/* 🔘 Botones */}
      <div className="absolute top-6 left-6 z-30 flex gap-4 ml-2 sm:ml-[10px]">
        <button
          onClick={toggleTheme}
          onTouchStart={() => handleTouchEffect("theme")}
          aria-label="Cambiar tema"
          className={`px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 
          ${
            activeTouch === "theme"
              ? "scale-110 border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
              : "hover:scale-110 hover:border-red-600"
          }`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={toggleLang}
          onTouchStart={() => handleTouchEffect("lang")}
          aria-label="Cambiar idioma"
          className={`px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 
          ${
            activeTouch === "lang"
              ? "scale-110 border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
              : "hover:scale-110 hover:border-red-600"
          }`}
        >
          🌐 {t.language}
        </button>
      </div>

      {/* 🧍‍♂️ Contenido principal */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-6 px-4 sm:px-6 translate-x-6 sm:translate-x-60">
        {/* Nombre */}
        <h1
          onTouchStart={() => handleTouchEffect("brand")}
          className={`text-white text-4xl sm:text-5xl md:text-6xl mb-4 font-['Irish_Grover'] transition-transform text-stroke-gold 
          ${
            activeTouch === "brand"
              ? "scale-110 text-stroke-red"
              : "hover:scale-110 hover:text-stroke-red"
          }`}
        >
          {t.brand}
        </h1>

        {/* Frase */}
        <p
          onTouchStart={() => handleTouchEffect("quote")}
          className={`text-gray-300 text-base sm:text-lg md:text-xl max-w-[90%] sm:max-w-[500px] px-6 py-2 rounded-[30px] shadow-lg bg-[#121212]/80 animate-pulse font-esteban transition-transform
          ${
            activeTouch === "quote"
              ? "scale-105 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
              : "hover:scale-105"
          }`}
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          dangerouslySetInnerHTML={{ __html: t.quote }}
        />

        {/* Botón Ver Portafolio */}
        <button
          onClick={handleViewClick}
          onTouchStart={() => handleTouchEffect("view")}
          className={`px-6 sm:px-8 py-3 rounded-full border-[3px] font-bold text-base sm:text-lg transition-transform font-[Instrument_Serif]
          ${
            activeTouch === "view"
              ? "scale-110 border-gold shadow-[0_4px_20px_rgba(196,175,39,0.4)]"
              : "hover:scale-110 hover:border-gold hover:shadow-[0_4px_20px_rgba(196,175,39,0.4)]"
          }
          bg-[#c1c1c1] border-bloodRed text-[#605b2a]`}
        >
          {t.view}
        </button>
      </div>

      {/* 🎵 Sonido espada */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/sword.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
}
