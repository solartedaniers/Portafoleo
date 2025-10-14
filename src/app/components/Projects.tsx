"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useContent } from "./ContentProvider";
import { useApp } from "./ThemeLangContext";

interface Project {
  image: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  tools: string[];
  gitUrl: string;
}

interface ProjectsContent {
  title: { es: string; en: string };
  list: Project[];
}

export default function Projects() {
  const { content } = useContent();
  const { lang } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);

  if (!content?.projects) return null;
  const projectsData = content.projects as ProjectsContent;
  const projects = projectsData.list;

  // 🔊 Reproducir sonido al abrir enlace
  const playUrlSound = () => {
    if (audioRef.current) {
      audioRef.current.src = "/sounds/url.mp3";
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // ⚡ Reproducir sonido al hacer hover/click/tap
  const playThunderSound = () => {
    if (thunderRef.current) {
      thunderRef.current.src = "/sounds/thunder.mp3";
      thunderRef.current.currentTime = 0;
      thunderRef.current.play().catch(() => {});
    }
  };

  // 🎴 Renderizado de tarjeta de proyecto
  const renderCard = (p: Project, id: number) => (
    <article
      key={id}
      className="relative bg-[#f5f5f5] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] mx-2 border-2 border-red-600"
      style={{
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.12), 0 0 18px rgba(196,175,55,0.14)",
      }}
    >
      <div className="p-6 flex flex-col items-center gap-4">
        {/* 🖼 Imagen */}
        <div className="relative w-full flex justify-center">
          <div
            className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(196,175,55,0.45)]"
            style={{
              width: "220px",
              height: "140px",
              border: "3px solid rgba(220,20,60,0.15)",
            }}
          >
            <Image
              src={p.image}
              alt={p.title[lang]}
              width={220}
              height={140}
              className="object-cover w-[220px] h-[140px]"
            />
          </div>
        </div>

        {/* 🔗 GitHub */}
        <div className="w-full flex justify-center px-2">
          <a
            href={p.gitUrl}
            target="_blank"
            rel="noreferrer"
            onClick={playUrlSound}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border-2 border-red-600 transition-all duration-300 hover:border-[#c4af37] hover:shadow-[0_6px_20px_rgba(196,175,55,0.45)] active:scale-95"
          >
            <FiGithub className="text-[#222]" size={20} />
          </a>
        </div>

        {/* 🧾 Título */}
        <h3
          className="mt-1 text-center text-xl font-medium"
          style={{
            fontFamily: "'Esteban', serif",
            color: "#a0a0a0",
            WebkitTextStroke: "0.6px rgba(0,0,0,0.45)",
            textShadow: "0 2px 6px rgba(0,0,0,0.35)",
          }}
        >
          {p.title[lang]}
        </h3>

        {/* 📖 Descripción */}
        <p
          className="text-sm text-gray-700 text-center px-2"
          style={{ fontFamily: "'Esteban', serif" }}
        >
          {p.description[lang]}
        </p>

        {/* 🔧 Lenguajes */}
        <div className="w-full text-left mt-4">
          <span
            style={{
              fontFamily: "'Irish Grover', cursive",
              fontSize: "1.4rem",
              color: "#111",
              WebkitTextStroke: "0.6px #c4af37",
            }}
          >
            {lang === "es"
              ? "Lenguajes y herramientas"
              : "Languages and Tools"}
          </span>
        </div>

        {/* ⚡ Herramientas */}
        <div className="mt-3 flex flex-wrap gap-3 justify-start w-full">
          {p.tools.map((tool, idx) => (
            <button
              key={idx}
              onClick={playThunderSound}
              className="px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Esteban', serif",
                color: "#111",
                background: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                border: "1px solid #c4af37",
              }}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-start justify-center py-12"
      style={{
        backgroundImage: "url('/images/samuray-car.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10 w-[95%] max-w-6xl">
        {/* 🟥 Título principal */}
        <header className="w-full flex justify-center mb-8">
          <h2 className="text-4xl text-center px-6 py-3 rounded-full shadow-md bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
            {projectsData.title[lang]}
          </h2>
        </header>

        {/* 📱 Carrusel en móviles */}
        <div className="sm:hidden w-full">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            loop
            className="mySwiper"
          >
            {projects.map((p, i) => (
              <SwiperSlide key={i}>{renderCard(p, i)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 Rejilla en escritorio */}
        <main className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => renderCard(p, i))}
        </main>
      </div>

      <audio ref={audioRef} preload="auto" />
      <audio ref={thunderRef} preload="auto" />
    </section>
  );
}
