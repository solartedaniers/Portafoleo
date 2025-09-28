"use client";
import { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [selected, setSelected] = useState<number | null>(null);

  const testimonials = Array(4).fill({
    name: "Danier Fernando",
    text: "Trabajar con Daniers Solarte ha sido una experiencia inspiradora. Su pasión por la tecnología, su compromiso con la calidad y su capacidad para convertir ideas en soluciones innovadoras lo convierten en un profesional excepcional.",
    image: "/images/Daniel.jpg",
  });

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/parchment.jpg')" }}
    >
      {/* 🔴 Título */}
      <h2 className="text-4xl md:text-5xl font-irishgrover text-white px-8 py-3 rounded-full bg-red-600/80 shadow-lg transition-all hover:bg-[#c4af37] mb-16">
        Testimonios
      </h2>

      {/* 🟨 Cuadros de testimonios */}
      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#f5f5f5] rounded-2xl p-6 flex items-start gap-6 border-2 border-red-600 shadow-md transition-all duration-500 hover:shadow-[0_0_25px_#c4af37]"
          >
            {/* Imagen circular completamente redonda */}
            <div
              className={`relative w-30 aspect-square rounded-full overflow-hidden border-4 transition-all duration-500 cursor-pointer ${
                selected === idx
                  ? "border-red-600 scale-110"
                  : "border-[#c4af37] hover:scale-105 hover:border-red-600"
              }`}
              onClick={() =>
                setSelected(selected === idx ? null : idx)
              }
            >
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col">
              {/* Nombre con parpadeo */}
              <h3
                className="font-irishgrover text-2xl text-black transition-all duration-300 hover:text-[#c4af37] cursor-pointer animate-pulse"
                style={{
                  WebkitTextStroke: "1px #c4af37",
                }}
              >
                {t.name}
              </h3>

              {/* Testimonio con sombreado gris al seleccionar */}
              <p
                className={`mt-2 font-esteban text-[#5c4c4c] text-justify transition-all duration-300 ${
                  selected === idx
                    ? "scale-[1.02] shadow-[0_0_15px_rgba(100,100,100,0.3)]"
                    : ""
                }`}
                onClick={() =>
                  setSelected(selected === idx ? null : idx)
                }
              >
                {t.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}