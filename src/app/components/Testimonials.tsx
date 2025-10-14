"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// ✅ Tipos
interface Testimonial {
  name: string;
  text: { es: string; en: string };
  image: string;
}

interface TestimonialsContent {
  title: { es: string; en: string };
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

  // ✅ Hook siempre en la raíz
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  if (!content?.testimonials) return null;
  const t = content.testimonials as TestimonialsContent;
  const testimonials = t.list;

  const renderCard = (testimonial: Testimonial, idx: number) => {
    const isSelected = selected === idx;
    const handleInteraction = () => {
      if (!hasHover) {
        setSelected(isSelected ? null : idx);
        setTimeout(() => setSelected(null), 1500);
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
          isSelected
            ? "scale-[1.02] shadow-[0_0_25px_#c4af37] border-gold"
            : "hover:scale-[1.02] hover:shadow-[0_0_25px_#c4af37] border-red-600"
        }`}
      >
        {!isMobile && (
          <div
            className={`relative w-28 h-28 rounded-full border-[3px] overflow-hidden transition-all duration-500 ${
              isSelected ? "border-red-600 scale-110" : "border-[#c4af37]"
            }`}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover rounded-full"
              sizes="112px"
            />
          </div>
        )}

        <div className="flex flex-col">
          <h3 className="font-['Irish_Grover'] text-2xl text-black">
            {testimonial.name}
          </h3>
          <p className="mt-2 font-['Esteban'] text-[#5c4c4c] text-justify">
            {testimonial.text[lang]}
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
      <h2 className="text-4xl text-center bg-red-600/60 text-white font-['Irish_Grover'] px-6 py-3 rounded-full shadow-md">
        {t.title[lang]}
      </h2>

      <div className="flex flex-col gap-10 w-full max-w-4xl mt-10">
        {(isMobile ? testimonials.slice(0, visibleCount) : testimonials).map(
          (testimonial, idx) => renderCard(testimonial, idx)
        )}
      </div>

      {isMobile && (
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