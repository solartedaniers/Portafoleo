"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// 🧩 Tipos seguros para el contenido
interface AboutItem {
  img: string;
  audio: string;
  text: { es: string; en: string };
}

interface AboutContent {
  title: { es: string; en: string };
  items: AboutItem[];
}

interface ContentStructure {
  about?: AboutContent;
}

export default function AboutMe() {
  const { lang } = useApp();
  const { content, loading } = useContent();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasHover, setHasHover] = useState(true);

  const about = (content as ContentStructure)?.about;
  const items: AboutItem[] = about?.items || [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover)");
      setHasHover(mq.matches);
    }
  }, []);

  const speakText = (text: string, index: number) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const preferredLang = lang === "es" ? "es-ES" : "en-US";

    const maleVoice = voices.find(
      (v) =>
        v.lang === preferredLang &&
        /male|man|david|jorge|diego|miguel|pablo|john|mike/i.test(v.name)
    );
    utterance.voice = maleVoice ?? voices.find((v) => v.lang === preferredLang) ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);

    synth.speak(utterance);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const handleTouch = (index: number) => {
    if (!hasHover) {
      setHoveredIndex(index);
      setTimeout(() => setHoveredIndex(null), 1200);
    }
  };

  if (loading) return <p>Cargando contenido...</p>;
  if (!about) return <p>No hay contenido disponible.</p>;

  return (
    <section className="w-full text-black overflow-x-hidden">
      {/* 🌲 Fondo superior */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest-2.webp')" }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          <h2
            className="text-2xl sm:text-4xl text-center mb-10 px-4 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-500
                       bg-red-600/60 text-white hover:bg-[#d4af37] hover:text-black font-['Irish_Grover']"
          >
            {about.title?.[lang] ?? "About Me"}
          </h2>

          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.map((item, i) => (
              <div
                key={i}
                onTouchStart={() => handleTouch(i)}
                className={`relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 w-full shadow-lg ${
                  hoveredIndex === i ? "scale-105 border-2 border-[#c4af37]" : "hover:scale-105"
                }`}
                style={{ boxShadow: "0px 4px 20px #c4af37" }}
              >
                <div
                  onClick={() => speakText(item.text[lang], i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
                    speakingIndex === i || hoveredIndex === i
                      ? "text-blue-600 scale-125"
                      : "text-gray-500"
                  }`}
                >
                  <FaVolumeUp className="text-xl sm:text-2xl transition-transform duration-300" />
                </div>

                <Image
                  src={item.img}
                  alt={item.text[lang] ?? "Imagen"}
                  width={110}
                  height={110}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 shadow-md transition-all duration-500 ${
                    hoveredIndex === i
                      ? "border-[#c4af37] scale-110"
                      : "border-red-600 hover:border-[#c4af37]"
                  }`}
                />

                <p
                  className="text-base sm:text-lg text-center mt-6"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {item.text[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="auto" />
    </section>
  );
}