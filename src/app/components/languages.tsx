"use client";
import { useState } from "react";
import { useApp } from "./ThemeLangContext";
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
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const translations = {
  es: {
    title: "Tecnologías",
    quote: '"Cada tecnología, una herramienta que perfecciono cada día."',
  },
  en: {
    title: "Technologies",
    quote: '"Each technology, a tool I refine every day."',
  },
};

const techList = [
  { name: "Angular", icon: <SiAngular size={60} className="text-[#dd0031]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={60} className="text-[#38bdf8]" /> },
  { name: "Next.js", icon: <SiNextdotjs size={60} className="text-black dark:text-white" /> },
  { name: "Django", icon: <SiDjango size={60} className="text-[#092e20]" /> },
  { name: "Python", icon: <SiPython size={60} className="text-[#3776AB]" /> },
  { name: "MySQL", icon: <SiMysql size={60} className="text-[#00758f]" /> },
  { name: "Java", icon: <FaJava size={60} className="text-[#f89820]" /> },
  { name: "C#", icon: <SiSharp size={60} className="text-[#9b4f96]" /> },
  { name: "Unity", icon: <SiUnity size={60} className="text-black dark:text-white" /> },
];

export default function Tecnologias() {
  const { lang } = useApp();
  const t = translations[lang];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border-[6px] sm:border-[8px] border-gold box-border">
      {/* 🎥 Video de fondo */}
      <video
        src="/videos/stellar-wolf.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center scale-[0.9] z-0"
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-10 px-4 sm:px-6 gap-6">
        {/* 🎨 Título */}
        <h2 className="text-2xl sm:text-4xl text-center px-4 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
          {t.title}
        </h2>

        {/* 💬 Frase motivadora solo en móviles */}
        <p className="block sm:hidden text-center italic text-base px-4 py-2 rounded-full border-2 text-black border-red-600 bg-[#f5f5f5] shadow-md">
          {t.quote}
        </p>

        {/* 🌀 Carrusel */}
        <div className="relative w-full flex items-center justify-center px-6 sm:px-10">
          <div className="flex-grow max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              centeredSlides={true}
              spaceBetween={40}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 50 }, // más espacio en móviles
                640: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="mySwiper"
            >
              {techList.map((tech, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onMouseEnter={() => setHovered(tech.name)}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => setHovered(tech.name)}
                    onTouchEnd={() => setHovered(null)}
                    className={`flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl border-4 p-4 transition-all duration-500 overflow-hidden bg-[#f5f5f5] ${
                      hovered === tech.name
                        ? "border-gold shadow-[0_0_25px_#c4af37] rotate-[10deg]"
                        : "border-red-600 shadow-[0_0_15px_#c4af37] rotate-0"
                    }`}
                  >
                    <div
                      className={`transition-transform duration-500 ${
                        hovered === tech.name ? "rotate-[15deg] scale-110" : "rotate-0"
                      }`}
                    >
                      {tech.icon}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Flecha izquierda */}
          <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-2xl sm:after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md transition-all duration-300 hover:scale-110 hover:border-red-600 z-20" />

          {/* Flecha derecha */}
          <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-2xl sm:after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md transition-all duration-300 hover:scale-110 hover:border-red-600 z-20" />
        </div>

        {/* 💬 Frase motivadora solo en escritorio */}
        <p className="hidden sm:block mt-4 italic text-base sm:text-lg px-6 py-3 rounded-full border-2 text-black border-red-600 bg-[#f5f5f5] shadow-md transition-all duration-500 hover:scale-105 hover:text-gold hover:border-gold hover:shadow-[0_0_25px_#c4af37] text-center">
          {t.quote}
        </p>
      </div>
    </section>
  );
}
