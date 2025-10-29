"use client";
import React, { useState, useEffect } from "react";
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
import { useContent } from "./ContentProvider";
import { Sun, Moon } from "lucide-react";

// Sonido clic del menú
const clickSound = typeof Audio !== "undefined" ? new Audio("/sounds/menu.mp3") : null;

// Hook para detectar si es móvil
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

interface MenuItem {
  label: string;
  id: string;
}

interface NavbarLangContent {
  menu: MenuItem[];
}

export default function Navbar() {
  const { lang, theme, toggleTheme, toggleLang } = useApp();
  const { content } = useContent() as { content: { navbar?: NavbarLangContent } };

  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const defaultMenus: Record<string, NavbarLangContent> = {
    es: {
      menu: [
        { label: "Bienvenidos", id: "bienvenidos" },
        { label: "Acerca de mí", id: "acercademi" },
        { label: "Tecnologías", id: "tecnologias" },
        { label: "Mis Proyectos", id: "misproyectos" },
        { label: "Testimonios", id: "testimonios" },
        { label: "CV", id: "cv" },
        { label: "Experiencia", id: "experiencia" },
        { label: "Filosofía", id: "filosofia" },
        { label: "Contacto", id: "contacto" },
        { label: "Pie de Página", id: "pie" },
      ],
    },
    en: {
      menu: [
        { label: "Welcome", id: "bienvenidos" },
        { label: "About Me", id: "acercademi" },
        { label: "Technologies", id: "tecnologias" },
        { label: "My Projects", id: "misproyectos" },
        { label: "Testimonials", id: "testimonios" },
        { label: "Cv", id: "cv" },
        { label: "Experience", id: "experiencia" },
        { label: "Philosophy", id: "filosofia" },
        { label: "Contact", id: "contacto" },
        { label: "Footer", id: "pie" },
      ],
    },
  };

  const navbarContent = content?.navbar ?? defaultMenus[lang];
  const icons = [
    <FaSmile key="1" />,
    <GiFeather key="2" />,
    <GiBookshelf key="3" />,
    <GiScrollUnfurled key="4" />,
    <GiTalk key="5" />,
    <GiOpenBook key="6" />,
    <GiGraduateCap key="7" />,
    <GiBrain key="8" />,
    <GiQuillInk key="9" />,
    <GiArchiveResearch key="10" />,
  ];

  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const borderGold = "border-[2px] border-[#d4af37]";
  const buttonBase =
    theme === "dark"
      ? "bg-black text-[#d4af37] hover:bg-red-600 hover:text-white"
      : "bg-gray-100 text-black hover:bg-red-600 hover:text-white";

  const handleSelect = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    if (isMobile) setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Menú móvil */}
      <div
        className="flex items-center justify-between px-5 py-3 md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="font-bold text-lg text-[#d4af37]">☰ Menú</span>
      </div>

      {/* Panel móvil */}
      <div
        className={`fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between bg-[#d4af37] transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3 p-4 flex-1 overflow-hidden justify-center">
          {navbarContent.menu.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleSelect}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl ${borderGold} ${cardBg} transition-all duration-300 hover:border-red-600 hover:scale-105`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d4af37] text-black shrink-0">
                {icons[index]}
              </div>
              <span className="font-['Irish_Grover'] text-sm break-words">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap px-4">
          <button onClick={toggleTheme} className={`p-3 rounded-xl ${buttonBase} w-28 sm:w-auto`}>
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleLang} className={`p-3 rounded-xl ${buttonBase} w-28 sm:w-auto`}>
            🌐 {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>

      {!isMobile && (
        <div className="hidden md:block">
          <div className="max-w-[98%] mx-auto my-[4px] rounded-xl shadow-md bg-[#d4af37] p-[2px] transition-all duration-500 overflow-hidden">
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 justify-items-center items-center gap-[4px] w-full ${borderGold} rounded-xl p-[3px]`}
            >
              {navbarContent.menu.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleSelect}
                  className={`flex flex-col items-center justify-center w-full min-h-[70px] rounded-xl ${cardBg} ${borderGold} shadow-md transition-all duration-300 cursor-pointer hover:scale-105`}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#d4af37] text-black shrink-0">
                    {icons[index]}
                  </div>
                  <span className="font-['Irish_Grover'] text-[0.7rem] text-center break-words">
                    {item.label}
                  </span>
                </a>
              ))}

              {/* Botones de idioma y tema */}
              <div
                className={`flex flex-col items-center justify-center w-full min-h-[70px] rounded-xl ${cardBg} ${borderGold} overflow-hidden`}
              >
                <button
                  onClick={toggleTheme}
                  className={`mb-2 p-2 rounded-lg ${buttonBase} w-full max-w-[70px]`}
                >
                  {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={toggleLang}
                  className={`p-2 rounded-lg ${buttonBase} w-full max-w-[70px]`}
                >
                  🌐 {lang === "es" ? "EN" : "ES"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
