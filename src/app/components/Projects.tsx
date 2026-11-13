"use client";

import React from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useSound } from "@/hooks/useSound";
import { SOUNDS } from "@/config/assets";

type Project = {
  image: string;
  title: string;
  description: string;
  tools: string[];
  gitUrl: string;
};

interface ProjectsContent {
  title: string;
  toolsLabel: string;
  repoLabel: string;
  background: string;
  list: Project[];
}

interface ProjectCardProps {
  project: Project;
  theme: string;
  toolsLabel: string;
  repoLabel: string;
  playUrlSound: () => void;
  playThunderSound: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  theme,
  toolsLabel,
  repoLabel,
  playUrlSound,
  playThunderSound,
}) => (
  <article
    className={`relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] w-full max-w-md mx-auto ${
      theme === "dark" ? "bg-ink-deep text-white" : "bg-paper-light text-black"
    }`}
    style={{
      border: "2px solid var(--gold-muted)",
      boxShadow:
        theme === "dark"
          ? "0 10px 30px color-mix(in srgb, var(--white) 8%, transparent), 0 0 18px color-mix(in srgb, var(--gold-muted) 20%, transparent)"
          : "0 10px 30px color-mix(in srgb, var(--black) 12%, transparent), 0 0 18px color-mix(in srgb, var(--gold-muted) 14%, transparent)",
    }}
  >
    <div className="p-6 flex flex-col items-center gap-5">
      <div className="relative w-full flex justify-center">
        <div className="rounded-xl overflow-hidden border-[2px] border-gold-muted/40 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_var(--gold-muted)]">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={250}
            className="object-cover w-full h-[200px] sm:h-[220px]"
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <a
          href={project.gitUrl}
          target="_blank"
          rel="noreferrer"
          onClick={playUrlSound}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 active:scale-95 ${
            theme === "dark"
              ? "bg-ink border-gold-muted hover:shadow-[0_0_18px_var(--gold-muted)]"
              : "bg-white border-red-600 hover:border-gold-muted hover:shadow-[0_0_18px_var(--gold-muted)]"
          }`}
          aria-label={repoLabel}
        >
          <FiGithub
            size={22}
            className={theme === "dark" ? "text-white" : "text-ink"}
          />
        </a>
      </div>

      <h3
        className="text-center text-2xl font-irish mt-2"
        style={{
          WebkitTextStroke: "0.5px var(--gold-muted)",
          textShadow: "0 0 6px color-mix(in srgb, var(--gold-muted) 40%, transparent)",
        }}
      >
        {project.title}
      </h3>

      <p
        className={`font-esteban text-sm text-center leading-relaxed px-3 transition-colors duration-300 ${
          theme === "dark"
            ? "text-gray-300 hover:text-gray-100"
            : "text-gray-700 hover:text-black"
        }`}
      >
        {project.description}
      </p>

      <div className="w-full mt-4 text-center">
        <span
          className="block text-lg mb-2 font-irish"
          style={{
            WebkitTextStroke: "0.6px var(--gold-muted)",
            color: theme === "dark" ? "var(--white)" : "var(--ink)",
          }}
        >
          {toolsLabel}
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tools.map((tool) => (
            <button
              key={tool}
              onClick={playThunderSound}
              type="button"
              className={`font-esteban px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-ink text-white"
                  : "bg-white text-ink"
              }`}
              style={{
                border: "1px solid var(--gold-muted)",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 10px color-mix(in srgb, var(--white) 8%, transparent)"
                    : "0 4px 10px color-mix(in srgb, var(--black) 10%, transparent)",
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
  const { theme } = useApp();
  const { content } = useContent();
  const playUrlSound = useSound(SOUNDS.url);
  const playThunderSound = useSound(SOUNDS.thunder);

  const projects = content.projects as ProjectsContent | undefined;
  if (!projects) return null;

  const renderCard = (project: Project) => (
    <ProjectCard
      project={project}
      theme={theme}
      toolsLabel={projects.toolsLabel}
      repoLabel={projects.repoLabel}
      playUrlSound={playUrlSound}
      playThunderSound={playThunderSound}
    />
  );

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start py-16 px-4 sm:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url('${projects.background}')` }}
    >
      <span className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-full max-w-6xl">
        <header className="flex justify-center mb-10">
          <h2 className="text-3xl sm:text-4xl text-center px-6 py-3 rounded-full shadow-md bg-red-600/60 text-white font-irish hover:bg-gold-muted hover:text-black hover:shadow-[0_0_25px_var(--gold-muted)] transition-all duration-300">
            {projects.title}
          </h2>
        </header>

        {/* En celular uso carrusel con autoplay */}
        <div className="sm:hidden w-full [&_.swiper-button-next]:text-gold [&_.swiper-button-prev]:text-gold">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            loop
            className="pb-8"
          >
            {projects.list.map((project) => (
              <SwiperSlide key={project.title}>{renderCard(project)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.list.map((project) => (
            <React.Fragment key={project.title}>{renderCard(project)}</React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
