"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

type Project = {
  image: string;
  title: string;
  description: string;
  tools: string[];
  gitUrl: string;
};

interface ProjectCardProps {
  project: Project;
  theme: string;
  lang: string;
  playUrlSound: () => void;
  playThunderSound: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  theme,
  lang,
  playUrlSound,
  playThunderSound,
}) => (
  <article
    className={`relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] w-full max-w-md mx-auto ${
      theme === "dark" ? "bg-[#0e0e0e] text-white" : "bg-[#fafafa] text-black"
    }`}
    style={{
      border: "2px solid #c4af37",
      boxShadow:
        theme === "dark"
          ? "0 10px 30px rgba(255,255,255,0.08), 0 0 18px rgba(196,175,55,0.2)"
          : "0 10px 30px rgba(0,0,0,0.12), 0 0 18px rgba(196,175,55,0.14)",
    }}
  >
    <div className="p-6 flex flex-col items-center gap-5">
      {/* 🖼 Imagen */}
      <div className="relative w-full flex justify-center">
        <div className="rounded-xl overflow-hidden border-[2px] border-[#c4af37]/40 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_#c4af37]">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={250}
            className="object-cover w-full h-[200px] sm:h-[220px]"
          />
        </div>
      </div>

      {/* 🧭 GitHub */}
      <div className="w-full flex justify-center">
        <a
          href={project.gitUrl}
          target="_blank"
          rel="noreferrer"
          onClick={playUrlSound}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 active:scale-95 ${
            theme === "dark"
              ? "bg-[#111] border-[#c4af37] hover:shadow-[0_0_18px_#c4af37]"
              : "bg-white border-red-600 hover:border-[#c4af37] hover:shadow-[0_0_18px_#c4af37]"
          }`}
          aria-label="GitHub Repository"
        >
          <FiGithub
            size={22}
            className={theme === "dark" ? "text-white" : "text-[#111]"}
          />
        </a>
      </div>

      {/* 🧾 Título */}
      <h3
        className="text-center text-2xl font-['Irish_Grover'] mt-2"
        style={{
          WebkitTextStroke: "0.5px #c4af37",
          textShadow: "0 0 6px rgba(196,175,55,0.4)",
        }}
      >
        {project.title}
      </h3>

      {/* 💬 Descripción */}
      <p
        className={`text-sm text-center leading-relaxed px-3 transition-colors duration-300 ${
          theme === "dark"
            ? "text-gray-300 hover:text-gray-100"
            : "text-gray-700 hover:text-black"
        }`}
        style={{ fontFamily: "'Esteban', serif" }}
      >
        {project.description}
      </p>

      {/* ⚒ Herramientas */}
      <div className="w-full mt-4 text-center">
        <span
          className="block text-lg mb-2"
          style={{
            fontFamily: "'Irish Grover', cursive",
            WebkitTextStroke: "0.6px #c4af37",
            color: theme === "dark" ? "#fff" : "#111",
          }}
        >
          {lang === "es" ? "Lenguajes y herramientas" : "Languages & Tools"}
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tools.map((tool) => (
            <button
              key={tool}
              onClick={playThunderSound}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-[#111] text-white"
                  : "bg-white text-[#111]"
              }`}
              style={{
                border: "1px solid #c4af37",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 10px rgba(255,255,255,0.08)"
                    : "0 4px 10px rgba(0,0,0,0.1)",
                fontFamily: "'Esteban', serif",
              }}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  </article>
);

export default function Projects() {
  const { theme, lang } = useApp();
  const { content } = useContent();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);

  const projects = (content as { projects?: Project[] } | null)?.projects ?? [];

  const playUrlSound = () => {
    if (audioRef.current) {
      audioRef.current.src = "/sounds/url.mp3";
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const playThunderSound = () => {
    if (thunderRef.current) {
      thunderRef.current.src = "/sounds/thunder.mp3";
      thunderRef.current.currentTime = 0;
      thunderRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start py-16 px-4 sm:px-8"
      style={{
        backgroundImage: "url('/images/samuray-car.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* 🔴 Título */}
        <header className="flex justify-center mb-10">
          <h2 className="text-4xl text-center px-6 py-3 rounded-full shadow-md bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37] transition-all duration-300">
            {lang === "es" ? "Mis proyectos" : "My Projects"}
          </h2>
        </header>

        {/* 📱 Swiper en móvil con autoplay + flechas */}
        <div className="sm:hidden w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4500 }}
            spaceBetween={20}
            slidesPerView={1}
            loop
            className="pb-8"
          >
            {projects.map((p, i) => (
              <SwiperSlide key={i}>
                <ProjectCard
                  project={p}
                  theme={theme}
                  lang={lang}
                  playUrlSound={playUrlSound}
                  playThunderSound={playThunderSound}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 Grid de 2 columnas en escritorio */}
        <main className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              theme={theme}
              lang={lang}
              playUrlSound={playUrlSound}
              playThunderSound={playThunderSound}
            />
          ))}
        </main>
      </div>

      {/* 🎵 Audios */}
      <audio ref={audioRef} preload="auto" />
      <audio ref={thunderRef} preload="auto" />
    </section>
  );
}
