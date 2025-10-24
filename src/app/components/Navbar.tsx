"use client";
import React, { useState, useEffect } from "react";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
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
import { FaSmile } from "react-icons/fa";
import { Sun, Moon, Menu, X } from "lucide-react";

// 🎵 Sonido del menú
const clickSound = typeof Audio !== "undefined" ? new Audio("/sounds/menu.mp3") : null;

// 🧩 Tipos del contenido esperado
interface NavbarItem {
  label: string;
  icon: React.ReactNode;
}

interface NavbarLanguage {
  [lang: string]: {
    items: NavbarItem[];
  };
}

interface NavbarContent {
  navbar?: NavbarLanguage;
}

// 🌐 Componente principal
export default function Navbar() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();
  const { content } = useContent() as { content: NavbarContent };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detectar si es móvil
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 🎧 Sonido de clic
  const handleSelect = (): void => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    if (isMobile) setMenuOpen(false);
  };

  // 🧭 Texto traducido
  const defaultItems: NavbarItem[] = [
    { label: "Inicio", icon: <GiFeather /> },
    { label: "Sobre mí", icon: <FaSmile /> },
    { label: "Habilidades", icon: <GiBrain /> },
    { label: "Proyectos", icon: <GiBookshelf /> },
    { label: "Educación", icon: <GiGraduateCap /> },
    { label: "Experiencia", icon: <GiScrollUnfurled /> },
    { label: "Blog", icon: <GiQuillInk /> },
    { label: "Investigación", icon: <GiArchiveResearch /> },
    { label: "Testimonios", icon: <GiTalk /> },
    { label: "Contacto", icon: <GiOpenBook /> },
  ];

  const t = content?.navbar?.[lang]?.items ?? defaultItems;

  // 🎨 Estilos adaptados al tema
  const borderGold = "border-[2px] border-[#d4af37]";
  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const buttonBase =
    theme === "dark"
      ? "bg-black text-[#d4af37] hover:bg-red-600 hover:text-white"
      : "bg-gray-100 text-black hover:bg-red-600 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md border-b-[3px] ${borderGold} transition-all duration-500 ${
        theme === "dark" ? "bg-black" : "bg-[#f9f7f2]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* 🧠 Logo o Marca */}
        <div
          className={`font-['Irish_Grover'] text-xl sm:text-2xl font-bold ${
            theme === "dark" ? "text-[#d4af37]" : "text-black"
          }`}
        >
          DS
        </div>

        {/* 🌐 Controles principales (Desktop) */}
        <div className="hidden lg:flex gap-3 items-center">
          {t.map((item, i) => (
            <button
              key={i}
              onClick={handleSelect}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${buttonBase} ${borderGold}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* 🔘 Cambiar tema */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all duration-300 ${buttonBase} ${borderGold}`}
            aria-label="Cambiar tema"
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* 🌍 Cambiar idioma */}
          <button
            onClick={toggleLang}
            className={`px-3 py-1.5 rounded-full transition-all duration-300 ${buttonBase} ${borderGold}`}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* 🍔 Botón Hamburguesa (solo móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-full ${buttonBase} ${borderGold}`}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 📱 Menú móvil */}
      {isMobile && menuOpen && (
        <div
          className={`lg:hidden flex flex-col items-center gap-3 p-5 transition-all duration-300 ${cardBg} ${borderGold}`}
        >
          {t.map((item, i) => (
            <button
              key={i}
              onClick={handleSelect}
              className={`flex items-center gap-3 w-full justify-center text-base py-2 rounded-full font-semibold transition-all duration-300 ${buttonBase} ${borderGold}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* Botones finales */}
          <div className="flex gap-4 mt-3 mb-2">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${buttonBase} ${borderGold}`}
            >
              {theme === "light" ? (
                <>
                  ☀️ <span className="ml-1">Claro</span>
                </>
              ) : (
                <>
                  🌙 <span className="ml-1">Oscuro</span>
                </>
              )}
            </button>

            <button
              onClick={toggleLang}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${buttonBase} ${borderGold}`}
            >
              🌐 {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
