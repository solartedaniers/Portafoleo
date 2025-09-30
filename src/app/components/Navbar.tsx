"use client";
import { useState } from "react";
import { FaSmile } from "react-icons/fa";
import {
  GiFeather,
  GiBookshelf,
  GiScrollUnfurled,
  GiTalk,
  GiOpenBook,
  GiGraduateCap,
  GiBrain,
  GiQuillInk,
  GiArchiveResearch,
} from "react-icons/gi";
import { useApp } from "./ThemeLangContext";

export default function Navbar() {
  const { lang } = useApp();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // ✅ nuevo estado

  const translations = {
    es: {
      menu: [
        "Bienvenidos",
        "Acerca de mí",
        "Lenguajes",
        "Mis Proyectos",
        "Testimonios",
        "CV",
        "Experiencia Académica y Laboral",
        "Mi Filosofía de Vida",
        "Contacto",
        "Pie de Página",
      ],
    },
    en: {
      menu: [
        "Welcome",
        "About Me",
        "Languages",
        "My Projects",
        "Testimonials",
        "Resume",
        "Academic and Work Experience",
        "My Life Philosophy",
        "Contact",
        "Footer",
      ],
    },
  };

  const t = translations[lang];

  const menuItems = [
    { icon: <FaSmile />, id: "bienvenidos" },
    { icon: <GiFeather />, id: "acercademi" },
    { icon: <GiBookshelf />, id: "lenguajes" },
    { icon: <GiScrollUnfurled />, id: "misproyectos" },
    { icon: <GiTalk />, id: "testimonios" },
    { icon: <GiOpenBook />, id: "cv" },
    { icon: <GiGraduateCap />, id: "experiencia" },
    { icon: <GiBrain />, id: "filosofia" },
    { icon: <GiQuillInk />, id: "contacto" },
    { icon: <GiArchiveResearch />, id: "PieDePágina" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#d4af37] z-50 shadow-lg">
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 py-2 px-4 max-w-7xl mx-auto">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            onClick={() => setSelectedIndex(index)} // ✅ marcar como seleccionado
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`
              flex flex-col items-center justify-center gap-1 bg-[#f5f5f5] px-3 py-1 rounded-xl border 
              transition-all duration-300 cursor-pointer 
              ${
                selectedIndex === index
                  ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105" // ✅ borde rojo + sombra negra + efecto activo
                  : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
              }
            `}
          >
            {activeIndex === index && (
              <span className="text-lg">{item.icon}</span>
            )}
            <span className="font-['Irish_Grover'] text-black text-xs sm:text-sm drop-shadow-[0_0_1px_gold]">
              {t.menu[index]}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
