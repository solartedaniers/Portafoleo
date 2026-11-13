"use client";
import React, { useState } from "react";
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
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSound } from "@/hooks/useSound";
import { SOUNDS } from "@/config/assets";

const ICONS_BY_SECTION: Record<string, React.ReactNode> = {
  bienvenidos: <FaSmile />,
  acercademi: <GiFeather />,
  tecnologias: <GiBookshelf />,
  misproyectos: <GiScrollUnfurled />,
  testimonios: <GiTalk />,
  cv: <GiOpenBook />,
  experiencia: <GiGraduateCap />,
  filosofia: <GiBrain />,
  contacto: <GiQuillInk />,
  PieDePágina: <GiArchiveResearch />,
};

interface MenuItem {
  label: string;
  id: string;
}

interface NavbarContent {
  menu: MenuItem[];
}

interface UiContent {
  menu: string;
  switchLanguage: string;
  themeToggle: string;
  langToggle: string;
}

export default function Navbar() {
  const { theme, toggleTheme, toggleLang } = useApp();
  const { content } = useContent();
  const navbar = content.navbar as NavbarContent | undefined;
  const ui = content.ui as UiContent;
  const isMobile = useIsMobile();
  const playMenuSound = useSound(SOUNDS.menu);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!navbar) return null;

  const cardBg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const borderGold = "border-[2px] border-gold";
  const buttonBase =
    theme === "dark"
      ? "bg-black text-gold hover:bg-red-600 hover:text-white"
      : "bg-gray-100 text-black hover:bg-red-600 hover:text-white";

  const handleSelect = () => {
    playMenuSound();
    if (isMobile) setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <button
        type="button"
        aria-expanded={menuOpen}
        className="flex w-full items-center justify-between px-5 py-3 md:hidden cursor-pointer"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="font-bold text-lg text-gold">{ui.menu}</span>
      </button>

      <div
        className={`fixed top-[60px] left-0 w-full h-[calc(100dvh-60px)] flex flex-col justify-between bg-gold transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3 p-4 flex-1 overflow-y-auto justify-center">
          {navbar.menu.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleSelect}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl ${borderGold} ${cardBg} transition-all duration-300 hover:border-red-600 hover:scale-105`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold text-black shrink-0">
                {ICONS_BY_SECTION[item.id]}
              </div>
              <span className="font-irish text-sm break-words">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap px-4">
          <button type="button" aria-label={ui.themeToggle} onClick={toggleTheme} className={`p-3 rounded-xl ${buttonBase} w-28 sm:w-auto`}>
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button type="button" aria-label={ui.langToggle} onClick={toggleLang} className={`p-3 rounded-xl ${buttonBase} w-28 sm:w-auto`}>
            🌐 {ui.switchLanguage}
          </button>
        </div>
      </div>

      {!isMobile && (
        <div className="hidden md:block">
          <div className="max-w-[98%] mx-auto my-[4px] rounded-xl shadow-md bg-gold p-[3px] transition-all duration-500">
            <div
              className={`flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gold scrollbar-track-transparent ${borderGold} rounded-xl p-2`}
            >
              {navbar.menu.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleSelect}
                  className={`flex flex-col items-center justify-center w-[120px] h-[110px] rounded-xl ${cardBg} ${borderGold} shadow-md transition-all duration-300 cursor-pointer hover:scale-105 shrink-0`}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gold text-black">
                    {ICONS_BY_SECTION[item.id]}
                  </div>
                  <span className="font-irish text-[0.7rem] text-center mt-2">
                    {item.label}
                  </span>
                </a>
              ))}

              <div
                className={`flex flex-col items-center justify-center w-[120px] h-[110px] rounded-xl ${cardBg} ${borderGold} shrink-0`}
              >
                <button
                  type="button"
                  aria-label={ui.themeToggle}
                  onClick={toggleTheme}
                  className={`mb-2 p-2 rounded-lg ${buttonBase} w-full max-w-[70px]`}
                >
                  {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button type="button" aria-label={ui.langToggle} onClick={toggleLang} className={`p-2 rounded-lg ${buttonBase} w-full max-w-[70px]`}>
                  🌐 {ui.switchLanguage}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
