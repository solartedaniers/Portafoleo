"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaLinkedin,
  FaWhatsapp,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import { useApp } from "./ThemeLangContext";

export default function Contact() {
  const { lang } = useApp();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [hovered, setHovered] = useState(false);

  // 🎵 Sonidos
  const playLinkedInSound = () => {
    const audio = new Audio("/sounds/LinkedIn.mp3");
    audio.play();
  };

  const playWhatsAppSound = () => {
    const audio = new Audio("/sounds/whatsapp.mp3");
    audio.play();
  };

  // 🌍 Traducciones
  const translations = {
    es: {
      title: "Contacto",
      message:
        "“Si quieres construir algo increíble, no dudes en escribirme.<br />Siempre estoy dispuesto a aprender y aportar,<br />así que escríbeme y demos el primer paso.”",
      email: "Email*",
      name: "Nombre*",
      content: "Contenido*",
      placeholderEmail: "Ejemplo@gmail.com",
      placeholderName: "Xavier",
      placeholderContent: "Escriba aquí el motivo de su mensaje",
      send: "Enviar",
    },
    en: {
      title: "Contact",
      message:
        "“If you want to build something amazing, don’t hesitate to write to me.<br />I’m always eager to learn and contribute,<br />so reach out and let’s take the first step.”",
      email: "Email*",
      name: "Name*",
      content: "Message*",
      placeholderEmail: "Example@gmail.com",
      placeholderName: "Xavier",
      placeholderContent: "Write your message here",
      send: "Send",
    },
  };

  const t = translations[lang];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/village.webp')" }}
    >
      {/* 🔴 Título (siempre visible) */}
      <h2
        className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500
                   bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37] mb-6"
      >
        {t.title}
      </h2>

      {/* 💬 Texto motivacional — solo visible en pantallas md y superiores */}
      <div className="hidden md:block">
        <div
          className="bg-[#f5f5f5] p-6 rounded-xl shadow-md border hover:border-red-600 hover:shadow-white
                     transition-all duration-300 hover:scale-105 max-w-xl w-full mb-12"
        >
          <p
            className="font-['Esteban'] text-[#5c4c4c] text-lg drop-shadow-[0_0_1px_#d4af37]
                       leading-relaxed hover:scale-105 hover:shadow-md hover:shadow-gray-400 transition-all duration-300"
            dangerouslySetInnerHTML={{ __html: t.message }}
          />
        </div>
      </div>

      {/* 🟨 Contenido principal (imagen + formulario) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center">
        {/* 👤 Imagen — solo en pantallas medianas y grandes */}
        <div className="hidden md:flex justify-center items-start mt-5">
          <div
            className={`rounded-full border-4 border-yellow-500 overflow-hidden w-80 h-80  
              transition-all duration-300 cursor-pointer ${
                hovered ? "shadow-[0_0_30px_10px_gold] scale-110" : "shadow-lg"
              }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Image
              src={hovered ? "/images/profile2.webp" : "/images/profile1.webp"}
              alt="Perfil"
              width={384}
              height={384}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 📨 Redes + formulario */}
        <div className="flex flex-col items-center justify-center text-center gap-8 w-full">
          {/* 🌐 Redes sociales */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] p-4 rounded-xl border shadow-md  
                hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <FaLinkedin className="text-2xl text-blue-600 hover:scale-125 transition-all duration-300" />
              <a
                href="https://www.linkedin.com/in/daniers-solarte-08716b381"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playLinkedInSound}
                className="font-['Esteban'] text-gray-400 hover:scale-110 hover:animate-pulse transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>

            <div
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] p-4 rounded-xl border shadow-md  
                hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="text-2xl text-green-600 hover:scale-125 transition-all duration-300" />
              <a
                href="https://wa.me/3167969206"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playWhatsAppSound}
                className="font-['Esteban'] text-gray-400 hover:scale-110 hover:animate-pulse transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* ✉️ Formulario */}
          <form
            id="contact-form"
            action="https://formsubmit.co/solartedaniers@gmail.com"
            method="POST"
            className="flex flex-col gap-4 w-full max-w-md text-left"
          >
            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              {t.email}
            </label>
            <div
              className="flex items-center gap-2 bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm  
                hover:border-yellow-500 focus-within:border-yellow-500 transition-all duration-300"
            >
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                placeholder={t.placeholderEmail}
                className="bg-transparent w-full outline-none font-['Esteban'] placeholder-gray-400 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              {t.name}
            </label>
            <div
              className="flex items-center gap-2 bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm  
                hover:border-yellow-500 focus-within:border-yellow-500 transition-all duration-300"
            >
              <FaUser className="text-gray-500" />
              <input
                type="text"
                placeholder={t.placeholderName}
                className="bg-transparent w-full outline-none font-['Esteban'] placeholder-gray-400 text-black"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              {t.content}
            </label>
            <textarea
              placeholder={t.placeholderContent}
              className="bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm w-full h-28 font-['Esteban']  
                placeholder-gray-400 text-black  
                hover:border-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />

            {/* ✅ Botón de envío */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] px-6 py-3 rounded-full border-2 border-red-600  
                hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500 hover:scale-105 transition-all duration-300"
            >
              <FaPaperPlane className="text-black animate-pulse" />
              <span className="font-['Esteban'] text-black drop-shadow-[0_0_1px_#d4af37] hover:scale-105">
                {t.send}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
