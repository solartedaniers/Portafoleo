"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaVolumeUp, FaBriefcase } from "react-icons/fa";
import { useContent } from "./ContentProvider";
import { useApp } from "./ThemeLangContext";

interface ExperienciaData {
  title: string;
  academic: string;
  academicText: string;
  academicProjects?: string;
  academicList: string[];
  work: string;
  workText: string;
  workList: string[];
}

export default function Experiencia() {
  const { content, loading } = useContent();
  const { lang, theme } = useApp();

  const [speaking, setSpeaking] = useState<"academico" | "laboral" | null>(null);
  const [hovered, setHovered] = useState<"academico" | "laboral" | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  // Inicializa las voces disponibles para speechSynthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synth: SpeechSynthesis = window.speechSynthesis;
      const handleVoicesChanged = () => synth.getVoices();
      synth.onvoiceschanged = handleVoicesChanged;
      synth.getVoices();
      return () => {
        synth.onvoiceschanged = null;
      };
    }
  }, []);

  if (loading) return <p className="text-center py-8">Cargando...</p>;

  const experiencia = content?.experiencia as ExperienciaData | undefined;
  if (!experiencia) return null;

  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-[#1a1a1a]" : "bg-[#ffffff]";
  const textColor = isDark ? "text-[#e6e6e6]" : "text-[#4b423f]";

  const speakText = (text: string, type: "academico" | "laboral") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth: SpeechSynthesis = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices: SpeechSynthesisVoice[] = synth.getVoices();
    const preferredLang = lang === "es" ? "es-ES" : "en-US";

    const maleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith(preferredLang.slice(0, 2)) &&
          /male|man|david|jorge|diego|miguel|pablo|john|mike/i.test(v.name)
      ) ?? voices.find((v) => v.lang.startsWith(preferredLang.slice(0, 2)));

    utterance.voice = maleVoice ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(type);
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);

    synth.speak(utterance);
  };

  const handleTouchHover = (type: "academico" | "laboral") => {
    if (isTouchDevice) {
      setHovered(type);
      setTimeout(() => setHovered(null), 800);
    }
  };

  const renderCard = (
    keyId: string,
    icon: React.ReactNode,
    title: string,
    text: string,
    list: string[],
    type: "academico" | "laboral",
    projectsTitle?: string
  ) => {
    const isHovered = hovered === type;
    const isSpeaking = speaking === type;

    return (
      <article
        key={keyId}
        onTouchStart={() => handleTouchHover(type)}
        className={`w-full max-w-3xl ${cardBg} ${textColor} shadow-lg p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 border
          ${isDark ? "border-[#c4af37]/30" : "border-gray-200"}
          ${isHovered ? "scale-[1.02] shadow-[0_0_25px_rgba(196,175,55,0.18)]" : "hover:shadow-[0_0_20px_rgba(196,175,55,0.12)] hover:scale-[1.01]"}`}
        role="region"
        aria-labelledby={`${type}-title`}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">{icon}</div>
            <h3
              id={`${type}-title`}
              className="truncate text-lg sm:text-xl md:text-2xl font-['Irish_Grover'] transition-colors duration-200"
              style={{ WebkitTextStroke: "0.6px #c4af37" }}
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center flex-shrink-0 ml-auto">
            <button
              onClick={() => speakText(text, type)}
              onMouseEnter={() => !isTouchDevice && setHovered(type)}
              onMouseLeave={() => !isTouchDevice && setHovered(null)}
              onTouchStart={() => handleTouchHover(type)}
              aria-pressed={isSpeaking}
              aria-label={
                isSpeaking
                  ? lang === "es"
                    ? "Detener narración"
                    : "Stop narration"
                  : lang === "es"
                  ? "Reproducir narración"
                  : "Play narration"
              }
              className={`p-2 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                ${isSpeaking || isHovered ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"}`}
            >
              <FaVolumeUp size={20} />
            </button>
          </div>
        </div>

        <p className={`mt-4 font-['Esteban'] text-sm sm:text-base md:text-lg leading-relaxed text-justify`}>
          {text}
        </p>

        {projectsTitle && (
          <p className="mt-4 font-['Esteban'] text-sm sm:text-base font-semibold text-[#c4af37]">
            {projectsTitle}
          </p>
        )}

        <ul className="mt-3 list-disc pl-5 sm:pl-8 space-y-1 text-sm sm:text-base font-['Esteban']">
          {list.map((item, i) => (
            <li key={i} className="break-words">
              {item}
            </li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: "url('/images/city.webp')" }}
    >
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4 sm:px-6 py-2 rounded-full shadow-md font-['Irish_Grover'] transition-all duration-300
          bg-red-600 text-white hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]`}
      >
        {experiencia.title}
      </h2>

      <div className="w-full flex flex-col items-center gap-10 mt-10">
        {renderCard(
          "academico",
          <div className="flex items-center justify-center">
            <Image
              src="/images/seminar.webp"
              alt="Seminario"
              width={48}
              height={48}
              className="w-12 sm:w-14 md:w-16 h-auto object-cover rounded-md border-2 border-red-600 transition-transform duration-200 hover:scale-110 hover:border-[#c4af37]"
            />
          </div>,
          experiencia.academic,
          experiencia.academicText,
          experiencia.academicList,
          "academico",
          experiencia.academicProjects
        )}

        {renderCard(
          "laboral",
          <div className="flex items-center justify-center">
            <FaBriefcase className="text-3xl sm:text-4xl md:text-5xl text-red-600 transition-transform duration-200 hover:scale-110 hover:text-[#c4af37]" />
          </div>,
          experiencia.work,
          experiencia.workText,
          experiencia.workList,
          "laboral"
        )}
      </div>
    </section>
  );
}
