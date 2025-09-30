"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";

export default function Testimonials() {
  const { lang } = useApp();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selected, setSelected] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const translations = {
    es: {
      title: "Testimonios",
      name: "Danier Fernando",
      text: "Trabajar con Daniers Solarte ha sido una experiencia inspiradora. Su pasión por la tecnología, su compromiso con la calidad y su capacidad para convertir ideas en soluciones innovadoras lo convierten en un profesional excepcional.",
      more: "Ver más",
      less: "Ver menos",
    },
    en: {
      title: "Testimonials",
      name: "Danier Fernando",
      text: "Working with Daniers Solarte has been an inspiring experience. His passion for technology, commitment to quality, and ability to turn ideas into innovative solutions make him an exceptional professional.",
      more: "See more",
      less: "See less",
    },
  };

  const t = translations[lang];

  const testimonials = Array(4).fill({
    name: t.name,
    text: t.text,
    image: "/images/Daniel.jpg",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);
    }
  }, []);

  const renderCard = (testimonial: typeof testimonials[0], idx: number) => (
    <div
      key={idx}
      className={`bg-[#f5f5f5] rounded-2xl p-6 flex items-start gap-6 border-2 transition-all duration-500 cursor-pointer ${
        selected === idx
          ? "scale-[1.02] shadow-[0_0_25px_#c4af37] border-gold"
          : "hover:scale-[1.02] hover:shadow-[0_0_25px_#c4af37] border-red-600"
      }`}
      onClick={() => setSelected(selected === idx ? null : idx)}
    >
      {/* Imagen circular más redondeada */}
      <div
        className={`relative w-24 h-24 rounded-full overflow-hidden border-[2.5px] transition-all duration-500 ${
          selected === idx
            ? "border-red-600 scale-110"
            : "border-[#c4af37] hover:scale-105 hover:border-red-600"
        }`}
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
          className={`mt-2 font-esteban text-[#5c4c4c] text-justify transition-all duration-300 ${
            selected === idx
              ? "translate-y-1 shadow-[0_0_20px_rgba(100,100,100,0.4)]"
              : "hover:translate-y-1 hover:shadow-[0_0_20px_rgba(100,100,100,0.4)]"
          }`}
        >
          {testimonial.text}
        </p>
      </div>
    </div>
  );

  const showLess = () => {
    setVisibleCount(2);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showMore = () => setVisibleCount((prev) => prev + 2);
  const showAll = visibleCount >= testimonials.length;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/parchment.jpg')" }}
    >
      {/* 🔴 Título */}
      <h2 className="text-4xl text-center px-6 py-3 rounded-full shadow-md transition-all duration-300 bg-red-600/60 text-white font-['Irish_Grover'] hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
        {t.title}
      </h2>

      {/* 🟨 Testimonios */}
      <div className="flex flex-col gap-10 w-full max-w-4xl mt-10">
        {(isMobile ? testimonials.slice(0, visibleCount) : testimonials).map(
          (testimonial, idx) => renderCard(testimonial, idx)
        )}
      </div>

      {/* 🟦 Botones Ver más / Ver menos en móviles */}
      {isMobile && (
        <div className="mt-10">
          {!showAll ? (
            <button
              onClick={showMore}
              className="px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_25px_#c4af37] border-2 border-red-600 bg-white font-esteban text-black text-lg"
              style={{
                WebkitTextStroke: "0.4px #c4af37",
                fontFamily: "'Esteban', serif",
              }}
            >
              {t.more}
            </button>
          ) : (
            <button
              onClick={showLess}
              className="px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_25px_#c4af37] border-2 border-red-600 bg-white font-esteban text-black text-lg"
              style={{
                WebkitTextStroke: "0.4px #c4af37",
                fontFamily: "'Esteban', serif",
              }}
            >
              {t.less}
            </button>
          )}
        </div>
      )}
    </section>
  );
}