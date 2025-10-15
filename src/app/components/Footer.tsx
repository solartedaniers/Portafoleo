"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// 🧩 Tipos de datos esperados desde el JSON
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

interface FooterContent {
  es: FooterLang;
  en: FooterLang;
}

export default function Footer() {
  const { lang } = useApp();
  const { content } = useContent();
  const data = (content?.footer as FooterContent)?.[lang];

  const [clockTime, setClockTime] = useState("");
  const [clockPeriod, setClockPeriod] = useState("");
  const [showClock, setShowClock] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Cargar sonido del reloj
  useEffect(() => {
    clockAudioRef.current = new Audio("/sounds/clock.mp3");
    clockAudioRef.current.loop = true;
  }, []);

  const handleClockSound = (play: boolean) => {
    if (clockAudioRef.current) {
      if (play) {
        clockAudioRef.current.currentTime = 0;
        clockAudioRef.current.play();
      } else {
        clockAudioRef.current.pause();
        clockAudioRef.current.currentTime = 0;
      }
    }
  };

  // ⏰ Actualizar hora
  useEffect(() => {
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

  // 📱 Detectar móvil
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 🔊 Sonido al hacer clic en redes
  const playSound = (file: string) => {
    const audio = new Audio(`/sounds/${file}`);
    audio.play();
  };

  // 🖱 Hover/Tap universal
  const handleTouchHover = (callback: () => void) => {
    if (isMobile) callback();
  };

  if (!data) return null; // Evita errores si el JSON no ha cargado

  return (
    <footer
      className="relative bg-cover bg-center text-center py-10 z-0"
      style={{
        backgroundImage: `url('${data.backgroundLeft}'), url('${data.backgroundRight}')`,
        backgroundPosition: "left, right",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "50% 100%, 50% 100%",
      }}
    >
      {/* 🔴 Título */}
      <h2
        className="font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-full shadow-md transition-all duration-300 inline-block hover:bg-yellow-500 hover:text-black"
        onClick={() => handleTouchHover(() => alert(data.title))}
      >
        {data.title}
      </h2>

      {/* 🕰 Reloj */}
      <div className="mt-6 flex justify-center relative z-10">
        <div
          className="inline-block px-6 py-4 cursor-pointer select-none"
          onClick={() => {
            setShowClock((prev) => {
              handleClockSound(!prev);
              return !prev;
            });
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setShowClock(true);
              handleClockSound(true);
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setShowClock(false);
              handleClockSound(false);
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
                className="bg-[#d9d9d9] px-6 py-3 rounded-xl border border-black shadow-[0_0_20px_silver] inline-block z-20"
              >
                <span
                  className="text-black font-['Esteban'] text-xl"
                  style={{
                    WebkitTextStroke: "0.5px #d4af37",
                    textShadow: "0 0 4px #ffffff",
                  }}
                >
                  {clockTime}
                </span>
                <span
                  className="ml-2 text-red-600 font-bold text-xl"
                  style={{
                    textShadow: "0 0 4px #ffffff",
                  }}
                >
                  {clockPeriod}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📄 Créditos */}
      <div
        className="mt-8 text-lg font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105"
        onClick={() => handleTouchHover(() => alert(data.credits))}
      >
        {data.credits}
        <br />
        {data.rights}
      </div>

      {/* 📜 Frase */}
      <p
        className="mt-6 font-['Labrada'] text-xl text-white transition-all duration-300 hover:text-[#C0C0C0] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105"
        onClick={() => handleTouchHover(() => alert(data.phrase))}
        style={{ WebkitTextStroke: "0.5px #c4af37" }}
      >
        {data.phrase}
      </p>

      <p
        className="mt-4 font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1"
        onClick={() => handleTouchHover(() => alert(data.author))}
      >
        {data.author}
      </p>

      {/* 🔗 Redes sociales */}
      <div
        className={`mt-8 flex ${
          isMobile
            ? "flex-col items-center gap-4"
            : "flex-row justify-center gap-6"
        }`}
      >
        {/* 🔗 LinkedIn */}
        <a
          href={data.social.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playSound(data.social.linkedin.sound);
            handleTouchHover(() => alert("Abriendo LinkedIn..."));
          }}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaLinkedin className="text-blue-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            {data.social.linkedin.label}
          </span>
        </a>

        {/* 🔗 WhatsApp */}
        <a
          href={data.social.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playSound(data.social.whatsapp.sound);
            handleTouchHover(() => alert("Abriendo WhatsApp..."));
          }}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaWhatsapp className="text-green-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            {data.social.whatsapp.label}
          </span>
        </a>

        {/* 🔗 GitHub */}
        <a
          href={data.social.github.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playSound(data.social.github.sound);
            handleTouchHover(() => alert("Abriendo GitHub..."));
          }}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaGithub className="text-black text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            {data.social.github.label}
          </span>
        </a>
      </div>
    </footer>
  );
}
