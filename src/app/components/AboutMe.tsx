"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// 🌟 Hook personalizado para síntesis de voz
function useSpeechSynthesis(lang: string) {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const speakText = (text: string, index: number) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const preferredLang = lang === "es" ? "es-ES" : "en-US";
    const voices = synth.getVoices();
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

  return { speakingIndex, speakText };
}

// 🌟 Hook para detectar soporte hover
function useHoverDetection() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover)");
      setHasHover(mq.matches);
    }
  }, []);
  return hasHover;
}

// 🌟 Componente principal
interface AboutItem {
  img: string;
  audio: string;
  text: string;
}

interface AboutContent {
  title: string;
  items: AboutItem[];
}

interface ContentStructure {
  about?: AboutContent;
}

export default function AboutMe() {
  const { lang, theme } = useApp();
  const { content, loading } = useContent();
  const about = (content as ContentStructure)?.about;
  const items: AboutItem[] = about?.items || [];

  const { speakingIndex, speakText } = useSpeechSynthesis(lang);
  const hasHover = useHoverDetection();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTouch = (index: number) => {
    if (!hasHover) {
      setHoveredIndex(index);
      setTimeout(() => setHoveredIndex(null), 1200);
    }
  };

  if (loading) return <p>Cargando contenido...</p>;
  if (!about) return <p>No hay contenido disponible.</p>;

  // 🎨 Estilos dinámicos
  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-[#f5f5f5] text-black";
  const forestFilter = theme === "dark" ? "brightness(0.6)" : "brightness(1)";

  return (
    <section className="w-full overflow-x-hidden transition-all duration-500">
      {/* 🌲 Fondo superior */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: "url('/images/forest-2.webp')", filter: forestFilter }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          {/* Título */}
          <h2
            className="text-2xl sm:text-4xl text-center mb-10 px-4 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-500
                       bg-red-600/60 text-white hover:bg-[#d4af37] hover:text-black font-['Irish_Grover']"
          >
            {about.title ?? "About Me"}
          </h2>

          {/* 🧱 Cuadros de contenido verticales */}
          <div className="flex flex-col gap-10 w-full max-w-2xl">
            {items.map((item, i) => (
              <div
                key={i}
                onTouchStart={() => handleTouch(i)}
                className={`relative flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg border transition-all duration-500 w-full ${cardBg} ${
                  hoveredIndex === i
                    ? "scale-105 border-2 border-[#d4af37]"
                    : "hover:scale-105 hover:border-[#d4af37]"
                }`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0px 4px 20px rgba(255, 215, 0, 0.3)"
                      : "0px 4px 20px #c4af37",
                }}
              >
                {/* 🔊 Icono de voz */}
                <div
                  aria-label="Toggle speech"
                  onClick={() => speakText(item.text, i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
                    speakingIndex === i || hoveredIndex === i
                      ? "text-blue-600 scale-125"
                      : "text-gray-500"
                  }`}
                >
                  <FaVolumeUp className="text-xl sm:text-2xl" />
                </div>

                {/* 🖼 Imagen */}
                <Image
                  src={item.img}
                  alt={item.text ?? "Imagen"}
                  width={110}
                  height={110}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 shadow-md transition-all duration-500 ${
                    hoveredIndex === i
                      ? "border-[#d4af37] scale-110"
                      : "border-red-600 hover:border-[#d4af37]"
                  }`}
                />

                {/* 📝 Texto */}
                <p
                  className="text-base sm:text-lg text-center mt-6 transition-colors duration-500"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
