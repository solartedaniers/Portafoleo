"use client";
import { useState, useEffect } from "react";
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
  const { lang, theme } = useApp();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detectar si es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const translations = {
    es: {
      menu: [
        "Bienvenidos",
        "Acerca de mí",
        "Tecnologías",
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
        "Technologies",
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
    { icon: <GiBookshelf />, id: "tecnologias" },
    { icon: <GiScrollUnfurled />, id: "misproyectos" },
    { icon: <GiTalk />, id: "testimonios" },
    { icon: <GiOpenBook />, id: "cv" },
    { icon: <GiGraduateCap />, id: "experiencia" },
    { icon: <GiBrain />, id: "filosofia" },
    { icon: <GiQuillInk />, id: "contacto" },
    { icon: <GiArchiveResearch />, id: "PieDePágina" },
  ];

  // 🎵 Sonido menú
  const playMenuSound = () => {
    const audio = new Audio("/sounds/menu.mp3");
    audio.play().catch(() => {});
  };

  // 🎯 Manejo de selección con tap/hover
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    playMenuSound();

    // En móvil, cierra el menú tras seleccionar
    if (isMobile) setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* 🔘 Menú móvil */}
      <div
        className="flex items-center px-4 py-2 md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`font-bold text-lg ${
            theme === "dark" ? "text-[#d4af37]" : "text-black"
          }`}
        >
          ☰ Menú
        </span>
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
              onClick={() => handleSelect(index)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105"
                  : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
              } bg-[#f5f5f5] text-black`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-['Irish_Grover'] text-sm">{t.menu[index]}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 🖥 Menú horizontal escritorio */}
      <div className="hidden md:block md:px-2 md:pt-2">
        <div className="bg-[#d4af37] max-w-[99%] mx-auto px-4 py-2">
          <div className="grid grid-cols-10 gap-2 max-w-7xl mx-auto">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onMouseEnter={() => !isMobile && setSelectedIndex(index)}
                onMouseLeave={() => !isMobile && setSelectedIndex(null)}
                onClick={() => handleSelect(index)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl border transition-all duration-300 cursor-pointer ${
                  selectedIndex === index
                    ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105"
                    : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
                } bg-[#f5f5f5] text-black`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-['Irish_Grover'] text-xs sm:text-sm">
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
