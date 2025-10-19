"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// ✅ Tipado del proyecto (título/descripcion son strings en cada JSON de idioma)
type Project = {
  image: string;
  title: string;
  description: string;
  tools: string[];
  gitUrl: string;
};

export default function Projects() {
  const { lang } = useApp();
  const { content } = useContent();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Obtener proyectos desde el JSON cargado por ContentProvider
  const projects = (content as { projects?: Project[] } | null)?.projects ?? [];

  // 🔊 Reproducir sonido al abrir enlace (Git)
  const playUrlSound = () => {
    if (audioRef.current) {
      audioRef.current.src = "/sounds/url.mp3";
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // ⚡ Reproducir sonido al hacer hover/click/tap en "tool"
  const playThunderSound = () => {
    if (thunderRef.current) {
      thunderRef.current.src = "/sounds/thunder.mp3";
      thunderRef.current.currentTime = 0;
      thunderRef.current.play().catch(() => {});
    }
  };

  // 🧱 Renderizar tarjeta
  const renderCard = (p: Project, id: number) => (
    <article
      key={id}
      className="relative bg-[#f5f5f5] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] mx-2"
      style={{
        border: "2px solid red",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12), 0 0 18px rgba(196,175,55,0.14)",
      }}
    >
      <div className="p-6 flex flex-col items-center gap-4">
        {/* 🖼 Imagen del proyecto */}
        <div className="relative w-full flex justify-center">
          <div
            className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(196,175,55,0.45)]"
            style={{
              width: "220px",
              height: "140px",
              border: "3px solid rgba(220,20,60,0.15)",
            }}
            onTouchStart={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 10px 30px rgba(196,175,55,0.45)";
            }}
            onTouchEnd={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={220}
              height={140}
              className="object-cover w-[220px] h-[140px] transition-all duration-300"
            />
          </div>
        </div>

        {/* 🔗 Botón GitHub */}
        <div className="w-full flex justify-center px-2">
          <a
            href={p.gitUrl}
            target="_blank"
            rel="noreferrer"
            onClick={playUrlSound}
            onTouchStart={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "#c4af37";
            }}
            onTouchEnd={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.borderColor = "red";
            }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border-2 border-red-600 transition-all duration-300 hover:border-[#c4af37] hover:shadow-[0_6px_20px_rgba(196,175,55,0.45)] active:scale-95"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <FiGithub className="text-[#222]" size={20} />
          </a>
        </div>

        {/* 🧾 Título */}
        <h3
          className="mt-1 text-center text-xl font-medium animate-pulse"
          style={{
            fontFamily: "'Esteban', serif",
            color: "#a0a0a0",
            WebkitTextStroke: "0.6px rgba(0,0,0,0.45)",
            textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            letterSpacing: "0.2px",
          }}
        >
          {p.title}
        </h3>

        {/* 📖 Descripción */}
        <p
          className="text-sm text-gray-700 text-center px-2 transition-colors duration-300 hover:text-gray-900"
          style={{ fontFamily: "'Esteban', serif" }}
        >
          {p.description}
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
            {lang === "es" ? "Lenguajes y herramientas" : "Languages and Tools"}
          </span>
        </div>

        {/* ⚡ Botones de herramientas */}
        <div className="mt-3 flex flex-wrap gap-3 justify-start w-full">
          {p.tools.map((tool) => (
            <button
              key={tool}
              onClick={playThunderSound}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid red";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.textShadow =
                  "0 0 6px rgba(196,175,55,0.6)";
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid #c4af37";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.textShadow = "none";
              }}
              className="px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Esteban', serif",
                color: "#111",
                background: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                border: "1px solid #c4af37",
              }}
            >
              <span style={{ WebkitTextStroke: "0.6px #c4af37" }}>{tool}</span>
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
          <h2 className="text-4xl text-center px-6 py-3 rounded-full shadow-md transition-all duration-300 bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
            {lang === "es" ? "Mis proyectos" : "My Projects"}
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

      {/* 🔊 Audios */}
      <audio ref={audioRef} preload="auto" />
      <audio ref={thunderRef} preload="auto" />
    </section>
  );
}
