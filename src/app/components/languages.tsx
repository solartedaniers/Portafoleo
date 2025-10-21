"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  SiPython,
  SiSharp,
  SiMysql,
  SiDjango,
  SiAngular,
  SiTailwindcss,
  SiNextdotjs,
  SiUnity,
  SiSpringboot,
} from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

// 🌟 Interfaces
interface Technology {
  name: string;
  icon: string;
  color?: string;
}

interface TechnologiesContent {
  title: string;
  quote: string;
  video: string; // 🟢 nuevo campo para el video desde el JSON
  list: Technology[];
}

// 🌟 Hook personalizado para detectar dispositivo móvil
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < breakpoint);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);

  return isMobile;
}

// 🌟 Mapeo de íconos
const iconMap: Record<string, React.ReactNode> = {
  SiAngular: <SiAngular size={60} className="text-red-600" />,
  SiTailwindcss: <SiTailwindcss size={60} className="text-cyan-400" />,
  SiNextdotjs: <SiNextdotjs size={60} className="text-black dark:text-white" />,
  SiDjango: <SiDjango size={60} className="text-green-900 dark:text-green-500" />,
  SiPython: <SiPython size={60} className="text-blue-600" />,
  SiMysql: <SiMysql size={60} className="text-blue-800" />,
  FaJava: <FaJava size={60} className="text-orange-500" />,
  SiSharp: <SiSharp size={60} className="text-purple-600" />,
  SiUnity: <SiUnity size={60} className="text-black dark:text-white" />,
  SiSpringboot: <SiSpringboot size={60} className="text-green-500" />,
  FaGithub: <FaGithub size={60} className="text-gray-800 dark:text-gray-300" />,
};

// 🌟 Tarjeta individual
interface TechnologyCardProps {
  tech: Technology;
  hovered: string | null;
  setHovered: (name: string | null) => void;
  isMobile: boolean;
  cardBase: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  tech,
  hovered,
  setHovered,
  isMobile,
  cardBase,
}) => (
  <div
    onMouseEnter={() => setHovered(tech.name)}
    onMouseLeave={() => !isMobile && setHovered(null)}
    onTouchStart={() => setHovered(tech.name)}
    className={`flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-xl border-4 p-4 transition duration-500 ${cardBase} ${
      hovered === tech.name ? "border-yellow-500 shadow-lg scale-105 rotate-3" : "shadow-md"
    }`}
  >
    <div className={`transition duration-300 ${hovered === tech.name ? "scale-110 rotate-6" : ""}`}>
      {iconMap[tech.icon] ?? <div className="text-gray-400">?</div>}
    </div>

    <AnimatePresence>
      {hovered === tech.name && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -2 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="mt-3 text-sm font-bold bg-white/90 text-black rounded-full px-3 py-1 border border-yellow-500 shadow animate-blink"
          style={{
            WebkitTextStroke: "0.5px #facc15",
            textShadow: "0 0 4px #facc15",
          }}
        >
          {tech.name}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// 🌟 Componente principal
export default function Languages() {
  const { theme } = useApp();
  const { content } = useContent();
  const [hovered, setHovered] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const techData = content?.technologies as TechnologiesContent | undefined;
  if (!techData) return null;

  // 🎨 Estilos
  const sectionBorder = "border-yellow-500";
  const titleStyle =
    theme === "dark"
      ? "bg-red-700 text-white hover:bg-yellow-500 hover:text-black"
      : "bg-red-600 text-white hover:bg-yellow-500 hover:text-black";
  const cardBase =
    theme === "dark"
      ? "bg-black text-white border-red-600"
      : "bg-gray-100 text-black border-red-600";
  const quoteStyle =
    theme === "dark"
      ? "text-white bg-black border-red-600 hover:text-yellow-500 hover:border-yellow-500"
      : "text-black bg-gray-100 border-red-600 hover:text-yellow-500 hover:border-yellow-500";

  const handleHover = (name: string) => {
    setHovered(name);
    if (isMobile) setTimeout(() => setHovered(null), 1200);
  };

  return (
    <section
      className={`relative w-full min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-4 sm:border-8 ${sectionBorder}`}
    >
      {/* 🎥 Fondo de video dinámico */}
      <video
        src={techData.video} // 🔥 ahora se carga desde el JSON
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ transform: isMobile ? "scale(1)" : "scale(0.9)" }}
      />

      {/* 🌟 Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-6 sm:pt-10 px-4 sm:px-6 gap-6 transition-all duration-500">
        <h2
          className={`text-2xl sm:text-4xl text-center px-4 py-2 rounded-full shadow-lg transition-all duration-500 font-['Irish_Grover'] cursor-pointer ${titleStyle}`}
          onTouchStart={() => handleHover("title")}
        >
          {techData.title}
        </h2>

        {/* 🌀 Carrusel */}
        <div className="relative w-full flex items-center justify-center px-4 sm:px-10">
          <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%]">
            <Swiper
              modules={[Navigation]}
              navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
              loop
              centeredSlides
              spaceBetween={40}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 50 },
                640: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {techData.list.map((tech: Technology, idx: number) => (
                <SwiperSlide key={idx}>
                  <TechnologyCard
                    tech={tech}
                    hovered={hovered}
                    setHovered={setHovered}
                    isMobile={isMobile}
                    cardBase={cardBase}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Flechas */}
          <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 text-white w-10 h-10 sm:w-12 sm:h-12 after:text-2xl sm:after:text-3xl bg-black/40 rounded-full border-2 border-yellow-500 shadow-md transition duration-300 hover:scale-110 hover:border-red-600 z-20" />
          <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 text-white w-10 h-10 sm:w-12 sm:h-12 after:text-2xl sm:after:text-3xl bg-black/40 rounded-full border-2 border-yellow-500 shadow-md transition duration-300 hover:scale-110 hover:border-red-600 z-20" />
        </div>

        {/* 💬 Frase motivadora */}
        <p
          className={`hidden md:block mt-4 italic text-base sm:text-lg px-6 py-3 rounded-full border-2 shadow-md transition-all duration-500 hover:scale-105 text-center ${quoteStyle}`}
        >
          {techData.quote}
        </p>
      </div>
    </section>
  );
}
