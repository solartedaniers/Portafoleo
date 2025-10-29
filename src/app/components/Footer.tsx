"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useContent } from "./ContentProvider";
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

// Hook para reloj y sonido
function useClockSound() {
  const [clockTime, setClockTime] = useState("");
  const [clockPeriod, setClockPeriod] = useState("");
  const [showClock, setShowClock] = useState(false);
  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clockAudioRef.current = new Audio("/sounds/clock.mp3");
    clockAudioRef.current.loop = true;

    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setClockTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      setClockPeriod(ampm);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleClockSound = (play: boolean) => {
    const audio = clockAudioRef.current;
    if (!audio) return;
    if (play) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return { clockTime, clockPeriod, showClock, setShowClock, toggleClockSound };
}

// Hook para detección móvil e interacción con sonido
function useInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [tapHighlight, setTapHighlight] = useState<string | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const playSound = (file: string) => {
    const audio = new Audio(`/sounds/${file}`);
    audio.play().catch(() => {});
  };

  const handleTap = (key: string) => {
    if (!isMobile) return;
    setTapHighlight(key);
    setTimeout(() => setTapHighlight(null), 400);
  };

  return { isMobile, tapHighlight, handleTap, playSound };
}

// Componente principal del footer
export default function Footer() {
  const { content } = useContent();
  const { theme } = useApp();
  const footerData = content?.footer as FooterLang;
  const { clockTime, clockPeriod, showClock, setShowClock, toggleClockSound } =
    useClockSound();
  const { isMobile, tapHighlight, handleTap, playSound } = useInteractive();

  if (!footerData) return null;

  const isDark = theme === "dark";

  const baseText = isDark ? "text-gray-200" : "text-white";
  const phraseText = isDark ? "text-white" : "text-[#d4af37]";
  const authorText = isDark ? "text-gray-300" : "text-white";
  const filterBrightness = isDark ? "brightness(0.85)" : "brightness(1)";
  const bgBase = isDark ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]";
  const borderGold = isDark ? "border-[#d4af37]" : "border-[#c4af37]";

  return (
    <footer
      className={`relative text-center py-10 md:py-16 transition-all duration-500 overflow-hidden ${
        isDark ? "bg-[#0f0f0f]" : "bg-[#f3efe2]"
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
          className={`font-['Irish_Grover'] text-3xl sm:text-4xl md:text-5xl px-6 py-2 rounded-full shadow-md transition-all duration-300 bg-red-600 text-white cursor-pointer
            ${
              tapHighlight === "title"
                ? "bg-[#d4af37] text-black scale-105"
                : "hover:bg-[#d4af37] hover:text-black"
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
              setShowClock((prev) => {
                toggleClockSound(!prev);
                return !prev;
              });
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
                  className={`px-4 sm:px-6 py-3 rounded-xl border shadow-[0_0_20px_rgba(212,175,55,0.5)] inline-block ${bgBase} ${borderGold}`}
                >
                  <span
                    className={`font-['Esteban'] text-lg sm:text-xl ${
                      isDark ? "text-white" : "text-black"
                    }`}
                    style={{ WebkitTextStroke: isDark ? "0.5px #d4af37" : "none" }}
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
          className={`text-base sm:text-lg font-['Esteban'] ${baseText} drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 ${
            tapHighlight === "credits" ? "text-[#d4af37] scale-105" : ""
          }`}
          onClick={() => handleTap("credits")}
        >
          {footerData.credits}
          <br />
          {footerData.rights}
        </div>

        {/* Frase */}
        <p
          className={`font-['Labrada'] text-lg sm:text-xl md:text-2xl ${phraseText} transition-all duration-300 hover:text-[#c4af37] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105 ${
            tapHighlight === "phrase" ? "text-[#d4af37] scale-105" : ""
          }`}
          onClick={() => handleTap("phrase")}
          style={{
            WebkitTextStroke: isDark ? "0.5px #d4af37" : "none",
          }}
        >
          {footerData.phrase}
        </p>

        {/* Autor */}
        <p
          className={`font-['Esteban'] text-base sm:text-lg md:text-xl ${authorText} drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1 ${
            tapHighlight === "author" ? "text-[#d4af37] scale-105" : ""
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
                playSound(social.sound);
                handleTap(key);
              }}
              className={`flex items-center justify-center gap-2 rounded-3xl px-5 py-3 border-2 transition-all duration-300 shadow-md ${bgBase} ${borderGold} ${
                isDark ? "text-white" : "text-black"
              } hover:border-red-600 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] ${
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
                <FaGithub className="text-[#333] dark:text-white text-2xl transition-all duration-300 hover:scale-125" />
              )}
              <span className="font-['Esteban'] text-sm sm:text-base md:text-lg hover:text-[#d4af37] transition-all duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
