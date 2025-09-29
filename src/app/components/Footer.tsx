"use client";
import { useState } from "react";
import {
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
  FaSmile,
} from "react-icons/fa";
import {
  GiFeather,
  GiBookshelf,
  GiScrollUnfurled,
  GiTalk,
  GiOpenBook,
  GiGraduateCap,
  GiBrain,
  GiQuillInk,
} from "react-icons/gi";
import { useApp } from "./ThemeLangContext";

export default function Footer() {
  const { lang } = useApp();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const translations = {
    es: {
      title: "Pie de página",
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
      ],
      credits: "© 2025 Daniers Alexander Solarte Limas - Ingeniero de Software",
      rights: "Todos los derechos son reservados",
      phrase:
        "“La verdadera grandeza está en crecer sin perder los principios que nos definen.”",
      author: "Portafolio creado con pasión por Daniers Solarte – 2025",
    },
    en: {
      title: "Footer",
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
      ],
      credits: "© 2025 Daniers Alexander Solarte Limas – Software Engineer",
      rights: "All rights reserved",
      phrase:
        "“True greatness lies in growing without losing the principles that define us.”",
      author: "Portfolio created with passion by Daniers Solarte – 2025",
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
  ];

  return (
    <footer
      className="relative bg-cover bg-center text-center py-10"
      style={{
        backgroundImage: "url('/images/wolf.jpg'), url('/images/samurai.jpg')",
        backgroundPosition: "left, right",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "50% 100%, 50% 100%",
      }}
    >
      <h2 className="font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-xl shadow-md 
        transition-all duration-300 inline-block hover:bg-yellow-500 hover:text-black">
        {t.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-2 mt-6 max-w-7xl mx-auto">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="flex flex-col items-center justify-center gap-1 bg-[#f5f5f5] px-3 py-2 rounded-xl border 
            shadow-md hover:border-red-600 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {activeIndex === index && <span className="text-xl">{item.icon}</span>}
            <span className="font-['Irish_Grover'] text-black text-sm drop-shadow-[0_0_1px_gold]">
              {t.menu[index]}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8 text-lg font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105">
        {t.credits}
        <br />
        {t.rights}
      </div>

      <p
        className="mt-6 font-['Labrada'] text-xl text-white transition-all duration-300 
        hover:text-[#C0C0C0] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105"
        style={{ WebkitTextStroke: "0.5px #c4af37" }}
      >
        {t.phrase}
      </p>

      <p
        className="mt-4 font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1"
      >
        {t.author}
      </p>

      <div className="flex justify-center gap-6 mt-8">
        <a
          href="https://www.linkedin.com/in/daniers-solarte-08716b381"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold 
          shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaLinkedin className="text-blue-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            LinkedIn
          </span>
        </a>

        <a
          href="https://wa.me/573167969206"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold 
          shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaWhatsapp className="text-green-600 text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            WhatsApp
          </span>
        </a>

        <a
          href="https://github.com/solartedaniers"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#f5f5f5] rounded-3xl px-5 py-3 border-2 border-gold 
          shadow-md transition-all duration-300 hover:border-red-600 hover:shadow-white"
        >
          <FaGithub className="text-black text-2xl transition-all duration-300 hover:scale-125" />
          <span className="font-['Esteban'] text-gray-300 hover:text-black transition-all duration-300">
            GitHub
          </span>
        </a>
      </div>
    </footer>
  );
}