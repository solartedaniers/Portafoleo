"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useContent } from "./ContentProvider";

// 🧩 Tipos
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

export default function Footer() {
  const { content } = useContent();
  const footerData = content?.footer as FooterLang;

  const [clockTime, setClockTime] = useState("");
  const [clockPeriod, setClockPeriod] = useState("");
  const [showClock, setShowClock] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tapHighlight, setTapHighlight] = useState<string | null>(null);
  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clockAudioRef.current = new Audio("/sounds/clock.mp3");
    clockAudioRef.current.loop = true;
  }, []);

  const handleClockSound = (play: boolean) => {
    if (!clockAudioRef.current) return;
    if (play) {
      clockAudioRef.current.currentTime = 0;
      clockAudioRef.current.play().catch(() => {});
    } else {
      clockAudioRef.current.pause();
      clockAudioRef.current.currentTime = 0;
    }
  };

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

  if (!footerData) return null;

  return (
    <footer
      className="relative bg-cover bg-center text-center py-10 z-0"
      style={{
        backgroundImage: `url('${footerData.backgroundLeft}'), url('${footerData.backgroundRight}')`,
        backgroundPosition: "left, right",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "50% 100%, 50% 100%",
      }}
    >
      <h2
        className={`font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-full shadow-md transition-all duration-300 inline-block ${
          tapHighlight === "title"
            ? "bg-yellow-500 text-black scale-105"
            : "hover:bg-yellow-500 hover:text-black"
        }`}
        onClick={() => handleTap("title")}
      >
        {footerData.title}
      </h2>

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
                  style={{ textShadow: "0 0 4px #ffffff" }}
                >
                  {clockPeriod}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`mt-8 text-lg font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 ${
          tapHighlight === "credits" ? "text-yellow-400 scale-105" : ""
        }`}
        onClick={() => handleTap("credits")}
      >
        {footerData.credits}
        <br />
        {footerData.rights}
      </div>

      <p
        className={`mt-6 font-['Labrada'] text-xl text-white transition-all duration-300 hover:text-[#C0C0C0] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105 ${
          tapHighlight === "phrase" ? "text-yellow-300 scale-105" : ""
        }`}
        onClick={() => handleTap("phrase")}
        style={{ WebkitTextStroke: "0.5px #c4af37" }}
      >
        {footerData.phrase}
      </p>

      <p
        className={`mt-4 font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1 ${
          tapHighlight === "author" ? "text-yellow-300 scale-105" : ""
        }`}
        onClick={() => handleTap("author")}
      >
        {footerData.author}
      </p>

      <div
        className={`mt-8 flex ${
          isMobile
            ? "flex-col items-center gap-4"
            : "flex-row justify-center gap-6"
        }`}
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
            className={`flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white ${
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
              <FaGithub className="text-black text-2xl transition-all duration-300 hover:scale-125" />
            )}
            <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
              {social.label}
            </span>
          </a>
        ))}
      </div>
    </footer>
  );
}