"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaVolumeUp, FaBriefcase } from "react-icons/fa";
import { useContent } from "./ContentProvider";
import { useApp } from "./ThemeLangContext";

interface ExperienciaData {
  title: string;
  academic: string;
  academicText: string;
  academicProjects: string;
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
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  if (loading) return <p className="text-center text-white">Cargando...</p>;

  const experiencia = content?.experiencia as ExperienciaData | undefined;
  if (!experiencia) return null;

  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-[#1e1e1e]" : "bg-[#f5f5f5]";
  const textColor = isDark ? "text-[#eaeaea]" : "text-[#5c4c4c]";

  const speakText = (text: string, type: "academico" | "laboral") => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeaking(null);
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
    const fallbackVoice = voices.find((v) => v.lang === preferredLang);

    utterance.voice = maleVoice ?? fallbackVoice ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(type);
    utterance.onend = () => setSpeaking(null);

    synth.speak(utterance);
  };

  const handleTouchHover = (type: "academico" | "laboral") => {
    if (isTouchDevice) {
      setHovered(type);
      setTimeout(() => setHovered(null), 800);
    }
  };

  const renderCard = (
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
      <div
        key={type}
        onTouchStart={() => handleTouchHover(type)}
        className={`w-full max-w-[700px] ${cardBg} shadow-lg 
        p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 border 
        ${isDark ? "border-[#c4af37]/40" : "border-transparent"}
        ${isHovered ? "shadow-[0_0_25px_#c4af37] scale-[1.02]" : "hover:shadow-[0_0_25px_#c4af37] hover:scale-[1.02]"}`}
      >
        {/* Encabezado del card */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            {icon}
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-['Irish_Grover'] text-center sm:text-left transition-all duration-300 hover:text-[#c4af37]`}
              style={{ WebkitTextStroke: "0.8px #c4af37" }}
            >
              {title}
            </h3>
          </div>

          <button
            onClick={() => speakText(text, type)}
            onMouseEnter={() => setHovered(type)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => handleTouchHover(type)}
            className={`text-lg sm:text-xl p-2 rounded-full transition-all duration-300 
              hover:scale-110 hover:shadow-md ${
                isSpeaking || isHovered ? "text-blue-600" : "text-gray-400"
              }`}
          >
            <FaVolumeUp />
          </button>
        </div>

        {/* Texto descriptivo */}
        <p className={`font-['Esteban'] ${textColor} text-sm sm:text-base md:text-lg mb-3 text-justify`}>
          {text}
        </p>

        {/* Proyectos académicos (solo si existen) */}
        {projectsTitle && (
          <p className="font-['Esteban'] text-[#c4af37] font-bold text-sm sm:text-base mb-2">
            {projectsTitle}
          </p>
        )}

        {/* Lista */}
        <ul
          className={`list-disc pl-5 sm:pl-8 font-['Esteban'] ${textColor} space-y-1 text-sm sm:text-base`}
        >
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: "url('/images/city.webp')" }}
    >
      {/* 🔴 Título Principal */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4 sm:px-6 py-2 
        rounded-full shadow-lg font-['Irish_Grover'] transition-all duration-500
        bg-red-600 text-white hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]`}
      >
        {experiencia.title}
      </h2>

      {/* 🟨 Bloques en columna (uno debajo del otro siempre) */}
      <div className="flex flex-col items-center gap-10 mt-10 w-full">
        {/* Card Académico */}
        {renderCard(
          <div className="flex justify-center sm:justify-start">
            <Image
              src="/images/seminar.webp"
              alt="Seminario"
              width={48}
              height={48}
              className="w-12 sm:w-14 md:w-16 aspect-square border-2 border-red-600 object-cover transition-all duration-300 hover:scale-110 hover:border-[#c4af37]"
            />
          </div>,
          experiencia.academic,
          experiencia.academicText,
          experiencia.academicList,
          "academico",
          experiencia.academicProjects
        )}

        {/* Card Laboral */}
        {renderCard(
          <div className="flex justify-center sm:justify-start">
            <FaBriefcase className="text-3xl sm:text-4xl md:text-5xl text-red-600 transition-all duration-300 hover:scale-110 hover:text-[#c4af37]" />
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
