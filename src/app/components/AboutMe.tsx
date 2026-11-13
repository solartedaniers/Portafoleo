"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useHasHover } from "@/hooks/useMediaQuery";
import { useSpeech } from "@/hooks/useSpeech";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

interface AboutItem {
  img: string;
  audio: string;
  text: string;
}

interface AboutContent {
  title: string;
  background: string;
  items: AboutItem[];
}

export default function AboutMe() {
  const { lang, theme } = useApp();
  const { content } = useContent();
  const about = content.about as AboutContent | undefined;
  const { speakingKey: speakingIndex, toggle: speakText } = useSpeech<number>(lang);
  const hasHover = useHasHover();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [textLiftIndex, setTextLiftIndex] = useState<number | null>(null);

  const handleTouch = (index: number) => {
    if (!hasHover) {
      setHoveredIndex(index);
      setTextLiftIndex(index);
      setTimeout(() => {
        setHoveredIndex(null);
        setTextLiftIndex(null);
      }, TOUCH_FEEDBACK_MS.long);
    }
  };

  if (!about) return null;

  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-paper text-black";
  const forestFilter = theme === "dark" ? "brightness(0.6)" : "brightness(1)";

  return (
    <section className="w-full overflow-x-hidden transition-all duration-500">
      {/* Fondo */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url('${about.background}')`, filter: forestFilter }}
        />
        <div className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center">
          {/* Título */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-10 sm:mb-12 px-6 py-3 rounded-full shadow-lg cursor-pointer transition-all duration-500
                       bg-red-600/70 text-white hover:bg-gold hover:text-black font-irish"
          >
            {about.title}
          </h2>

          {/* Tarjetas de información */}
          <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-6xl">
            {about.items.map((item, i) => (
              <div
                key={i}
                onTouchStart={() => handleTouch(i)}
                className={`relative flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6 sm:gap-8 p-5 sm:p-6 md:p-8 rounded-xl shadow-lg border transition-all duration-500 ${cardBg} ${
                  hoveredIndex === i
                    ? "scale-[1.02] border-gold"
                    : "hover:scale-[1.02] hover:border-gold"
                }`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0px 4px 20px color-mix(in srgb, var(--sun) 30%, transparent)"
                      : "0px 4px 20px color-mix(in srgb, var(--gold) 30%, transparent)",
                }}
              >
                {/* Botón de voz */}
                <button
                  type="button"
                  aria-label={(content.ui as { speechToggle: string }).speechToggle}
                  aria-pressed={speakingIndex === i}
                  onClick={() => speakText(i, item.text)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute top-3 right-3 cursor-pointer transition-all duration-300 ${
                    speakingIndex === i || hoveredIndex === i
                      ? "text-blue-600 scale-125"
                      : "text-gray-500"
                  }`}
                >
                  <FaVolumeUp className="text-lg sm:text-xl md:text-2xl" />
                </button>

                {/* Imagen */}
                <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-600 hover:border-gold transition-all duration-500">
                    <Image
                      src={item.img}
                      alt=""
                      width={300}
                      height={300}
                      className={`object-cover w-full h-full rounded-full transition-all duration-500 ${
                        hoveredIndex === i ? "scale-110" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Texto descriptivo */}
                <div
                  className={`flex-1 text-center md:text-left transition-transform duration-500 px-2 sm:px-4 md:px-6 ${
                    hasHover
                      ? "hover:-translate-y-2"
                      : textLiftIndex === i
                      ? "-translate-y-2"
                      : "translate-y-0"
                  }`}
                >
                  <p
                    className="font-esteban text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed transition-colors duration-500"
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
