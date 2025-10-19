"use client";
import { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaDownload } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

type CvContent = {
  background: string;
  video: string;
  title: string;
  pdf: string; // ✅ Ahora solo un string, no { es, en }
  translations: {
    view: string;
    close: string;
    download: string;
  };
};

export default function CvSection() {
  const { lang } = useApp();
  const { content } = useContent();
  const [showCv, setShowCv] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hoverVideo, setHoverVideo] = useState(false);

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

  return (
    <section
      id="cv"
      className="relative w-full min-h-screen flex flex-col items-center py-24 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      {/* 🔴 Título */}
      <h2 className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
        {c.title}
      </h2>

      {/* 🎥 Video */}
      <div
        className={`relative mt-10 w-[260px] md:w-[320px] h-[500px] aspect-video rounded-2xl overflow-hidden border-4 transition-all duration-500 hover:scale-105 ${
          hoverVideo ? "border-red-600" : "border-[#c4af37]"
        } shadow-[0_0_30px_rgba(196,175,55,0.5)]`}
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
        className="mt-6 flex items-center gap-3 px-6 py-3 rounded-full bg-[#f5f5f5] border-2 border-red-600 transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]"
      >
        {showCv ? (
          <FaEye className="text-[#c4af37]" />
        ) : (
          <FaEyeSlash className="text-red-600" />
        )}
        <span className="font-esteban text-gray-600 hover:text-[#c4af37] transition-all duration-300">
          {showCv ? c.translations.close : c.translations.view}
        </span>
      </button>

      {/* 📄 Vista PDF */}
      {showCv && (
        <div className="mt-6 w-[90%] md:w-[60%] h-[500px] border-4 border-red-600 rounded-2xl shadow-[0_0_25px_#c4af37] overflow-hidden">
          <iframe src={c.pdf} className="w-full h-full" title="CV Preview" />
        </div>
      )}

      {/* ⬇️ Descargar PDF */}
      <a
        href={c.pdf}
        download={`CV_Danier_Solarte_${lang === "es" ? "ES" : "EN"}.pdf`}
        className="mt-6 flex items-center gap-3 px-6 py-3 rounded-full bg-[#f5f5f5] border-2 border-red-600 transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]"
      >
        <FaDownload className="text-red-600" />
        <span className="font-esteban text-gray-600 hover:text-[#c4af37] transition-all duration-300">
          {c.translations.download}
        </span>
      </a>
    </section>
  );
}
