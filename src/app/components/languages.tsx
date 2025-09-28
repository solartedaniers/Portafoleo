"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SiPython, SiSharp } from "react-icons/si";
import { DiJava } from "react-icons/di";
import "swiper/css";
import "swiper/css/navigation";

const languages = [
  { name: "Python", icon: "Python" },
  { name: "Java", icon: "Java" },
  { name: "C#", icon: "C#" },
  { name: "Próximamente", icon: null },
  { name: "Próximamente", icon: null },
];

export default function Lenguajes() {
  const [hovered, setHovered] = useState<string | null>(null);

  const renderIcon = (name: string) => {
    switch (name) {
      case "Python":
        return (
          <SiPython
            size={80}
            className="text-[#3776AB] transition-all duration-500"
          />
        );
      case "Java":
        return <DiJava size={80} className="text-[#1E90FF] transition-all duration-500" />;
      case "C#":
        return <SiSharp size={80} className="text-[#003366] transition-all duration-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden border-[8px] border-gold box-border">
      {/* 🎥 Video de fondo */}
      <video
        src="/videos/stellar wolf.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center scale-[0.9] z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 flex flex-col items-center w-full h-full pt-10">
        {/* 🎨 Título */}
        <h2 className="text-4xl md:text-5xl font-irish text-white px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 hover:bg-gold hover:shadow-[0_0_25px_#c4af37]">
          Lenguajes
        </h2>

        {/* 🌀 Carrusel */}
        <div className="relative w-[90%] md:w-[70%] mt-[20px]">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            className="mySwiper"
          >
            {languages.map((lang, idx) => (
              <SwiperSlide key={idx}>
                <div
                  onMouseEnter={() => setHovered(lang.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center justify-center w-60 h-60 md:w-72 md:h-72 rounded-2xl border-4 p-4 transition-all duration-500 overflow-hidden ${
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
                    <div className="w-full h-full bg-[#f5f5f5] rounded-xl" />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Flechas de navegación personalizadas */}
          <div className="swiper-button-prev !text-white !w-12 !h-12 !-left-16 md:!-left-20 after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md" />
          <div className="swiper-button-next !text-white !w-12 !h-12 !-right-16 md:!-right-20 after:!text-3xl bg-black/40 rounded-full border-2 border-gold shadow-md" />
        </div>

        {/* Frase motivadora */}
        <p
          className="mt-8 italic text-lg px-8 py-3 rounded-full border-2 text-black border-red-600 bg-[#f5f5f5] shadow-md transition-all duration-500 hover:scale-105 hover:text-gold hover:border-gold hover:shadow-[0_0_25px_#c4af37]"
          style={{ transform: "translateY(40px)" }}
        >
          “Cada lenguaje, una técnica que perfecciono cada día.”
        </p>
      </div>
    </section>
  );
}