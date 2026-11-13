"use client";
import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useHasHover } from "@/hooks/useMediaQuery";
import { useSpeech } from "@/hooks/useSpeech";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

interface PhilosophyData {
  title: string;
  text: string[];
  image: string;
  imageAlt: string;
  background: string;
}

interface UiContent {
  speechToggle: string;
}

const SPEECH_KEY = "philosophy";

export default function Philosophy() {
  const { lang, theme } = useApp();
  const { content } = useContent();
  const hasHover = useHasHover();
  const { speakingKey, toggle } = useSpeech<string>(lang);
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const data = content.filosofia as PhilosophyData | undefined;
  const ui = content.ui as UiContent;
  const speaking = speakingKey === SPEECH_KEY;

  const handleTouch = () => {
    if (hasHover) return;
    setHovered(true);
    setTimeout(() => setHovered(false), TOUCH_FEEDBACK_MS.short);
  };

  const handleIconTouch = () => {
    if (hasHover) return;
    setIconHovered(true);
    setTimeout(() => setIconHovered(false), TOUCH_FEEDBACK_MS.short);
  };

  if (!data) return null;

  const bgColor = theme === "dark" ? "bg-ink" : "bg-paper";
  const textColor = theme === "dark" ? "text-mist" : "text-umber";

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url('${data.background}')` }}
    >
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "bg-black/50" : "bg-white/40"
        } z-0`}
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10 mt-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600 text-white font-irish hover:bg-gold hover:text-black hover:shadow-[0_0_25px_var(--gold)]">
          {data.title}
        </h2>

        <div
          className={`relative w-full ${bgColor} rounded-2xl shadow-[0_0_20px_var(--gold)] p-6 sm:p-8 md:p-10 transition-all duration-500 border-4 border-transparent flex flex-col md:flex-row items-center gap-8 ${
            hovered ? "scale-105 border-red-600 shadow-[0_0_30px_var(--gold)]" : ""
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={handleTouch}
        >
          {/* Botón de lectura en voz alta */}
          <button
            type="button"
            aria-label={ui.speechToggle}
            aria-pressed={speaking}
            onClick={() => toggle(SPEECH_KEY, data.text.join(" "))}
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            onTouchStart={handleIconTouch}
            className={`absolute top-3 right-3 transition-all duration-300 hover:scale-125 ${
              speaking || iconHovered
                ? "text-blue-600 drop-shadow-[0_0_10px_var(--sky)]"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            <FaVolumeUp size={28} />
          </button>

          {/* Imagen decorativa */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden border-[3px] border-gold shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-black hover:border-red-600">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto descriptivo */}
          <div className="relative w-full md:w-1/2 md:pr-10">
            <div
              className={`text-base sm:text-lg md:text-xl leading-relaxed font-esteban ${textColor} transition-all duration-300 hover:tracking-wide text-justify md:-translate-x-3`}
            >
              {data.text.map((p, i) => (
                <p key={i} className="mb-4 hover:text-red-600">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
