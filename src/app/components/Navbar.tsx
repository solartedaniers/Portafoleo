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

// 🧩 Tipado del contenido
interface MenuItem {
  label: string;
  id: string;
}

interface NavbarLangContent {
  menu: MenuItem[];
}

export default function Navbar() {
  const { lang, theme } = useApp();
  const { content } = useContent() as { content: {navbar?: NavbarLangContent } };
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

  // 🌍 Cargar desde el JSON correcto según el idioma
  const navbarContent: NavbarLangContent =
    content?.navbar ??
    (lang === "es"
      ? {
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
        }
      : {
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
        });

  // 🧱 Íconos en orden
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

  // 🎵 Sonido menú
  const playMenuSound = () => {
    const audio = new Audio("/sounds/menu.mp3");
    audio.play().catch(() => {});
  };

  // 🎯 Manejo de selección
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    playMenuSound();
    if (isMobile) setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* 🔘 Botón menú móvil */}
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

      {/* 📱 Menú lateral móvil */}
      <div
        className={`fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-[#d4af37] shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          {navbarContent.menu.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleSelect(index)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "border-red-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-105"
                  : "border-transparent hover:border-red-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:scale-105"
              } bg-[#f5f5f5] text-black`}
            >
              <span className="text-lg">{icons[index]}</span>
              <span className="font-['Irish_Grover'] text-sm">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 🖥 Menú escritorio */}
      <div className="hidden md:block md:px-2 md:pt-2">
        <div className="bg-[#d4af37] max-w-[99%] mx-auto px-4 py-2">
          <div className="grid grid-cols-10 gap-2 max-w-7xl mx-auto">
            {navbarContent.menu.map((item, index) => (
              <a
                key={item.id}
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
                <span className="text-lg">{icons[index]}</span>
                <span className="font-['Irish_Grover'] text-xs sm:text-sm">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
