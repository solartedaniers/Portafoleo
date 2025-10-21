"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaWhatsapp, FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

type ContactContent = {
  background: string;
  title: string;
  message: string;
  profile: { default: string; hover: string };
  social: {
    linkedin: { url: string; label: string };
    whatsapp: { url: string; label: string };
  };
  fields: {
    email: { label: string; placeholder: string };
    name: { label: string; placeholder: string };
    content: { label: string; placeholder: string };
    send: string;
  };
  errors: {
    email: string;
    nombre: string;
    contenido: string;
    onlyLetters: string;
  };
  success: string;
  error: string;
};

export default function Contact() {
  const { theme } = useApp();
  const { content } = useContent();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  if (!content?.contact) return null;
  const c = content.contact as ContactContent;

  // --- Funciones de sonido ---
  const playLinkedInSound = () => new Audio("/sounds/LinkedIn.mp3").play();
  const playWhatsAppSound = () => new Audio("/sounds/whatsapp.mp3").play();
  const playSendSound = () => new Audio("/sounds/blow.mp3").play();

  // --- Estilos dinámicos ---
  const boxBg = theme === "dark" ? "bg-[#111111]" : "bg-[#f5f5f5]";
  const textMain = theme === "dark" ? "text-[#e6e6e6]" : "text-[#5c4c4c]";
  const inputText = theme === "dark" ? "text-white" : "text-black";
  const placeholderColor = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";

  // --- Validación ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;

    if (!email) newErrors.email = c.errors.email;
    else if (!emailRegex.test(email)) newErrors.email = c.errors.email;

    if (!nombre) newErrors.nombre = c.errors.nombre;
    else if (!nameRegex.test(nombre)) {
      newErrors.nombre = /\d/.test(nombre) ? c.errors.onlyLetters : c.errors.nombre;
    }

    if (!contenido.trim()) newErrors.contenido = c.errors.contenido;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Envío con FormData ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);

    if (validateForm()) {
      playSendSound();

      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("nombre", nombre);
        formData.append("contenido", contenido);

        const res = await fetch("https://formsubmit.co/solartedaniers@gmail.com", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setSuccessMsg(c.success);
          setEmail("");
          setNombre("");
          setContenido("");
        } else {
          setSuccessMsg(c.error);
        }
      } catch {
        setSuccessMsg(c.error);
      }

      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleHoverToggle = () => {
    if (!hasHover) {
      setHovered((prev) => !prev);
      setTimeout(() => setHovered(false), 1200);
    }
  };

  // --- Renderizado ---
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 transition-all duration-500"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      {/* 🔴 Título principal */}
      <h2 className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#d4af37] mb-6">
        {c.title}
      </h2>

      {/* 💬 Mensaje */}
      <div className="hidden md:block">
        <div
          className={`${boxBg} p-6 rounded-xl shadow-md border hover:border-red-600 hover:shadow-[#d4af37] transition-all duration-300 hover:scale-105 max-w-xl w-full mb-12`}
        >
          <p
            className={`font-['Esteban'] ${textMain} text-lg drop-shadow-[0_0_1px_#d4af37] leading-relaxed transition-all duration-300`}
            dangerouslySetInnerHTML={{ __html: c.message }}
          />
        </div>
      </div>

      {/* 🟨 Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center">
        {/* 👤 Imagen */}
        <div className="hidden md:flex justify-center items-start mt-5">
          <div
            className={`rounded-full border-4 border-yellow-500 overflow-hidden w-80 h-80 transition-all duration-300 cursor-pointer ${
              hovered ? "shadow-[0_0_30px_10px_gold] scale-110" : "shadow-lg"
            }`}
            onMouseEnter={() => hasHover && setHovered(true)}
            onMouseLeave={() => hasHover && setHovered(false)}
            onTouchStart={handleHoverToggle}
          >
            <Image
              src={hovered ? c.profile.hover : c.profile.default}
              alt="Perfil"
              width={384}
              height={384}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 📨 Formulario y redes */}
        <div className="flex flex-col items-center justify-center text-center gap-8 w-full">
          {/* 🌐 Redes sociales */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {/* 🟦 LinkedIn */}
            <div
              className={`${boxBg} flex items-center justify-center gap-2 p-4 rounded-xl border shadow-md hover:border-yellow-500 hover:scale-105 transition-all duration-300`}
            >
              <FaLinkedin className="text-2xl text-blue-600 hover:scale-125 transition-all duration-300" />
              <a
                href={c.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playLinkedInSound}
                className={`font-['Esteban'] ${textMain} hover:scale-110 hover:animate-pulse transition-all duration-300`}
              >
                {c.social.linkedin.label}
              </a>
            </div>

            {/* 🟢 WhatsApp — ícono y texto SIEMPRE visibles */}
            <div
              className={`${boxBg} flex items-center justify-center gap-2 p-4 rounded-xl border shadow-md hover:border-yellow-500 hover:scale-105 transition-all duration-300`}
            >
              <a
                href={c.social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playWhatsAppSound}
                className={`flex items-center justify-center gap-2 font-['Esteban'] ${textMain} hover:scale-110 hover:animate-pulse transition-all duration-300`}
              >
                <FaWhatsapp className="text-2xl text-green-600 sm:text-3xl hover:scale-125 transition-all duration-300" />
                <span className="inline">{c.social.whatsapp.label}</span>
              </a>
            </div>
          </div>

          {/* ✉️ Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md text-left">
            <label className="font-['Esteban'] text-lg text-slate-200 drop-shadow-[0_0_1px_red] font-semibold">
              {c.fields.email.label}
            </label>
            <div className={`${boxBg} flex items-center gap-2 p-3 rounded-xl border-2 border-red-600 shadow-sm`}>
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                placeholder={c.fields.email.placeholder}
                className={`bg-transparent w-full outline-none font-['Esteban'] ${placeholderColor} ${inputText}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md animate-pulse">{errors.email}</p>}

            <label className="font-['Esteban'] text-lg text-slate-200 drop-shadow-[0_0_1px_red] font-semibold">
              {c.fields.name.label}
            </label>
            <div className={`${boxBg} flex items-center gap-2 p-3 rounded-xl border-2 border-red-600 shadow-sm`}>
              <FaUser className="text-gray-500" />
              <input
                type="text"
                placeholder={c.fields.name.placeholder}
                className={`bg-transparent w-full outline-none font-['Esteban'] ${placeholderColor} ${inputText}`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            {errors.nombre && <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md animate-pulse">{errors.nombre}</p>}

            <label className="font-['Esteban'] text-lg text-slate-200 drop-shadow-[0_0_1px_red] font-semibold">
              {c.fields.content.label}
            </label>
            <textarea
              placeholder={c.fields.content.placeholder}
              className={`${boxBg} p-3 rounded-xl border-2 border-red-600 shadow-sm w-full h-28 font-['Esteban'] ${placeholderColor} ${inputText}`}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
            {errors.contenido && <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md animate-pulse">{errors.contenido}</p>}

            <button
              type="submit"
              className={`${boxBg} flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-red-600 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500 hover:scale-105 transition-all duration-300`}
            >
              <FaPaperPlane className={`${inputText} animate-pulse`} />
              <span className={`font-['Esteban'] ${inputText}`}>{c.fields.send}</span>
            </button>

            {successMsg && (
              <p className="text-black text-base bg-gray-200 mt-3 py-2 px-3 rounded-md shadow-md animate-fadeIn">
                {successMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
