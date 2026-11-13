"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { playSound } from "@/hooks/useSound";
import { SOUNDS } from "@/config/assets";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

interface HeroContent {
  brand: string;
  quote: string;
  view: string;
  video: string;
}

interface UiContent {
  switchLanguage: string;
  themeToggle: string;
  langToggle: string;
  heroLabel: string;
}

export default function Hero(): React.JSX.Element | null {
  const { toggleLang, theme, toggleTheme } = useApp();
  const { content } = useContent();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useIsMobile();

  const [activeTouch, setActiveTouch] = useState<string | null>(null);
  const [hoverVideo, setHoverVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const t = content.hero as HeroContent | undefined;
  const ui = content.ui as UiContent;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleViewClick = (): void => {
    playSound(SOUNDS.sword);
    router.push("/portfolio");
  };

  const handleTouchEffect = (id: string): void => {
    if (!isMobile) return;
    setActiveTouch(id);
    setTimeout(() => setActiveTouch(null), TOUCH_FEEDBACK_MS.short);
  };

  const handleMouseEnter = useCallback((): void => {
    setHoverVideo(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setHoverVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const isDark = theme === "dark";
  const borderColor = "border-gold";

  if (!isMounted || !t) return null;

  return (
    <section
      className={`
        relative w-full h-dvh
        border-[4px] sm:border-[8px] lg:border-[12px] ${borderColor}
        box-border overflow-hidden transition-colors duration-500
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ui.heroLabel}
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        src={t.video}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 will-change-transform
          ${isDark ? "brightness-100" : "brightness-[0.76]"}
          ${hoverVideo ? "scale-105" : "scale-100"}`}
        aria-hidden
      />

      {/* Capa de color según el tema */}
      <div
        className={`absolute inset-0 z-10 ${
          isDark ? "bg-black/60" : "bg-parchment/45"
        } transition-opacity duration-500`}
        aria-hidden
      />

      {/* Botones de control de idioma y tema */}
      <div className="absolute top-2 sm:top-5 left-2 sm:left-6 z-30 flex gap-2 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={toggleTheme}
          onTouchStart={() => handleTouchEffect("theme")}
          aria-label={ui.themeToggle}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border-[2px] shadow-md 
            ${isDark ? "bg-white/8 text-white" : "bg-white/30 text-black"} ${borderColor}
            transition-transform duration-300 text-xs sm:text-sm md:text-base
            ${activeTouch === "theme" ? "scale-110 border-red-600" : "hover:scale-110 hover:border-red-600"}`}
        >
          {isDark ? "🌙" : "☀️"}
        </button>
        <button
          type="button"
          onClick={toggleLang}
          onTouchStart={() => handleTouchEffect("lang")}
          aria-label={ui.langToggle}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border-[2px] shadow-md 
            ${isDark ? "bg-white/8 text-white" : "bg-white/30 text-black"} ${borderColor}
            transition-transform duration-300 text-xs sm:text-sm md:text-base
            ${activeTouch === "lang" ? "scale-110 border-red-600" : "hover:scale-110 hover:border-red-600"}`}
        >
          🌐 {ui.switchLanguage}
        </button>
      </div>

      {/* Contenido principal */}
      <div className="absolute inset-0 z-20 grid place-items-center px-2 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-2 sm:gap-6 md:gap-8 max-w-[1100px] w-full">
          <h1
            onTouchStart={() => handleTouchEffect("brand")}
            className={`
              font-irish leading-tight 
              text-[2.1rem] sm:text-5xl lg:text-[4.25rem] xl:text-[5rem]
              transition-all duration-300 py-1 sm:py-3 px-2 sm:px-4 mx-0
              ${activeTouch === "brand" ? "scale-105" : "hover:scale-105"}
              ${isDark ? "text-white" : "text-charcoal"}
            `}
            style={{
              WebkitTextStroke: "1.5px var(--gold)",
              textShadow:
                "0 0 10px color-mix(in srgb, var(--gold) 60%, transparent), 0 0 25px color-mix(in srgb, var(--gold) 30%, transparent)",
              transition: "all 0.4s ease-in-out",
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              const el = e.currentTarget.style;
              el.webkitTextStroke = "1.5px red";

              el.textShadow =
                "0 0 12px color-mix(in srgb, var(--alert) 70%, transparent), 0 0 24px color-mix(in srgb, var(--alert) 40%, transparent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.style;
              el.webkitTextStroke = "1.5px var(--gold)";
              el.textShadow =
                "0 0 10px color-mix(in srgb, var(--gold) 60%, transparent), 0 0 25px color-mix(in srgb, var(--gold) 30%, transparent)";
            }}
          >
            {t.brand}
          </h1>
          <div
            onTouchStart={() => handleTouchEffect("quote")}
            className={`
              max-w-[98vw] sm:max-w-[640px] md:max-w-[820px]
              px-3 sm:px-6 py-2 sm:py-4 rounded-[2.5rem]
              ${isDark ? "bg-[color-mix(in_srgb,var(--ink-night)_80%,transparent)] text-gray-200" : "bg-[color-mix(in_srgb,var(--parchment)_85%,transparent)] text-olive-gray"}
              text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed shadow-lg transition-transform duration-300
              ${activeTouch === "quote" ? "scale-102 shadow-[0_0_20px_color-mix(in_srgb,var(--sun)_25%,transparent)]" : "hover:scale-102"}
            `}
            dangerouslySetInnerHTML={{ __html: t.quote }}
          />
          <div className="mt-2 sm:mt-4">
            <button
              onClick={handleViewClick}
              onTouchStart={() => handleTouchEffect("view")}
              className={`
                inline-flex items-center justify-center gap-3 px-5 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full border-[2px] sm:border-[3px] font-bold
                transition-transform duration-300 text-sm sm:text-base md:text-lg
                ${activeTouch === "view" ? "scale-110 border-gold" : "hover:scale-110 hover:border-gold"}
                ${isDark ? "bg-[color-mix(in_srgb,var(--ink-soft)_90%,transparent)] text-gold" : "bg-[color-mix(in_srgb,var(--parchment-deep)_90%,transparent)] text-olive-dark border-red-600"}
              `}
            >
              {t.view}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
