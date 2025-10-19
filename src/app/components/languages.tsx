"use client";

import React, { useState, useEffect } from "react";
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

interface Technology {
  name: string;
  icon: string;
  color: string;
}

interface TechnologiesContent {
  title: string;
  quote: string;
  list: Technology[];
}

export default function Languages() {
  const { content } = useContent();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!content?.technologies) return null;
  const techData = content.technologies as TechnologiesContent;

  const iconMap: Record<string, React.ReactNode> = {
    SiAngular: <SiAngular size={60} className="text-[#dd0031]" />,
    SiTailwindcss: <SiTailwindcss size={60} className="text-[#38bdf8]" />,
    SiNextdotjs: <SiNextdotjs size={60} className="text-[#000000]" />, // negro fijo
    SiDjango: <SiDjango size={60} className="text-[#092e20]" />,
    SiPython: <SiPython size={60} className="text-[#3776AB]" />,
    SiMysql: <SiMysql size={60} className="text-[#00758f]" />,
    FaJava: <FaJava size={60} className="text-[#f89820]" />,
    SiSharp: <SiSharp size={60} className="text-[#9b4f96]" />,
    SiUnity: <SiUnity size={60} className="text-[#000000]" />, 
    SiSpringboot: <SiSpringboot size={60} className="text-[#6DB33F]" />,
    FaGithub: <FaGithub size={60} className="text-[#181717]" />,
  };

  const handleHover = (name: string) => {
    if (isMobile) {
      setHovered(name);
      setTimeout(() => setHovered(null), 1200);
    } else {
      setHovered(name);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border-[6px] sm:border-[8px] border-gold box-border">
      {/* 🎥 Fondo */}
      <video
        src="/videos/stellar-wolf.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center scale-[0.9] z-0"
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-10 px-4 sm:px-6 gap-6">
        {/* 🏷️ Título */}
        <h2
          className="text-2xl sm:text-4xl text-center px-4 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]"
          onTouchStart={() => handleHover("title")}
        >
          {techData.title}
        </h2>

        {/* 🌀 Carrusel */}
        <div className="relative w-full flex items-center justify-center px-6 sm:px-10">
          <div className="flex-grow max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop
              centeredSlides
              spaceBetween={40}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 50 },
                640: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {techData.list.map((tech, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onMouseEnter={() => handleHover(tech.name)}
                    onMouseLeave={() => !isMobile && setHovered(null)}
                    onTouchStart={() => handleHover(tech.name)}
                    className={`flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl border-4 p-4 transition-all duration-500 overflow-hidden bg-[#f5f5f5] ${
                      hovered === tech.name
                        ? "border-gold shadow-[0_0_25px_#c4af37] rotate-[10deg] scale-110"
                        : "border-red-600 shadow-[0_0_15px_#c4af37] rotate-0 scale-100"
                    }`}
                  >
                    <div
                      className={`transition-transform duration-500 ${
                        hovered === tech.name
                          ? "rotate-[15deg] scale-110"
                          : "rotate-0 scale-100"
                      }`}
                    >
                      {iconMap[tech.icon] ?? (
                        <div className="text-gray-400">?</div>
                      )}
                    </div>

                    {/* ✨ Nombre al hover */}
                    <AnimatePresence>
                      {hovered === tech.name && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-base font-semibold text-black bg-[#f5f5f5]/90 rounded-full px-3 py-1 border border-gold shadow-sm"
                        >
                          {tech.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Flechas */}
          <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-2xl sm:after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md transition-all duration-300 hover:scale-110 hover:border-red-600 z-20" />
          <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-2xl sm:after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md transition-all duration-300 hover:scale-110 hover:border-red-600 z-20" />
        </div>

        {/* 💬 Frase motivadora */}
        <p className="hidden md:block mt-4 italic text-base sm:text-lg px-6 py-3 rounded-full border-2 text-black border-red-600 bg-[#f5f5f5] shadow-md transition-all duration-500 hover:scale-105 hover:text-gold hover:border-gold hover:shadow-[0_0_25px_#c4af37] text-center">
          {techData.quote}
        </p>
      </div>
    </section>
  );
}
