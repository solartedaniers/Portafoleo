"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// ✅ Tipos
interface Testimonial {
  name: string;
  text: string;
  image: string;
}

interface TestimonialsContent {
  title: string;
  list: Testimonial[];
}

export default function Testimonials() {
  const { lang } = useApp();
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selected, setSelected] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasHover, setHasHover] = useState(true);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  if (!content?.testimonials) return null;
  const t = content.testimonials as TestimonialsContent;
  const testimonials = t.list ?? [];

  const renderCard = (testimonial: Testimonial, idx: number) => {
    const isSelected = selected === idx;
    const isTapped = tappedIndex === idx;

    const handleInteraction = () => {
      if (!hasHover) {
        setTappedIndex(idx);
        setTimeout(() => setTappedIndex(null), 800);
      } else {
        setSelected(isSelected ? null : idx);
      }
    };

    return (
      <div
        key={idx}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className={`bg-[#f5f5f5] rounded-2xl p-6 flex items-start gap-6 border-2 transition-all duration-500 cursor-pointer ${
          isSelected || isTapped
            ? "scale-[1.02] shadow-[0_0_25px_#c4af37] border-gold"
            : "hover:scale-[1.02] hover:shadow-[0_0_25px_#c4af37] border-red-600"
        }`}
      >
        {!isMobile && (
          <div
            className={`flex-shrink-0 relative w-28 h-28 rounded-full border-[3px] overflow-hidden transition-all duration-500 ${
              isSelected || isTapped
                ? "border-red-600 translate-y-[-4px]"
                : "border-[#c4af37] hover:border-red-600 hover:-translate-y-1"
            }`}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover rounded-full transition-all duration-300"
              sizes="112px"
            />
          </div>
        )}

        <div
          className={`flex flex-col transition-all duration-300 ${
            isSelected || isTapped
              ? "translate-y-[-2px] shadow-md"
              : "hover:-translate-y-1 hover:shadow-md"
          }`}
        >
          <h3
            className="font-['Irish_Grover'] text-black text-2xl animate-blink"
            style={{
              WebkitTextStroke: "0.5px #d4af37",
              textShadow: "0 0 4px #d4af37",
            }}
          >
            {testimonial.name}
          </h3>
          <p className="mt-2 font-['Esteban'] text-[#5c4c4c] text-justify">
            {testimonial.text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center py-16 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/parchment.webp')" }}
    >
      {/* 🔴 Título */}
      <h2 className="text-4xl text-center bg-red-600/60 text-white font-['Irish_Grover'] px-6 py-3 rounded-full shadow-md">
        {t.title}
      </h2>

      {/* 🧾 Lista de testimonios */}
      <div className="flex flex-col gap-10 w-full max-w-4xl mt-10">
        {(isMobile ? testimonials.slice(0, visibleCount) : testimonials).map(
          (testimonial, idx) => renderCard(testimonial, idx)
        )}
      </div>

      {/* 📱 Botón ver más / ver menos en móvil */}
      {isMobile && testimonials.length > 2 && (
        <div className="mt-10">
          {visibleCount >= testimonials.length ? (
            <button
              onClick={() => {
                setVisibleCount(2);
                sectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full border-2 border-red-600 bg-white font-['Esteban'] text-black"
            >
              {lang === "es" ? "Ver menos" : "See less"}
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="px-6 py-3 rounded-full border-2 border-red-600 bg-white font-['Esteban'] text-black"
            >
              {lang === "es" ? "Ver más" : "See more"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}