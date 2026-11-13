"use client";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash, FaDownload } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

type CvContent = {
  background: string;
  video: string;
  title: string;
  pdf: string;
  downloadName: string;
  translations: {
    view: string;
    close: string;
    download: string;
  };
};

export default function CvSection() {
  const { theme } = useApp();
  const { content } = useContent();
  const [hoverVideo, setHoverVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cvWindowRef = useRef<Window | null>(null);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cvWindowRef.current && cvWindowRef.current.closed) {
        setCvOpen(false);
        cvWindowRef.current = null;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const c = content.cv as CvContent | undefined;
  if (!c) return null;

  const handleMouseEnter = () => {
    setHoverVideo(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHoverVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCvToggle = () => {
    if (cvOpen && cvWindowRef.current) {
      cvWindowRef.current.close();
      cvWindowRef.current = null;
      setCvOpen(false);
    } else {
      cvWindowRef.current = window.open(c.pdf, "_blank");
      setCvOpen(Boolean(cvWindowRef.current));
    }
  };

  const isDark = theme === "dark";
  const bgButton = isDark ? "bg-ink-raised" : "bg-paper";
  const textButton = isDark ? "text-paper" : "text-gray-700";
  const borderButton = isDark ? "border-gold-muted" : "border-red-600";
  const iconColor = isDark ? "text-gold-muted" : "text-red-600";

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center 
      py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center 
        px-6 py-3 mb-6 sm:mb-10 rounded-full font-irish
        bg-red-600 text-white shadow-lg hover:bg-gold-muted hover:text-black 
        hover:shadow-[0_0_25px_var(--gold-muted)] transition-all duration-500"
      >
        {c.title}
      </h2>

      <div
        className={`relative mt-4 sm:mt-6 md:mt-8 w-[160px] xs:w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] 
        aspect-[3/5] rounded-2xl overflow-hidden border-4 
        transition-all duration-500 hover:scale-105
        shadow-[0_0_25px_color-mix(in_srgb,var(--gold-muted)_50%,transparent)]
        ${hoverVideo ? "border-red-600" : "border-gold-muted"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={c.video}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={handleCvToggle}
        className={`mt-6 flex items-center justify-center gap-3 px-5 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base md:text-lg rounded-full border ${bgButton} ${borderButton}
        transition-all duration-500 hover:scale-105 shadow-[0_0_20px_color-mix(in_srgb,var(--gold-muted)_40%,transparent)]`}
      >
        {cvOpen ? (
          <FaEye className={`${iconColor} text-base sm:text-lg`} />
        ) : (
          <FaEyeSlash className={`${iconColor} text-base sm:text-lg`} />
        )}
        <span className={`font-esteban ${textButton} hover:text-gold-muted`}>
          {cvOpen ? c.translations.close : c.translations.view}
        </span>
      </button>

      <a
        href={c.pdf}
        download={c.downloadName}
        className={`mt-8 flex items-center justify-center gap-3 px-5 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base md:text-lg rounded-full border ${bgButton} ${borderButton}
        transition-all duration-500 hover:scale-105 shadow-[0_0_20px_color-mix(in_srgb,var(--gold-muted)_40%,transparent)]`}
      >
        <FaDownload className={`${iconColor} text-base sm:text-lg`} />
        <span className={`font-esteban ${textButton} hover:text-gold-muted`}>
          {c.translations.download}
        </span>
      </a>
    </section>
  );
}