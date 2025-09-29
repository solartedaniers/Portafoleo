"use client";
import { useState } from "react";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";

export default function Testimonials() {
  const { lang } = useApp();
  const [selected, setSelected] = useState<number | null>(null);

  const translations = {
    es: {
      title: "Testimonios",
      name: "Danier Fernando",
      text: "Trabajar con Daniers Solarte ha sido una experiencia inspiradora. Su pasión por la tecnología, su compromiso con la calidad y su capacidad para convertir ideas en soluciones innovadoras lo convierten en un profesional excepcional.",
    },
    en: {
      title: "Testimonials",
      name: "Danier Fernando",
      text: "Working with Daniers Solarte has been an inspiring experience. His passion for technology, commitment to quality, and ability to turn ideas into innovative solutions make him an exceptional professional.",
    },
  };

  const t = translations[lang];

  const testimonials = Array(4).fill({
    name: t.name,
    text: t.text,
    image: "/images/Daniel.jpg",
  });

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/parchment.jpg')" }}
    >
      {/* 🔴 Título */}
      <h2 className="text-4xl text-center px-6 py-3 rounded-full shadow-md transition-all duration-300
           bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
        {t.title}
      </h2>

      {/* 🟨 Cuadros de testimonios */}
      <div className="flex flex-col gap-10 w-full max-w-4xl mt-10">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className={`bg-[#f5f5f5] rounded-2xl p-6 flex items-start gap-6 border-2 transition-all duration-500 cursor-pointer
              ${selected === idx ? "scale-[1.02] shadow-[0_0_25px_#c4af37] border-gold" : "hover:scale-[1.02] hover:shadow-[0_0_25px_#c4af37] border-red-600"}`}
            onClick={() => setSelected(selected === idx ? null : idx)}
          >
            {/* Imagen circular */}
            <div
              className={`relative w-30 aspect-square rounded-full overflow-hidden border-4 transition-all duration-500
                ${selected === idx ? "border-red-600 scale-110" : "border-[#c4af37] hover:scale-105 hover:border-red-600"}`}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col">
              <h3
                className="font-irishgrover text-2xl text-black transition-all duration-300 hover:text-[#c4af37] cursor-pointer animate-pulse"
                style={{
                  WebkitTextStroke: "1px #c4af37",
                }}
              >
                {testimonial.name}
              </h3>

              <p
                className={`mt-2 font-esteban text-[#5c4c4c] text-justify transition-all duration-300
                  ${selected === idx ? "translate-y-1 shadow-[0_0_20px_rgba(100,100,100,0.4)]" : "hover:translate-y-1 hover:shadow-[0_0_20px_rgba(100,100,100,0.4)]"}`}
              >
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}