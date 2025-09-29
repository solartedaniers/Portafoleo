"use client";
import { useState } from "react";
import Image from "next/image";
import { FaVolumeUp, FaBriefcase } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";

export default function Experiencia() {
  const { lang } = useApp();

  const [audioAcademico] = useState(
    typeof Audio !== "undefined" ? new Audio("/sounds/academico.mp3") : null
  );
  const [audioLaboral] = useState(
    typeof Audio !== "undefined" ? new Audio("/sounds/laboral.mp3") : null
  );

  const playAudio = (audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const translations = {
    es: {
      title: "Experiencia Académica y Laboral",
      academic: "Experiencia Académica",
      academicText:
        "Soy estudiante de Ingeniería de Software Universidad Cooperativa de Colombia, Campus Pasto (actualmente cursando 5° semestre). Participación en el Primer Seminario Nacional de Ingeniería de Software.",
      academicProjects: "Desarrollo de proyectos académicos:",
      academicList: [
        "Simulador de crecimiento de plantas.",
        "Sistema de monitoreo de café.",
        "Aplicación para el cálculo de vacaciones de trabajadores según departamento y antigüedad.",
        "Diseño y desarrollo de interfaces enfocadas en usabilidad y experiencia de usuario.",
      ],
      work: "Experiencia Laboral",
      workList: [
        "Cocinero de comidas rápidas – Restaurante DMaíz.",
        "Repartidor de frutas en carro – Frutas Gómez.",
        "Vendedor en tienda – Panadería Lima Pan.",
        "Apoyo en instalación de postes y cuerdas de luz.",
      ],
    },
    en: {
      title: "Academic and Work Experience",
      academic: "Academic Experience",
      academicText:
        "I am a Software Engineering student at Universidad Cooperativa de Colombia, Campus Pasto (currently in 5th semester). Participated in the First National Seminar on Software Engineering.",
      academicProjects: "Development of academic projects:",
      academicList: [
        "Plant growth simulator.",
        "Coffee monitoring system.",
        "Application for calculating employee vacation based on department and seniority.",
        "Design and development of interfaces focused on usability and user experience.",
      ],
      work: "Work Experience",
      workList: [
        "Fast food cook – Restaurante DMaíz.",
        "Fruit delivery driver – Frutas Gómez.",
        "Store clerk – Panadería Lima Pan.",
        "Support in installation of light poles and wiring.",
      ],
    },
  };

  const t = translations[lang];

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/city.jpg')" }}
    >
      {/* Título principal */}
      <h2
        className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500
           bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]"
      >
        {t.title}
      </h2>

      {/* Experiencia Académica */}
      <div
        className="w-full mt-10 max-w-2xl bg-[#f5f5f5] shadow-lg p-6 mb-10 transition-all duration-300 cursor-pointer
        hover:shadow-[0_0_25px_#c4af37] hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2 ">
          <Image
            src="/images/seminar.jpeg"
            alt="Seminario"
            width={48}
            height={48}
            className="border-2 border-red-600 transition-all duration-300 
            hover:scale-110 hover:border-[#c4af37] rounded"
          />

          <h3
            className="text-xl font-['Irish_Grover'] text-black mx-4 flex-1 text-center
            hover:text-[#c4af37] hover:scale-105 transition-all duration-300"
            style={{ WebkitTextStroke: "0.8px #c4af37" }}
          >
            {t.academic}
          </h3>

          <button
            onClick={() => playAudio(audioAcademico)}
            className="text-xl p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-md"
          >
            <FaVolumeUp />
          </button>
        </div>

        <p className="font-['Esteban'] text-[#5c4c4c] mb-3 mt-2">{t.academicText}</p>

        <p className="font-['Esteban'] text-[#c4af37] font-bold">{t.academicProjects}</p>
        <ul className="list-disc pl-6 font-['Esteban'] text-[#5c4c4c]">
          {t.academicList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Experiencia Laboral */}
      <div
        className="w-full max-w-2xl bg-[#f5f5f5] shadow-lg p-6 transition-all duration-300 cursor-pointer
        hover:shadow-[0_0_25px_#c4af37] hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <FaBriefcase
            className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:text-[#c4af37]"
          />

          <h3
            className="text-xl font-['Irish_Grover'] text-black mx-4 flex-1 text-center
            hover:text-[#c4af37] hover:scale-105 transition-all duration-300"
            style={{ WebkitTextStroke: "0.8px #c4af37" }}
          >
            {t.work}
          </h3>

          <button
            onClick={() => playAudio(audioLaboral)}
            className="text-xl p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-md"
          >
            <FaVolumeUp />
          </button>
        </div>

        <ul className="list-disc pl-6 font-['Esteban'] text-[#5c4c4c] mt-2">
          {t.workList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}