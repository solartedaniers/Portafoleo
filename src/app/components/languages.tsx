"use client";
import { useState } from "react";
import { useApp } from "./ThemeLangContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SiPython, SiSharp } from "react-icons/si";
import { DiJava } from "react-icons/di";
import "swiper/css";
import "swiper/css/navigation";

const translations = {
  es: {
    title: "Lenguajes",
    quote: '"Cada lenguaje, una técnica que perfecciono cada día."',
    upcoming: "Próximamente",
  },
  en: {
    title: "Languages",
    quote: '"Each language, a technique I refine every day."',
    upcoming: "Coming soon",
  },
};

const languages = [
  { name: "Python", icon: "Python" },
  { name: "Java", icon: "Java" },
  { name: "C#", icon: "C#" },
  { name: "upcoming", icon: null },
  { name: "upcoming", icon: null },
];

export default function Lenguajes() {
  const { lang } = useApp();
  const t = translations[lang];
  const [hovered, setHovered] = useState<string | null>(null);

  const renderIcon = (name: string) => {
    switch (name) {
      case "Python":
        return <SiPython size={60} className="text-[#3776AB] transition-all duration-500" />;
      case "Java":
        return <DiJava size={60} className="text-[#1E90FF] transition-all duration-500" />;
      case "C#":
        return <SiSharp size={60} className="text-[#003366] transition-all duration-500" />;
      default:
        return null;
    }
  };

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

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-0" />

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

        {/* 🌀 Carrusel con flechas superpuestas */}
        <div className="relative w-full flex items-center justify-center px-2 sm:px-6">
          {/* Carrusel */}
          <div className="flex-grow max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              centeredSlides={true}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {languages.map((lang, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onMouseEnter={() => setHovered(lang.name)}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl border-4 p-4 transition-all duration-500 overflow-hidden ${
                      hovered === lang.name
                        ? "border-gold shadow-[0_0_25px_#c4af37]"
                        : "border-red-600 shadow-[0_0_15px_#c4af37]"
                    } bg-[#f5f5f5]`}
                  >
                    {lang.icon ? (
                      <div className={`${hovered === lang.name ? "scale-110" : ""}`}>
                        {renderIcon(lang.name)}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center text-black font-semibold text-base sm:text-lg">
                        {t.upcoming}
                      </div>
                    )}
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
