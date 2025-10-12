"use client";
import React, { useRef, useEffect, useState } from "react";
import { useApp } from "./ThemeLangContext";
import { useRouter } from "next/navigation";

const translations = {
  es: {
    brand: "Daniers Solarte",
    quote: "El código es mi espada,<br />la lógica mi escudo.",
    view: "Ver Portafolio",
    language: "Inglés",
  },
  en: {
    brand: "Daniers Solarte",
    quote: "The code is my sword,<br />logic is my shield.",
    view: "View Portfolio",
    language: "Español",
  },
};

export default function Hero() {
  const { lang, toggleLang, theme, toggleTheme, setTheme } = useApp();
  const t = translations[lang];
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detectar dispositivo (móvil o PC)
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // ✅ Detectar el modo del sistema al cargar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(systemDark.matches ? "dark" : "light");

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };

      systemDark.addEventListener("change", handleSystemThemeChange);
      return () =>
        systemDark.removeEventListener("change", handleSystemThemeChange);
    }
  }, [setTheme]);

  const handleViewClick = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch {
        // Ignorar bloqueo de autoplay
      }
    }
    router.push("/portfolio");
  };

  // 🖱 Manejo universal de hover/tap
  const handleTouchHover = (callback: () => void) => {
    if (isMobile) callback();
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

      {/* 🌓 Overlay oscuro */}
      <div
        className={`absolute inset-0 z-10 ${
          theme === "dark" ? "bg-black/60" : "bg-black/30"
        }`}
      />

      {/* 🔘 Botones */}
      <div className="absolute top-6 left-6 z-30 flex gap-4 ml-2 sm:ml-[10px]">
        {/* Tema */}
        <button
          onClick={() => {
            toggleTheme();
            handleTouchHover(() =>
              alert(theme === "dark" ? "Modo claro" : "Modo oscuro")
            );
          }}
          aria-label="Cambiar tema"
          className="px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:border-red-600"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* Idioma */}
        <button
          onClick={() => {
            toggleLang();
            handleTouchHover(() =>
              alert(lang === "es" ? "Language: English" : "Idioma: Español")
            );
          }}
          aria-label="Cambiar idioma"
          className="px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:border-red-600"
        >
          🌐 {t.language}
        </button>
      </div>

      {/* 🧍‍♂️ Contenido principal */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-6 px-4 sm:px-6 translate-x-6 sm:translate-x-60">
        {/* Nombre */}
        <h1
          className="text-white text-4xl sm:text-5xl md:text-6xl mb-4 font-['Irish_Grover'] transition-transform hover:scale-110 text-stroke-gold hover:text-stroke-red"
          onClick={() =>
            handleTouchHover(() =>
              alert(lang === "es" ? "Bienvenido a mi portafolio" : "Welcome to my portfolio")
            )
          }
        >
          {t.brand}
        </h1>

        {/* Frase */}
        <p
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-[90%] sm:max-w-[500px] px-6 py-2 rounded-[30px] shadow-lg bg-[#121212]/80 animate-pulse font-esteban transition-transform hover:scale-105"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          onClick={() =>
            handleTouchHover(() =>
              alert(lang === "es" ? "El código es mi espada, la lógica mi escudo." : "The code is my sword, logic is my shield.")
            )
          }
          dangerouslySetInnerHTML={{ __html: t.quote }}
        />

        {/* Botón Ver Portafolio */}
        <button
          onClick={handleViewClick}
          onTouchStart={() =>
            handleTouchHover(() => alert(t.view))
          }
          className="px-6 sm:px-8 py-3 rounded-full border-[3px] font-bold text-base sm:text-lg transition-transform hover:scale-110 bg-[#c1c1c1] border-bloodRed text-[#605b2a] hover:border-gold hover:shadow-[0_4px_20px_rgba(196,175,39,0.4)] font-[Instrument_Serif]"
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
