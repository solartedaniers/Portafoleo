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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full z-50 shadow-lg bg-black">
      {/* 🔘 Menú móvil */}
      <div
        className="flex items-center px-4 py-2 md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="font-bold text-[#d4af37] text-lg">☰ Menú</span>
      </div>

      {/* 🧭 Menú lateral móvil */}
      <div
        className={`fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-[#d4af37] shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.id}`}
              onClick={() => {
                setSelectedIndex(index);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-3 bg-[#f5f5f5] px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105"
                  : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
              }`}
            >
              {selectedIndex === index && (
                <span className="text-lg">{item.icon}</span>
              )}
              <span className="font-['Irish_Grover'] text-black text-sm drop-shadow-[0_0_1px_gold]">
                {t.menu[index]}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 🖥 Menú horizontal en escritorio sin bordes redondeados */}
      <div className="hidden md:block md:px-2 md:pt-2">
        <div className="bg-[#d4af37] max-w-[99%] mx-auto px-4 py-2">
          <div className="grid grid-cols-10 gap-2 max-w-7xl mx-auto">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-col items-center justify-center gap-1 bg-[#f5f5f5] px-3 py-1 rounded-xl border transition-all duration-300 cursor-pointer ${
                  selectedIndex === index
                    ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105"
                    : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
                }`}
              >
                {selectedIndex === index && (
                  <span className="text-lg">{item.icon}</span>
                )}
                <span className="font-['Irish_Grover'] text-black text-xs sm:text-sm drop-shadow-[0_0_1px_gold]">
                  {t.menu[index]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}