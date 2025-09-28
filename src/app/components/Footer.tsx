"use client";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
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
      {/* Título */}
      <h2
        className="font-['Irish_Grover'] text-white text-4xl px-6 py-2 bg-red-600 rounded-xl shadow-md 
        transition-all duration-300 inline-block hover:bg-yellow-500 hover:text-black"
      >
        Pie de página
      </h2>

      {/* Botones de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4 mt-6 max-w-7xl mx-auto">
        {[
          "Bienvenidos",
          "Acerca de mí",
          "Lenguajes",
          "Mis Proyectos",
          "Testimonios",
          "CV",
          "Experiencia Académica y Laboral",
          "Mi Filosofía de Vida",
          "Contacto",
        ].map((text, i) => (
          <Link
            key={i}
            href={`#${text.toLowerCase().replace(/\s+/g, "")}`}
            className="flex justify-center items-center text-center bg-[#f5f5f5] rounded-3xl py-2 px-4 
            font-['Irish_Grover'] text-sm text-black drop-shadow-[0_0_2px_gold] shadow-md shadow-white 
            border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-red-600"
          >
            {text}
          </Link>
        ))}
      </div>

      {/* Créditos */}
      <div className="mt-8 text-lg font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105">
        © 2025 Daniers Alexander Solarte Limas - Ingeniero de Software  
        <br />
        Todos los derechos son reservados
      </div>

      {/* Frase destacada */}
      <p
        className="mt-6 font-['Labrada'] text-xl text-white transition-all duration-300 
        hover:text-[#C0C0C0] hover:drop-shadow-[0_0_6px_red] hover:-translate-y-1 hover:scale-105"
        style={{
          WebkitTextStroke: "0.5px #c4af37",
        }}
      >
        “La verdadera grandeza está en crecer sin perder los principios que nos definen.”
      </p>

      {/* Autoría */}
      <p
        className="mt-4 font-['Esteban'] text-gray-300 drop-shadow-[0_0_2px_red] transition-all duration-300 hover:scale-105 hover:rotate-1"
      >
        Portafolio creado con pasión por Daniers Solarte – 2025
      </p>

      {/* Redes Sociales */}
      <div className="flex justify-center gap-6 mt-8">
        {/* LinkedIn */}
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

        {/* WhatsApp */}
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

        {/* GitHub */}
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