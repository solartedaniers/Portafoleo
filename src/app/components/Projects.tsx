"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { useApp } from "./ThemeLangContext";

const PROJECT_COUNT = 6;
const GIT_URL = "https://github.com/solartedaniers/software-Patrones.git";

const translations = {
  es: {
    title: "Mis proyectos",
    description:
      "El Sistema de Monitoreo de Fermentación en el Café es una aplicación diseñada para seguir en tiempo real los parámetros críticos del proceso de fermentación del café, como la temperatura, el pH y la humedad. Utiliza tecnologías web modernas para visualizar estos datos de forma gráfica, facilitando el control y la toma de decisiones durante el proceso.",
    tools: "Lenguajes y herramientas",
  },
  en: {
    title: "My Projects",
    description:
      "The Coffee Fermentation Monitoring System is an application designed to track critical parameters of the coffee fermentation process in real time, such as temperature, pH, and humidity. It uses modern web technologies to visualize this data graphically, making it easier to control and make decisions during the process.",
    tools: "Languages and Tools",
  },
};

export default function Projects() {
  const { lang } = useApp();
  const t = translations[lang];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);

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

  const project = {
    image: "/image/fermentation.png",
    title: "Fermentation Monitoring",
    description: t.description,
    tools: ["TypeScript", "HTML", "CSS", "Angular", "Node.js"],
  };

  const cards = Array.from({ length: PROJECT_COUNT }).map((_, i) => ({
    id: i,
    ...project,
  }));

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-start justify-center py-12"
      style={{
        backgroundImage: `url(${encodeURI("/images/samuray car.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 w-[95%] max-w-6xl">
        <header className="w-full flex justify-center mb-8">
          <h2
            className="text-4xl text-center px-6 py-3 rounded-full shadow-md transition-all duration-300
                       bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]"
          >
            {t.title}
          </h2>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <article
              key={c.id}
              className="relative bg-[#f5f5f5] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              style={{
                border: "2px solid red",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.12), 0 0 18px rgba(196,175,55,0.14)",
              }}
            >
              <div className="p-6 flex flex-col items-center gap-4">
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
                      src={c.image}
                      alt={c.title}
                      width={220}
                      height={140}
                      className="object-cover w-[220px] h-[140px] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center px-2">
                  <a
                    href={GIT_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playUrlSound}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border-2 border-red-600 transition-all duration-300 hover:border-[#c4af37] hover:shadow-[0_6px_20px_rgba(196,175,55,0.45)] active:scale-95"
                    aria-label="GitHub Repository"
                    title="GitHub Repository"
                  >
                    <FiGithub className="text-[#222]" size={20} />
                  </a>
                </div>

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
                  {c.title}
                </h3>

                <p
                  className="text-sm text-gray-700 text-center px-2 transition-colors duration-300 hover:text-gray-900"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {c.description}
                </p>

                <div className="w-full text-left mt-4">
                  <span
                    style={{
                      fontFamily: "'Irish Grover', cursive",
                      fontSize: "1.4rem",
                      color: "#111",
                      WebkitTextStroke: "0.6px #c4af37",
                    }}
                  >
                    {t.tools}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 justify-start w-full">
                  {c.tools.map((t) => (
                    <button
                      key={t}
                      onClick={playThunderSound}
                      className="px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        fontFamily: "'Esteban', serif",
                        color: "#111",
                        background: "#fff",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                        border: "1px solid #c4af37",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.border = "1px solid red";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.textShadow =
                          "0 0 6px rgba(196,175,55,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.border = "1px solid #c4af37";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.textShadow = "none";
                      }}
                    >
                      <span style={{ WebkitTextStroke: "0.6px #c4af37" }}>{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>

      <audio ref={audioRef} preload="auto" />
      <audio ref={thunderRef} preload="auto" />
    </section>
  );
}