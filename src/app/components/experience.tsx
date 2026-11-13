"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaVolumeUp, FaBriefcase } from "react-icons/fa";
import { useContent } from "./ContentProvider";
import { useApp } from "./ThemeLangContext";
import { useHasHover } from "@/hooks/useMediaQuery";
import { useSpeech } from "@/hooks/useSpeech";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

type ExperienceKind = "academico" | "laboral";

interface ExperienciaData {
  title: string;
  background: string;
  academic: string;
  academicText: string;
  academicImage: string;
  academicImageAlt: string;
  academicProjects?: string;
  academicList: string[];
  work: string;
  workText: string;
  workList: string[];
}

interface UiContent {
  playNarration: string;
  stopNarration: string;
}

export default function Experiencia() {
  const { content } = useContent();
  const { lang, theme } = useApp();
  const hasHover = useHasHover();
  const { speakingKey, toggle } = useSpeech<ExperienceKind>(lang);
  const [hovered, setHovered] = useState<ExperienceKind | null>(null);

  const experiencia = content.experiencia as ExperienciaData | undefined;
  const ui = content.ui as UiContent;
  if (!experiencia) return null;

  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-ink-soft" : "bg-white";
  const textColor = isDark ? "text-mist" : "text-umber-dark";

  const handleTouchHover = (type: ExperienceKind) => {
    if (hasHover) return;
    setHovered(type);
    setTimeout(() => setHovered(null), TOUCH_FEEDBACK_MS.medium);
  };

  const renderCard = (
    keyId: string,
    icon: React.ReactNode,
    title: string,
    text: string,
    list: string[],
    type: ExperienceKind,
    projectsTitle?: string
  ) => {
    const isHovered = hovered === type;
    const isSpeaking = speakingKey === type;

    return (
      <article
        key={keyId}
        onTouchStart={() => handleTouchHover(type)}
        className={`w-full max-w-3xl ${cardBg} ${textColor} shadow-lg p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 border
          ${isDark ? "border-gold-muted/30" : "border-gray-200"}
          ${isHovered ? "scale-[1.02] shadow-[0_0_25px_color-mix(in_srgb,var(--gold-muted)_18%,transparent)]" : "hover:shadow-[0_0_20px_color-mix(in_srgb,var(--gold-muted)_12%,transparent)] hover:scale-[1.01]"}`}
        role="region"
        aria-labelledby={`${type}-title`}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">{icon}</div>
            <h3
              id={`${type}-title`}
              className="truncate text-lg sm:text-xl md:text-2xl font-irish transition-colors duration-200"
              style={{ WebkitTextStroke: "0.6px var(--gold-muted)" }}
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center flex-shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => toggle(type, text)}
              onMouseEnter={() => hasHover && setHovered(type)}
              onMouseLeave={() => hasHover && setHovered(null)}
              onTouchStart={() => handleTouchHover(type)}
              aria-pressed={isSpeaking}
              aria-label={isSpeaking ? ui.stopNarration : ui.playNarration}
              className={`p-2 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                ${isSpeaking || isHovered ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"}`}
            >
              <FaVolumeUp size={20} />
            </button>
          </div>
        </div>

        <p className={`mt-4 font-esteban text-sm sm:text-base md:text-lg leading-relaxed text-justify`}>
          {text}
        </p>

        {projectsTitle && (
          <p className="mt-4 font-esteban text-sm sm:text-base font-semibold text-gold-muted">
            {projectsTitle}
          </p>
        )}

        <ul className="mt-3 list-disc pl-5 sm:pl-8 space-y-1 text-sm sm:text-base font-esteban">
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
      style={{ backgroundImage: `url('${experiencia.background}')` }}
    >
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4 sm:px-6 py-2 rounded-full shadow-md font-irish transition-all duration-300
          bg-red-600 text-white hover:bg-gold-muted hover:text-black hover:shadow-[0_0_25px_var(--gold-muted)]`}
      >
        {experiencia.title}
      </h2>

      <div className="w-full flex flex-col items-center gap-10 mt-10">
        {renderCard(
          "academico",
          <div className="flex items-center justify-center">
            <Image
              src={experiencia.academicImage}
              alt={experiencia.academicImageAlt}
              width={48}
              height={48}
              className="w-12 sm:w-14 md:w-16 h-auto object-cover rounded-md border-2 border-red-600 transition-transform duration-200 hover:scale-110 hover:border-gold-muted"
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
            <FaBriefcase className="text-3xl sm:text-4xl md:text-5xl text-red-600 transition-transform duration-200 hover:scale-110 hover:text-gold-muted" />
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
