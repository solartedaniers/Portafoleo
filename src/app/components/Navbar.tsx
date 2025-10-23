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

// 🔊 Sonido al hacer clic
const clickSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/menu.mp3") : null;

// 📱 Hook para detectar móvil
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
        { label: "Resume", id: "cv" },
        { label: "Experience", id: "experiencia" },
        { label: "Philosophy", id: "filosofia" },
        { label: "Contact", id: "contacto" },
        { label: "Footer", id: "pie" },
      ],
    },
  };

  const navbarContent =
    content?.navbar ?? defaultMenus[lang] ?? defaultMenus["en"];

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

  // 🔈 Reproduce sonido y selecciona
  const handleSelect = (index: number) => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
    setSelectedIndex(index);
    if (isMobile) setMenuOpen(false);
  };

  // 🎨 Colores dinámicos
  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const borderGold = "border-[3px] border-[#d4af37]";
  const buttonBase =
    theme === "dark"
      ? "bg-black text-[#d4af37] hover:bg-red-600 hover:text-white"
      : "bg-gray-100 text-black hover:bg-red-600 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* 🔘 Botón menú móvil */}
      <div
        className="flex items-center justify-between px-4 py-3 md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="font-bold text-lg text-[#d4af37]">☰ Menú</span>
      </div>

      {/* 📱 Menú móvil */}
      <div
        className={`fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between bg-[#d4af37] transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 🧭 Items del menú */}
        <div className="flex flex-col gap-3 p-4 overflow-hidden flex-1">
          {navbarContent.menu.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleSelect(index)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl ${borderGold} ${cardBg} transition-all duration-300 shadow-md hover:border-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:scale-105`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d4af37] text-black">
                {icons[index]}
              </div>
              <span className="font-['Irish_Grover'] text-sm">{item.label}</span>
            </a>
          ))}
        </div>

        {/* 🌗 Botones finales en móvil */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${buttonBase}`}
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleLang}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${buttonBase}`}
          >
            🌐 {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>

      {/* 🖥 Escritorio */}
      <div className="hidden md:block">
        <div
          className={`max-w-[98.5%] mx-auto mt-[2px] mb-[4px] rounded-xl shadow-md bg-[#d4af37] px-[1px] py-[2px] transition-all duration-500`}
        >
          <div
            className={`grid grid-cols-11 justify-items-center items-center gap-[3px] w-full ${borderGold} rounded-xl p-[2px]`}
          >
            {navbarContent.menu.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleSelect(index)}
                className={`flex flex-col items-center justify-center w-full aspect-square min-h-[75px] rounded-xl ${cardBg} ${borderGold} shadow-md transition-all duration-300 cursor-pointer ${
                  selectedIndex === index
                    ? "border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)] scale-105"
                    : "hover:border-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:scale-105"
                }`}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#d4af37] text-black">
                  {icons[index]}
                </div>
                <span className="font-['Irish_Grover'] text-[0.7rem] text-center">
                  {item.label}
                </span>
              </a>
            ))}

            {/* 🌗 Cuadro final con botones */}
            <div
              className={`flex flex-col items-center justify-center w-full aspect-square min-h-[75px] rounded-xl ${cardBg} ${borderGold} shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:scale-105`}
            >
              <button
                onClick={toggleTheme}
                className={`mb-2 p-2 rounded-lg transition-all flex items-center justify-center ${buttonBase}`}
              >
                {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleLang}
                className={`p-2 rounded-lg transition-all flex items-center justify-center ${buttonBase}`}
              >
                🌐 {lang === "es" ? "EN" : "ES"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
