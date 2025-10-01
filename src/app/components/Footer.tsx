"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";

export default function Footer() {
  const { lang } = useApp();
  const [clockTime, setClockTime] = useState("");
  const [clockPeriod, setClockPeriod] = useState("");
  const [showClock, setShowClock] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Cargar el audio del reloj
  useEffect(() => {
    clockAudioRef.current = new Audio("/sounds/clock.mp3");
    clockAudioRef.current.loop = true; // ⏳ Sonido continuo
  }, []);

  // 🔊 Manejo del sonido del reloj
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

  // ⏰ Reloj en tiempo real
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setClockTime(formattedTime);
      setClockPeriod(ampm);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📱 Detectar si es móvil
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // 🔊 Reproducir sonidos de botones sociales
  const playSound = (file: string) => {
    const audio = new Audio(`/sounds/${file}`);
    audio.play();
  };

  const translations = {
    es: {
      title: "Pie de página",
      credits: "© 2026 Damiers Alexander Solarte Limas - Ingeniero de Software",
      rights: "Todos los derechos son reservados",
      phrase:
        "“La verdadera grandeza está en crecer sin perder los principios que nos definen.”",
      author: "Portafolio creado con pasión por Damiers Solarte – 2026",
    },
    en: {
      title: "Footer",
      credits: "© 2026 Damiers Alexander Solarte Limas – Software Engineer",
      rights: "All rights reserved",
      phrase:
        "“True greatness lies in growing without losing the principles that define us.”",
      author: "Portfolio created with passion by Damiers Solarte – 2026",
    },
  };

  const t = translations[lang];

  return (
    <footer
      className="relative bg-cover bg-center text-center py-10 z-0"
      style={{
        backgroundImage: "url('/images/wolf.jpg'), url('/images/samurai.jpg')",
        backgroundPosition: "left, right",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "50% 100%, 50% 100%",
      }}
    >
      {/* 🔴 Título */}
      <h2 className="font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-xl shadow-md transition-all duration-300 inline-block hover:bg-yellow-500 hover:text-black">
        {t.title}
      </h2>

      {/* 🕰 Reloj */}
      <div className="mt-6 flex justify-center relative z-10">
        <div
          className="inline-block px-6 py-4 cursor-pointer select-none"
          onClick={() => {
            if (isMobile) {
              setShowClock((prev) => {
                handleClockSound(!prev);
                return !prev;
              });
            }
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
                className="bg-[#f5f5f5] px-6 py-3 rounded-xl border border-black shadow-[0_0_20px_silver] inline-block z-20"
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
      <div className="mt-8 text-lg font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105">
        {t.credits}
        <br />
        {t.rights}
      </div>

      {/* 📜 Frase */}
      <p
        className="mt-6 font-['Labrada'] text-xl text-white transition-all duration-300 hover:text-[#C0C0C0] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105"
        style={{ WebkitTextStroke: "0.5px #c4af37" }}
      >
        {t.phrase}
      </p>

      <p className="mt-4 font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1">
        {t.author}
      </p>

      {/* 🔗 Redes sociales */}
      <div
        className={`mt-8 flex ${
          isMobile ? "flex-col items-center gap-4" : "flex-row justify-center gap-6"
        }`}
      >
        {/* 🔊 LinkedIn */}
        <a
          href="https://www.linkedin.com/in/damiers-solarte-08716b381"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("LinkedIn.mp3")}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaLinkedin className="text-blue-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            LinkedIn
          </span>
        </a>

        {/* 🔊 WhatsApp */}
        <a
          href="https://wa.me/573167969206"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("whatsapp.mp3")}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaWhatsapp className="text-green-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            WhatsApp
          </span>
        </a>

        {/* 🔊 GitHub */}
        <a
          href="https://github.com/solartedaniers"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("url.mp3")}
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaGithub className="text-black text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            GitHub
          </span>
        </a>
      </div>
    </footer>
  );
}
