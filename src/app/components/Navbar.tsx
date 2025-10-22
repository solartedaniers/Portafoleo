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
import { useContent } from "./ContentProvider";
import { Sun, Moon } from "lucide-react";

// 📱 Hook para detectar pantallas móviles
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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🗂 Contenido por idioma
  const defaultMenus: Record<string, NavbarLangContent> = {
    es: {
      menu: [
        { label: "Bienvenidos", id: "bienvenidos" },
        { label: "Acerca de mí", id: "acercademi" },
        { label: "Tecnologías", id: "tecnologias" },
        { label: "Mis Proyectos", id: "misproyectos" },
        { label: "Testimonios", id: "testimonios" },
        { label: "CV", id: "cv" },
        { label: "Experiencia Académica y Laboral", id: "experiencia" },
        { label: "Mi Filosofía de Vida", id: "filosofia" },
        { label: "Contacto", id: "contacto" },
        { label: "Pie de Página", id: "PieDePágina" },
      ],
    },
    en: {
      menu: [
        { label: "Welcome", id: "bienvenidos" },
        { label: "About Me", id: "acercademi" },
        { label: "Technologies", id: "tecnologias" },
        { label: "My Projects", id: "misproyectos" },
        { label: "Testimonials", id: "testimonios" },
        { label: "Resume", id: "cv" },
        { label: "Academic & Work Experience", id: "experiencia" },
        { label: "My Life Philosophy", id: "filosofia" },
        { label: "Contact", id: "contacto" },
        { label: "Footer", id: "PieDePágina" },
      ],
    },
  };

  const navbarContent = content?.navbar ?? defaultMenus[lang] ?? defaultMenus["en"];

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

  const playMenuSound = () => {
    const audio = new Audio("/sounds/menu.mp3");
    audio.play().catch(() => {});
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    playMenuSound();
    if (isMobile) setMenuOpen(false);
  };

  const bgMain = theme === "dark" ? "bg-black" : "bg-white";
  const bgItem = theme === "dark" ? "bg-black text-white" : "bg-[#f5f5f5] text-black";
  const textMenu = theme === "dark" ? "text-[#d4af37]" : "text-black";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 shadow-lg ${bgMain} transition-all duration-500`}>
      {/* 🔘 Botón menú móvil */}
      <div
        className="flex items-center justify-between px-5 py-3 md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`font-bold text-lg ${textMenu}`}>☰ Menú</span>
        <span className="text-[#d4af37] font-['Irish_Grover'] text-base">Daniers Solarte</span>
      </div>

      {/* 📱 Menú móvil */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#d4af37] z-40 transform transition-all duration-300 ease-in-out md:hidden flex flex-col items-center justify-center p-6 ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col w-full items-center justify-center gap-3">
          {navbarContent.menu.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleSelect(index)}
              className={`flex items-center justify-center gap-3 w-[85%] sm:w-[70%] px-4 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer text-[clamp(0.9rem,2.5vw,1.1rem)] ${
                selectedIndex === index
                  ? "border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)] scale-105"
                  : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:scale-105"
              } ${bgItem}`}
            >
              <span className="text-xl sm:text-2xl">{icons[index]}</span>
              <span className="font-['Irish_Grover']">{item.label}</span>
            </a>
          ))}

          {/* 🌗 Botones dentro del fondo dorado */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              onClick={toggleLang}
              className="px-5 py-2 bg-black text-[#d4af37] rounded-xl text-[clamp(0.8rem,2vw,1rem)] hover:bg-red-600 hover:text-white transition-all"
            >
              🌐 {lang === "es" ? "EN" : "ES"}
            </button>
            <button
              onClick={toggleTheme}
              className="px-5 py-2 bg-black text-[#d4af37] rounded-xl hover:bg-red-600 hover:text-white transition-all"
            >
              {theme === "dark" ? <Moon size={22} /> : <Sun size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 🖥 Escritorio */}
      <div className="hidden md:block fixed top-0 left-0 w-full bg-[#d4af37] z-50">
        <div className="max-w-[96%] mx-auto px-4 py-2">
          <div className="grid grid-cols-12 gap-2 items-center justify-center">
            {navbarContent.menu.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(null)}
                onClick={() => handleSelect(index)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer text-[clamp(0.7rem,1vw,0.9rem)] ${
                  selectedIndex === index
                    ? "border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)] scale-105"
                    : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:scale-105"
                } ${bgItem}`}
              >
                <span className="text-[clamp(1rem,1.2vw,1.4rem)]">{icons[index]}</span>
                <span className="font-['Irish_Grover']">{item.label}</span>
              </a>
            ))}

            {/* 🌐 Botones */}
            <div
              className={`flex items-center justify-center gap-3 px-3 py-2 rounded-xl border border-transparent hover:border-red-600 transition-all duration-300 ${bgItem}`}
            >
              <button
                onClick={toggleLang}
                className="px-3 py-1 bg-black text-[#d4af37] rounded-xl text-[clamp(0.8rem,1vw,1rem)] hover:bg-red-600 hover:text-white transition-all"
              >
                🌐 {lang === "es" ? "EN" : "ES"}
              </button>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 bg-black text-[#d4af37] rounded-xl hover:bg-red-600 hover:text-white transition-all"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
