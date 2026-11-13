"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useContent } from "./ContentProvider";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { playSound } from "@/hooks/useSound";
import { SOUNDS, SOUNDS_DIR } from "@/config/assets";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";
import { useApp } from "./ThemeLangContext";

// Tipos principales
interface SocialLink {
  label: string;
  url: string;
  sound: string;
}

interface FooterLang {
  title: string;
  credits: string;
  rights: string;
  phrase: string;
  author: string;
  backgroundLeft: string;
  backgroundRight: string;
  social: {
    linkedin: SocialLink;
    whatsapp: SocialLink;
    github: SocialLink;
  };
}

const CLOCK_TICK_MS = 1000;

function formatClock(date: Date): { time: string; period: string } {
  const hours = date.getHours();
  const pad = (value: number) => value.toString().padStart(2, "0");
  return {
    time: `${pad(hours % 12 || 12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
    period: hours >= 12 ? "PM" : "AM",
  };
}

// El reloj solo corre mientras está visible, así no re-renderizo el footer cada segundo
function useClockSound() {
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const [showClock, setShowClock] = useState(false);
  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SOUNDS.clock);
    audio.loop = true;
    clockAudioRef.current = audio;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    if (!showClock) return;
    setClock(formatClock(new Date()));
    const interval = setInterval(() => setClock(formatClock(new Date())), CLOCK_TICK_MS);
    return () => clearInterval(interval);
  }, [showClock]);

  const toggleClockSound = (play: boolean) => {
    const audio = clockAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    if (play) audio.play().catch(() => {});
    else audio.pause();
  };

  return { clockTime: clock.time, clockPeriod: clock.period, showClock, setShowClock, toggleClockSound };
}

function useTapHighlight() {
  const isMobile = useIsMobile();
  const [tapHighlight, setTapHighlight] = useState<string | null>(null);

  const handleTap = (key: string) => {
    if (!isMobile) return;
    setTapHighlight(key);
    setTimeout(() => setTapHighlight(null), TOUCH_FEEDBACK_MS.short);
  };

  return { isMobile, tapHighlight, handleTap };
}

// Componente principal del footer
export default function Footer() {
  const { content } = useContent();
  const { theme } = useApp();
  const footerData = content.footer as FooterLang | undefined;
  const { clockTime, clockPeriod, showClock, setShowClock, toggleClockSound } =
    useClockSound();
  const { isMobile, tapHighlight, handleTap } = useTapHighlight();

  if (!footerData) return null;

  const isDark = theme === "dark";

  const baseText = isDark ? "text-gray-200" : "text-white";
  const phraseText = isDark ? "text-white" : "text-gold";
  const authorText = isDark ? "text-gray-300" : "text-white";
  const filterBrightness = isDark ? "brightness(0.85)" : "brightness(1)";
  const bgBase = isDark ? "bg-ink-soft" : "bg-paper";
  const borderGold = isDark ? "border-gold" : "border-gold-muted";

  return (
    <footer
      className={`relative text-center py-10 md:py-16 transition-all duration-500 overflow-hidden ${
        isDark ? "bg-ink-deep" : "bg-parchment-light"
      }`}
      style={{
        backgroundImage: `url('${footerData.backgroundLeft}'), url('${footerData.backgroundRight}')`,
        backgroundPosition: "left center, right center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "50% 100%, 50% 100%",
        filter: filterBrightness,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 text-center">
        {/* Título */}
        <h2
          className={`font-irish text-3xl sm:text-4xl md:text-5xl px-6 py-2 rounded-full shadow-md transition-all duration-300 bg-red-600 text-white cursor-pointer
            ${
              tapHighlight === "title"
                ? "bg-gold text-black scale-105"
                : "hover:bg-gold hover:text-black"
            }`}
          onClick={() => handleTap("title")}
        >
          {footerData.title}
        </h2>

        {/* Reloj interactivo */}
        <div className="flex justify-center relative z-10">
          <div
            className="inline-block px-4 sm:px-6 py-4 cursor-pointer select-none"
            onClick={() => {
              toggleClockSound(!showClock);
              setShowClock(!showClock);
            }}
            onMouseEnter={() => {
              if (!isMobile) {
                setShowClock(true);
                toggleClockSound(true);
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setShowClock(false);
                toggleClockSound(false);
              }
            }}
          >
            <AnimatePresence>
              {showClock && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className={`px-4 sm:px-6 py-3 rounded-xl border shadow-[0_0_20px_color-mix(in_srgb,var(--gold)_50%,transparent)] inline-block ${bgBase} ${borderGold}`}
                >
                  <span
                    className={`font-esteban text-lg sm:text-xl ${
                      isDark ? "text-white" : "text-black"
                    }`}
                    style={{ WebkitTextStroke: isDark ? "0.5px var(--gold)" : "none" }}
                  >
                    {clockTime}
                  </span>
                  <span className="ml-2 text-red-600 font-bold text-lg sm:text-xl">
                    {clockPeriod}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Créditos */}
        <div
          className={`text-base sm:text-lg font-esteban ${baseText} drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 ${
            tapHighlight === "credits" ? "text-gold scale-105" : ""
          }`}
          onClick={() => handleTap("credits")}
        >
          {footerData.credits}
          <br />
          {footerData.rights}
        </div>

        {/* Frase */}
        <p
          className={`font-labrada text-lg sm:text-xl md:text-2xl ${phraseText} transition-all duration-300 hover:text-gold-muted hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105 ${
            tapHighlight === "phrase" ? "text-gold scale-105" : ""
          }`}
          onClick={() => handleTap("phrase")}
          style={{
            WebkitTextStroke: isDark ? "0.5px var(--gold)" : "none",
          }}
        >
          {footerData.phrase}
        </p>

        {/* Autor */}
        <p
          className={`font-esteban text-base sm:text-lg md:text-xl ${authorText} drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1 ${
            tapHighlight === "author" ? "text-gold scale-105" : ""
          }`}
          onClick={() => handleTap("author")}
        >
          {footerData.author}
        </p>

        {/* Redes sociales */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 w-full max-w-lg mx-auto`}
        >
          {Object.entries(footerData.social).map(([key, social]) => (
            <a
              key={key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playSound(`${SOUNDS_DIR}${social.sound}`);
                handleTap(key);
              }}
              className={`flex items-center justify-center gap-2 rounded-3xl px-5 py-3 border-2 transition-all duration-300 shadow-md ${bgBase} ${borderGold} ${
                isDark ? "text-white" : "text-black"
              } hover:border-red-600 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--alert)_40%,transparent)] ${
                tapHighlight === key ? "border-red-600 scale-105" : ""
              }`}
            >
              {key === "linkedin" && (
                <FaLinkedin className="text-blue-600 text-2xl transition-all duration-300 hover:scale-125" />
              )}
              {key === "whatsapp" && (
                <FaWhatsapp className="text-green-600 text-2xl transition-all duration-300 hover:scale-125" />
              )}
              {key === "github" && (
                <FaGithub className="text-ink-muted dark:text-white text-2xl transition-all duration-300 hover:scale-125" />
              )}
              <span className="font-esteban text-sm sm:text-base md:text-lg hover:text-gold transition-all duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
