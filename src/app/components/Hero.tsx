"use client";
import React, { useRef } from "react";
import { useApp } from "./ThemeLangContext";
import { useRouter } from "next/navigation";

const translations = {
  es: {
    brand: "Daniers Solarte",
    quote: "El código es mi espada,<br />la lógica mi escudo.",
    view: "Ver Portafolio",
    language: "Idioma",
  },
  en: {
    brand: "Daniers Solarte",
    quote: "The code is my sword,<br />logic is my shield.",
    view: "View Portfolio",
    language: "Language",
  },
};

export default function Hero() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();
  const t = translations[lang];
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleViewClick = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch {
        // ignorar autoplay
      }
    }
    router.push("/portfolio");
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

      {/* 🔘 Botones de idioma y tema */}
      <div className="absolute top-6 left-6 z-30 flex gap-4 ml-2 sm:ml-[10px]">
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:border-red-600"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={toggleLang}
          aria-label="Cambiar idioma"
          className="px-5 py-2.5 rounded-full border border-gold shadow-md bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:border-red-600"
        >
          🌐 {t.language}
        </button>
      </div>

      {/* 🧍‍♂️ Contenido principal */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-6 px-4 sm:px-6 translate-x-6 sm:translate-x-60">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl mb-4 font-['Irish_Grover'] transition-transform hover:scale-105 text-stroke-gold hover:text-stroke-red">
          {t.brand}
        </h1>

        <p
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-[90%] sm:max-w-[500px] px-6 py-2 rounded-[30px] shadow-lg bg-[#121212]/80 animate-pulse font-esteban"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          dangerouslySetInnerHTML={{ __html: t.quote }}
        />

        <button
          onClick={handleViewClick}
          className="px-6 sm:px-8 py-3 rounded-full border-[3px] font-bold text-base sm:text-lg transition-transform hover:scale-105 bg-[#c1c1c1] border-bloodRed text-[#605b2a] hover:border-gold hover:shadow-[0_4px_20px_rgba(196,175,39,0.4)] font-[Instrument_Serif]"
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