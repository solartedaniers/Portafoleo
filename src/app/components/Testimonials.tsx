"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";
import { useHasHover, useIsMobile } from "@/hooks/useMediaQuery";
import { TOUCH_FEEDBACK_MS } from "@/config/ui";

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

interface TestimonialsContent {
  title: string;
  seeMore: string;
  seeLess: string;
  background: string;
  list: Testimonial[];
}

const INITIAL_VISIBLE = 2;

function useTestimonialSelection() {
  const hasHover = useHasHover();
  const [selected, setSelected] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (!hasHover) {
      setTappedIndex(idx);
      setTimeout(() => setTappedIndex(null), TOUCH_FEEDBACK_MS.medium);
      return;
    }
    setSelected((current) => (current === idx ? null : idx));
  };

  return { selected, tappedIndex, handleSelect };
}

export default function Testimonials() {
  const { theme } = useApp();
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const { selected, tappedIndex, handleSelect } = useTestimonialSelection();

  const t = content.testimonials as TestimonialsContent | undefined;
  if (!t) return null;
  const testimonials = t.list ?? [];

  // El Render de cada tarjeta
  const renderCard = (testimonial: Testimonial, idx: number) => {
    const isSelected = selected === idx;
    const isTapped = tappedIndex === idx;

    return (
      <div
        key={idx}
        onClick={() => handleSelect(idx)}
        className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-5 sm:p-6 md:p-8 border-2 rounded-2xl w-full transition-all duration-500 cursor-pointer
          ${theme === "dark" ? "bg-ink-deep text-white" : "bg-paper text-black"}
          ${isSelected || isTapped
            ? "scale-[1.02] shadow-[0_0_25px_var(--gold-muted)] border-gold-muted"
            : "hover:scale-[1.02] hover:shadow-[0_0_25px_var(--gold-muted)] border-red-600"}
        `}
      >
        {/* Imagen del testimonio */}
        <div className="flex justify-center sm:justify-start w-full sm:w-auto">
          <div
            className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-[5px] overflow-hidden flex-shrink-0 transition-all duration-500
              ${isSelected || isTapped
                ? "border-red-600 translate-y-[-3px]"
                : "border-gold-muted hover:border-red-600 hover:-translate-y-1"}
            `}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 224px"
            />
          </div>
        </div>

        {/* Texto del testimonio */}
        <div
          className={`flex flex-col text-center sm:text-left transition-all duration-300 flex-1
            ${isSelected || isTapped
              ? "translate-y-[-2px] shadow-md"
              : "hover:-translate-y-1 hover:shadow-md"}
          `}
        >
          <h3
            className={`font-irish text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2
              ${theme === "dark" ? "text-white" : "text-black"}`}
            style={{
              WebkitTextStroke: "0.5px var(--gold)",
              textShadow: "0 0 4px var(--gold)",
            }}
          >
            {testimonial.name}
          </h3>
          <p
            className={`font-esteban text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify transition-colors duration-300
              ${theme === "dark"
                ? "text-gray-300 hover:text-gray-100"
                : "text-umber hover:text-black"}
            `}
          >
            {testimonial.text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat transition-colors duration-500 overflow-hidden"
      style={{
        backgroundImage: `url('${t.background}')`,
        backgroundBlendMode: theme === "dark" ? "multiply" : "normal",
        backgroundColor: theme === "dark" ? "color-mix(in srgb, var(--black) 40%, transparent)" : "transparent",
      }}
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-red-600/70 text-white font-irish
        px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-md
        hover:bg-gold-muted hover:text-black hover:shadow-[0_0_25px_var(--gold-muted)]
        transition-all duration-300 mb-10 sm:mb-12"
      >
        {t.title}
      </h2>

      {/* Lista de testimonios */}
      <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-[95%] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl px-2">
        {(isMobile ? testimonials.slice(0, visibleCount) : testimonials).map(renderCard)}
      </div>

      {/* Botón ver más / ver menos en móvil */}
      {isMobile && testimonials.length > INITIAL_VISIBLE && (
        <div className="mt-10 flex justify-center">
          {visibleCount >= testimonials.length ? (
            <button
              type="button"
              onClick={() => {
                setVisibleCount(INITIAL_VISIBLE);
                sectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 font-esteban text-sm sm:text-base transition-all duration-300 ${
                theme === "dark"
                  ? "border-gold-muted bg-ink text-white hover:bg-gold-muted hover:text-black"
                  : "border-red-600 bg-white text-black hover:bg-gold-muted hover:text-black"
              }`}
            >
              {t.seeLess}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE)}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 font-esteban text-sm sm:text-base transition-all duration-300 ${
                theme === "dark"
                  ? "border-gold-muted bg-ink text-white hover:bg-gold-muted hover:text-black"
                  : "border-red-600 bg-white text-black hover:bg-gold-muted hover:text-black"
              }`}
            >
              {t.seeMore}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
