"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiPython, SiSharp, SiMysql, SiDjango,
  SiAngular, SiTailwindcss, SiNextdotjs,
  SiUnity, SiSpringboot,
} from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Technology {
  name: string;
  icon: string;
  color?: string;
  darkColor?: string;
}

interface TechnologiesContent {
  title: string;
  quote: string;
  video: string;
  previous: string;
  next: string;
  goTo: string;
  list: Technology[];
}

const ICONS: Record<string, IconType> = {
  SiAngular,
  SiTailwindcss,
  SiNextdotjs,
  SiDjango,
  SiPython,
  SiMysql,
  FaJava,
  SiSharp,
  SiUnity,
  SiSpringboot,
  FaGithub,
};

const AUTOPLAY_DELAY_MS = 2800;
const TRANSITION_MS = 650;

const COVERFLOW = {
  rotate: 32,
  stretch: 0,
  depth: 180,
  modifier: 1,
  scale: 0.86,
  slideShadows: false,
};

interface TechnologyCardProps {
  tech: Technology;
  isActive: boolean;
  isDark: boolean;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ tech, isActive, isDark }) => {
  const Icon = ICONS[tech.icon];
  const iconColor = (isDark ? tech.darkColor : undefined) ?? tech.color;

  return (
    <div
      className={`group relative flex flex-col items-center justify-center gap-4 w-full aspect-square rounded-2xl border-4 p-4 transition-all duration-500
        ${isDark ? "bg-black/85 text-white" : "bg-paper/90 text-black"}
        ${isActive
          ? "border-gold shadow-[0_0_35px_color-mix(in_srgb,var(--gold)_55%,transparent)]"
          : "border-red-600 shadow-lg"}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--tech-color)_28%,transparent),transparent_65%)] transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ "--tech-color": iconColor } as React.CSSProperties}
      />
      <span
        className={`relative transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
        style={{ color: iconColor }}
      >
        {Icon ? <Icon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" /> : null}
      </span>
      <span
        className={`relative font-irish text-sm sm:text-base px-3 py-1 rounded-full border transition-all duration-500
          ${isDark ? "bg-black/70 text-white" : "bg-white/90 text-black"}
          ${isActive ? "border-gold opacity-100 translate-y-0" : "border-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}
      >
        {tech.name}
      </span>
    </div>
  );
};

export default function Languages() {
  const { theme } = useApp();
  const { content } = useContent();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const techData = content.technologies as TechnologiesContent | undefined;
  if (!techData) return null;

  const isDark = theme === "dark";
  const titleStyle = isDark
    ? "bg-red-700 text-white hover:bg-yellow-500 hover:text-black"
    : "bg-red-600 text-white hover:bg-yellow-500 hover:text-black";
  const quoteStyle = isDark
    ? "text-white bg-black border-red-600 hover:text-yellow-500 hover:border-yellow-500"
    : "text-black bg-paper border-red-600 hover:text-yellow-500 hover:border-yellow-500";
  const arrowStyle =
    "flex items-center justify-center shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-yellow-500 bg-black/50 text-white shadow-md transition duration-300 hover:scale-110 hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-4 sm:border-8 border-yellow-500">
      <video
        src={techData.video}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center w-full py-8 sm:py-12 gap-6 sm:gap-10">
        <h2
          className={`text-2xl sm:text-4xl text-center px-4 py-2 mx-4 rounded-full shadow-lg transition-all duration-500 font-irish cursor-pointer ${titleStyle}`}
        >
          {techData.title}
        </h2>

        <div className="relative w-full max-w-6xl flex items-center gap-1 sm:gap-4 px-1 sm:px-4">
          <button
            type="button"
            aria-label={techData.previous}
            className={arrowStyle}
            onClick={() => swiper?.slidePrev()}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="relative flex-1 min-w-0 sm:[mask-image:linear-gradient(to_right,transparent,var(--black)_12%,var(--black)_88%,transparent)]">
            <Swiper
              modules={[EffectCoverflow, Pagination, Autoplay, Keyboard, A11y]}
              effect="coverflow"
              coverflowEffect={COVERFLOW}
              slidesPerView="auto"
              centeredSlides
              loop
              grabCursor
              speed={TRANSITION_MS}
              keyboard={{ enabled: true, onlyInViewport: true }}
              autoplay={{ delay: AUTOPLAY_DELAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              a11y={{ prevSlideMessage: techData.previous, nextSlideMessage: techData.next, paginationBulletMessage: `${techData.goTo} {{index}}` }}
              onSwiper={setSwiper}
              onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
              className="!py-6 sm:!py-10 !pb-14 [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-60 [&_.swiper-pagination-bullet-active]:!bg-gold [&_.swiper-pagination-bullet-active]:opacity-100"
            >
              {techData.list.map((tech, idx) => (
                <SwiperSlide
                  key={tech.name}
                  className="!w-[150px] sm:!w-[190px] md:!w-[210px] lg:!w-[240px]"
                  onClick={() => swiper?.slideToLoop(idx)}
                >
                  <TechnologyCard tech={tech} isActive={idx === activeIndex} isDark={isDark} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            aria-label={techData.next}
            className={arrowStyle}
            onClick={() => swiper?.slideNext()}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <p
          className={`mx-4 italic text-base sm:text-lg px-6 py-3 rounded-full border-2 shadow-md transition-all duration-500 hover:scale-105 text-center ${quoteStyle}`}
        >
          {techData.quote}
        </p>
      </div>
    </section>
  );
}
