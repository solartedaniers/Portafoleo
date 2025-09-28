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

export default function Contact() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/village.jpg')" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center">
        {/* Columna izquierda - Imagen grande (10px más abajo) */}
        <div className="flex justify-center items-start mt-70">
          <div
            className={`rounded-full border-4 border-yellow-500 overflow-hidden w-96 h-96 
              transition-all duration-300 cursor-pointer ${
                hovered
                  ? "shadow-[0_0_30px_10px_gold] scale-110"
                  : "shadow-lg"
              }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Image
              src={hovered ? "/images/profile 2.jpeg" : "/images/profile 1.jpeg"}
              alt="Perfil"
              width={384} // 96 * 4
              height={384} // 96 * 4
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-center justify-center text-center gap-8 w-full">
          {/* Título y texto */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h2
              className="font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-lg shadow-md 
                hover:bg-yellow-500 transition-all duration-300 w-fit "
            >
              Contacto
            </h2>

            <div
              className="bg-[#f5f5f5] p-6 rounded-xl shadow-md border hover:border-red-600 hover:shadow-white 
                transition-all duration-300 hover:scale-105 max-w-xl w-full"
            >
              <p
                className="font-['Esteban'] text-[#5c4c4c] text-lg drop-shadow-[0_0_1px_#d4af37] 
                  leading-relaxed hover:scale-105 hover:shadow-md hover:shadow-gray-400 transition-all duration-300"
              >
                “Si quieres construir algo increíble, no dudes en escribirme.
                <br />
                Siempre estoy dispuesto a aprender y aportar,
                <br />
                así que escríbeme y demos el primer paso.”
              </p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {/* LinkedIn */}
            <div
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] p-4 rounded-xl border shadow-md 
                hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <FaLinkedin className="text-2xl text-blue-600 hover:scale-125 transition-all duration-300" />
              <a
                href="https://www.linkedin.com/in/daniers-solarte-08716b381"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Esteban'] text-gray-400 hover:scale-110 hover:animate-pulse transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>

            {/* WhatsApp */}
            <div
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] p-4 rounded-xl border shadow-md 
                hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="text-2xl text-green-600 hover:scale-125 transition-all duration-300" />
              <a
                href="https://wa.me/3167969206"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Esteban'] text-gray-400 hover:scale-110 hover:animate-pulse transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario */}
          <form
            id="contact-form"
            action="https://formsubmit.co/solartedaniers@gmail.com"
            method="POST"
            className="flex flex-col gap-4 w-full max-w-md text-left"
          >
            {/* Email */}
            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              Email*
            </label>
            <div
              className="flex items-center gap-2 bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm 
                hover:border-yellow-500 focus-within:border-yellow-500 transition-all duration-300"
            >
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                placeholder="Ejemplo@gmail.com"
                className="bg-transparent w-full outline-none font-['Esteban'] placeholder-gray-400 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Nombre */}
            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              Nombre*
            </label>
            <div
              className="flex items-center gap-2 bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm 
                hover:border-yellow-500 focus-within:border-yellow-500 transition-all duration-300"
            >
              <FaUser className="text-gray-500" />
              <input
                type="text"
                placeholder="Xavier"
                className="bg-transparent w-full outline-none font-['Esteban'] placeholder-gray-400 text-black"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Contenido */}
            <label className="font-['Esteban'] text-lg text-black drop-shadow-[0_0_1px_red]">
              Contenido*
            </label>
            <textarea
              placeholder="Escriba aquí el motivo de su mensaje"
              className="bg-[#f5f5f5] p-3 rounded-xl border-2 border-red-600 shadow-sm w-full h-28 font-['Esteban'] 
                placeholder-gray-400 text-black 
                hover:border-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />

            {/* Botón */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#f5f5f5] px-6 py-3 rounded-full border-2 border-red-600 
                hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500 hover:scale-105 transition-all duration-300"
            >
              <FaPaperPlane className="text-black animate-pulse" />
              <span className="font-['Esteban'] text-black drop-shadow-[0_0_1px_#d4af37] hover:scale-105">
                Enviar
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
