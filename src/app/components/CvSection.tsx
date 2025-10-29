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
  translations: {
    view: string;
    close: string;
    download: string;
  };
};

export default function CvSection() {
  const { lang, theme } = useApp();
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

  if (!content?.cv) return null;
  const c = content.cv as CvContent;

  const handleMouseEnter = () => {
    setHoverVideo(true);
    videoRef.current?.play();
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
      setCvOpen(true);
    }
  };

  const isDark = theme === "dark";
  const bgButton = isDark ? "bg-[#222]" : "bg-[#f5f5f5]";
  const textButton = isDark ? "text-[#f5f5f5]" : "text-gray-700";
  const borderButton = isDark ? "border-[#c4af37]" : "border-red-600";
  const iconColor = isDark ? "text-[#c4af37]" : "text-red-600";

  return (
    <section
      id="cv"
      className="relative w-full min-h-screen flex flex-col items-center justify-center 
      py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center 
        px-6 py-3 mb-6 sm:mb-10 rounded-full font-['Irish_Grover']
        bg-red-600 text-white shadow-lg hover:bg-[#c4af37] hover:text-black 
        hover:shadow-[0_0_25px_#c4af37] transition-all duration-500"
      >
        {c.title}
      </h2>

      <div
        className={`relative mt-4 sm:mt-6 md:mt-8 w-[160px] xs:w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] 
        aspect-[3/5] rounded-2xl overflow-hidden border-4 
        transition-all duration-500 hover:scale-105
        shadow-[0_0_25px_rgba(196,175,55,0.5)]
        ${hoverVideo ? "border-red-600" : "border-[#c4af37]"}`}
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
        onClick={handleCvToggle}
        className={`mt-6 flex items-center justify-center gap-3 px-5 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base md:text-lg rounded-full border ${bgButton} ${borderButton}
        transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]`}
      >
        {cvOpen ? (
          <FaEye className={`${iconColor} text-base sm:text-lg`} />
        ) : (
          <FaEyeSlash className={`${iconColor} text-base sm:text-lg`} />
        )}
        <span className={`font-['Esteban'] ${textButton} hover:text-[#c4af37]`}>
          {cvOpen ? c.translations.close : c.translations.view}
        </span>
      </button>

      <a
        href={c.pdf}
        download={`CV_Danier_Solarte_${lang === "es" ? "ES" : "EN"}.pdf`}
        className={`mt-8 flex items-center justify-center gap-3 px-5 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base md:text-lg rounded-full border ${bgButton} ${borderButton}
        transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]`}
      >
        <FaDownload className={`${iconColor} text-base sm:text-lg`} />
        <span className={`font-['Esteban'] ${textButton} hover:text-[#c4af37]`}>
          {c.translations.download}
        </span>
      </a>
    </section>
  );
}