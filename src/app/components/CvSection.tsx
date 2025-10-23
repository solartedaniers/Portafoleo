"use client";
import { useState, useRef } from "react";
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
  const [showCv, setShowCv] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!content?.cv) return null;
  const c = content.cv as CvContent;

  // 🟢 Hover Video
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

  // 🎨 Estilos por tema
  const isDark = theme === "dark";
  const bgButton = isDark ? "bg-[#222]" : "bg-[#f5f5f5]";
  const textButton = isDark ? "text-[#f5f5f5]" : "text-gray-700";
  const borderButton = isDark ? "border-[#c4af37]" : "border-red-600";
  const iconColor = isDark ? "text-[#c4af37]" : "text-red-600";

  return (
    <section
      id="cv"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      {/* 🔴 Título */}
      <h2
        className="text-3xl sm:text-4xl text-center px-6 py-3 rounded-full font-['Irish_Grover']
          bg-red-600 text-white shadow-lg hover:bg-[#c4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]
          transition-all duration-500"
      >
        {c.title}
      </h2>

      {/* 🎥 Video */}
      <div
        className={`relative mt-10 w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]
          aspect-[3/5] rounded-2xl overflow-hidden border-4 transition-all duration-500 hover:scale-105
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

      {/* 👁️ Botón Ver/Cerrar */}
      <button
        onClick={() => setShowCv(!showCv)}
        className={`mt-6 flex items-center justify-center gap-3 px-6 py-3 text-sm sm:text-base md:text-lg rounded-full border
          transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)] ${bgButton} ${borderButton}`}
      >
        {showCv ? <FaEye className={iconColor} /> : <FaEyeSlash className={iconColor} />}
        <span className={`font-esteban ${textButton} hover:text-[#c4af37]`}>
          {showCv ? c.translations.close : c.translations.view}
        </span>
      </button>

      {/* 📄 Vista PDF */}
      {showCv && (
        <div
          className={`mt-8 w-full max-w-[750px] aspect-[3/4] sm:aspect-[16/9] border-4 rounded-2xl shadow-[0_0_25px_#c4af37]
            overflow-hidden transition-all duration-500 ${isDark ? "border-[#c4af37]" : "border-red-600"}`}
        >
          <iframe src={c.pdf} className="w-full h-full" title="CV Preview" />
        </div>
      )}

      {/* ⬇️ Descargar PDF */}
      <a
        href={c.pdf}
        download={`CV_Danier_Solarte_${lang === "es" ? "ES" : "EN"}.pdf`}
        className={`mt-8 flex items-center justify-center gap-3 px-6 py-3 text-sm sm:text-base md:text-lg rounded-full border
          transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)] ${bgButton} ${borderButton}`}
      >
        <FaDownload className={iconColor} />
        <span className={`font-esteban ${textButton} hover:text-[#c4af37]`}>
          {c.translations.download}
        </span>
      </a>
    </section>
  );
}
