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
import { useContent } from "./ContentProvider";
import { useHasHover } from "@/hooks/useMediaQuery";
import { useSound } from "@/hooks/useSound";
import { CONTACT_ENDPOINT, SOUNDS } from "@/config/assets";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

const MESSAGE_TIMEOUT_MS = 4000;

type ContactContent = {
  background: string;
  title: string;
  message: string;
  profile: { default: string; hover: string };
  profileAlt: string;
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
  const [sending, setSending] = useState(false);
  const hasHover = useHasHover();
  const playLinkedInSound = useSound(SOUNDS.linkedin);
  const playWhatsAppSound = useSound(SOUNDS.whatsapp);
  const playSendSound = useSound(SOUNDS.send);

  const c = content.contact as ContactContent | undefined;
  if (!c) return null;

  const boxBg = theme === "dark" ? "bg-ink" : "bg-paper";
  const textMain = theme === "dark" ? "text-mist" : "text-umber";
  const inputText = theme === "dark" ? "text-white" : "text-black";
  const placeholderColor =
    theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";

  // Validación del formulario
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;

    if (!email) newErrors.email = c.errors.email;
    else if (!emailRegex.test(email)) newErrors.email = c.errors.email;

    if (!nombre) newErrors.nombre = c.errors.nombre;
    else if (!nameRegex.test(nombre)) {
      newErrors.nombre = /\d/.test(nombre)
        ? c.errors.onlyLetters
        : c.errors.nombre;
    }

    if (!contenido.trim()) newErrors.contenido = c.errors.contenido;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);

    if (sending || !validateForm()) return;

    playSendSound();
    setSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, nombre, contenido }),
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
    } finally {
      setSending(false);
    }

    setTimeout(() => setSuccessMsg(null), MESSAGE_TIMEOUT_MS);
  };

  // Control del efecto hover en dispositivos táctiles
  const handleHoverToggle = () => {
    if (!hasHover) {
      setHovered((prev) => !prev);
      setTimeout(() => setHovered(false), TOUCH_FEEDBACK_MS.long);
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-12 py-10 md:py-16 transition-all duration-500"
      style={{ backgroundImage: `url(${c.background})` }}
    >
      {/* Título */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-6 py-2 mb-6 rounded-full shadow-lg bg-red-600/80 text-white font-irish hover:bg-gold hover:text-black transition-all duration-500">
        {c.title}
      </h2>

      {/* Mensaje informativo */}
      <div className="hidden md:block mb-10 w-full max-w-3xl mx-auto">
        <div
          className={`${boxBg} p-6 rounded-2xl shadow-md border hover:border-red-600 hover:shadow-gold transition-all duration-300`}
        >
          <p
            className={`font-esteban ${textMain} text-lg leading-relaxed text-center`}
            dangerouslySetInnerHTML={{ __html: c.message }}
          />
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full max-w-7xl items-center">
        {/* Imagen de perfil */}
        <div className="hidden lg:flex justify-center">
          <div
            className={`rounded-full border-4 border-yellow-500 overflow-hidden w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 transition-all duration-300 cursor-pointer ${
              hovered ? "shadow-[0_0_30px_10px_gold] scale-105" : "shadow-lg"
            }`}
            onMouseEnter={() => hasHover && setHovered(true)}
            onMouseLeave={() => hasHover && setHovered(false)}
            onTouchStart={handleHoverToggle}
          >
            <Image
              src={hovered ? c.profile.hover : c.profile.default}
              alt={c.profileAlt}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Formulario y redes */}
        <div className="flex flex-col items-center gap-8 w-full px-2 sm:px-6">
          {/* Redes sociales */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md">
            <a
              href={c.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playLinkedInSound}
              className={`${boxBg} flex items-center justify-center gap-3 w-full sm:w-auto p-4 rounded-xl border shadow-md hover:border-yellow-500 hover:scale-105 transition-all duration-300`}
            >
              <FaLinkedin className="text-2xl sm:text-3xl text-blue-600" />
              <span className={`font-esteban ${textMain} text-base sm:text-lg`}>
                {c.social.linkedin.label}
              </span>
            </a>

            <a
              href={c.social.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playWhatsAppSound}
              className={`${boxBg} flex items-center justify-center gap-3 w-full sm:w-auto p-4 rounded-xl border shadow-md hover:border-yellow-500 hover:scale-105 transition-all duration-300`}
            >
              <FaWhatsapp className="text-2xl sm:text-3xl text-green-600" />
              <span className={`font-esteban ${textMain} text-base sm:text-lg`}>
                {c.social.whatsapp.label}
              </span>
            </a>
          </div>

          {/* Formulario de contacto */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md text-left"
          >
            {/* Campo: Email */}
            <label htmlFor="contact-email" className="font-esteban text-base sm:text-lg text-slate-200">
              {c.fields.email.label}
            </label>
            <div className={`${boxBg} flex items-center gap-2 p-3 rounded-xl border-2 border-red-600`}>
              <FaEnvelope className="text-gray-500" />
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder={c.fields.email.placeholder}
                className={`bg-transparent w-full outline-none font-esteban ${placeholderColor} ${inputText}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md">{errors.email}</p>
            )}

            {/* Campo: Nombre */}
            <label htmlFor="contact-name" className="font-esteban text-base sm:text-lg text-slate-200">
              {c.fields.name.label}
            </label>
            <div className={`${boxBg} flex items-center gap-2 p-3 rounded-xl border-2 border-red-600`}>
              <FaUser className="text-gray-500" />
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder={c.fields.name.placeholder}
                className={`bg-transparent w-full outline-none font-esteban ${placeholderColor} ${inputText}`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            {errors.nombre && (
              <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md">{errors.nombre}</p>
            )}

            {/* Campo: Contenido */}
            <label htmlFor="contact-content" className="font-esteban text-base sm:text-lg text-slate-200">
              {c.fields.content.label}
            </label>
            <textarea
              id="contact-content"
              placeholder={c.fields.content.placeholder}
              className={`${boxBg} p-3 rounded-xl border-2 border-red-600 w-full h-28 font-esteban ${placeholderColor} ${inputText}`}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
            {errors.contenido && (
              <p className="bg-gray-200 text-black text-sm px-3 py-1 rounded-md">{errors.contenido}</p>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={sending}
              className={`${boxBg} flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-red-600 hover:border-yellow-500 hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <FaPaperPlane className={`${inputText} animate-pulse`} />
              <span className={`font-esteban ${inputText}`}>
                {c.fields.send}
              </span>
            </button>

            {successMsg && (
              <p className="text-black text-base bg-gray-200 mt-3 py-2 px-3 rounded-md shadow-md text-center animate-fadeIn">
                {successMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
