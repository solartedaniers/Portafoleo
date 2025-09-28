"use client";
import { useState } from "react";
import Image from "next/image";
import { FaVolumeUp, FaBriefcase } from "react-icons/fa";

export default function Experiencia() {
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

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/city.jpg')" }}
    >
      {/* Título principal */}
      <h2
        className="text-3xl font-['Irish_Grover'] text-white px-6 py-2 rounded-full bg-red-600 mb-8
        hover:bg-[#c4af37] transition-all duration-300 cursor-pointer"
      >
        Experiencia Académica y Laboral
      </h2>

      {/* Experiencia Académica */}
      <div
        className="w-full max-w-2xl bg-[#f5f5f5] shadow-lg p-6 mb-10 transition-all duration-300 cursor-pointer
        hover:shadow-[0_0_25px_#c4af37] hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          {/* Imagen optimizada */}
          <Image
            src="/images/seminar.jpeg"
            alt="Seminario"
            width={48}
            height={48}
            className="border-2 border-red-600 transition-all duration-300 
            hover:scale-110 hover:border-[#c4af37] rounded"
          />

          {/* Título */}
          <h3
            className="text-xl font-['Irish_Grover'] text-black mx-4 flex-1 text-center
            hover:text-[#c4af37] hover:scale-105 transition-all duration-300"
            style={{ WebkitTextStroke: "0.8px #c4af37" }}
          >
            Experiencia Académica
          </h3>

          {/* Botón de audio */}
          <button
            onClick={() => playAudio(audioAcademico)}
            className="text-xl p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-md"
          >
            <FaVolumeUp />
          </button>
        </div>

        {/* Texto */}
        <p className="font-['Esteban'] text-[#5c4c4c] mb-3 mt-2">
          Soy estudiante de Ingeniería de Software Universidad Cooperativa de
          Colombia, Campus Pasto (actualmente cursando 5° semestre).
          <br />
          Participación en el Primer Seminario Nacional de Ingeniería de
          Software.
        </p>

        <p className="font-['Esteban'] text-[#c4af37] font-bold">
          Desarrollo de proyectos académicos:
        </p>
        <ul className="list-disc pl-6 font-['Esteban'] text-[#5c4c4c]">
          <li>Simulador de crecimiento de plantas.</li>
          <li>Sistema de monitoreo de café.</li>
          <li>
            Aplicación para el cálculo de vacaciones de trabajadores según
            departamento y antigüedad.
          </li>
          <li>
            Diseño y desarrollo de interfaces enfocadas en usabilidad y
            experiencia de usuario.
          </li>
        </ul>
      </div>

      {/* Experiencia Laboral */}
      <div
        className="w-full max-w-2xl bg-[#f5f5f5] shadow-lg p-6 transition-all duration-300 cursor-pointer
        hover:shadow-[0_0_25px_#c4af37] hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          {/* Icono */}
          <FaBriefcase
            className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:text-[#c4af37]"
          />

          {/* Título */}
          <h3
            className="text-xl font-['Irish_Grover'] text-black mx-4 flex-1 text-center
            hover:text-[#c4af37] hover:scale-105 transition-all duration-300"
            style={{ WebkitTextStroke: "0.8px #c4af37" }}
          >
            Experiencia Laboral
          </h3>

          {/* Botón de audio */}
          <button
            onClick={() => playAudio(audioLaboral)}
            className="text-xl p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-md"
          >
            <FaVolumeUp />
          </button>
        </div>

        {/* Texto */}
        <ul className="list-disc pl-6 font-['Esteban'] text-[#5c4c4c] mt-2">
          <li>Cocinero de comidas rápidas – Restaurante DMaíz.</li>
          <li>Repartidor de frutas en carro – Frutas Gómez.</li>
          <li>Vendedor en tienda – Panadería Lima Pan.</li>
          <li>Apoyo en instalación de postes y cuerdas de luz.</li>
        </ul>
      </div>
    </section>
  );
}