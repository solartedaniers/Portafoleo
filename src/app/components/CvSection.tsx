"use client";
import { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaDownload } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

// ✅ Tipo fuerte del contenido JSON
type CvContent = {
  background: string;
  video: string;
  pdf: string;
  title: string;
  translations: {
    view: { es: string; en: string };
    close: { es: string; en: string };
    download: { es: string; en: string };
  };
};

export default function CvSection() {
  const { lang } = useApp();
  const { content } = useContent();
  const [showCv, setShowCv] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hoverVideo, setHoverVideo] = useState(false);

  // 🧠 Si el JSON no está cargado, no renderizamos nada
  if (!content?.cv) return null;
  const c = content.cv as CvContent;

  const handleMouseEnter = () => {
    setHoverVideo(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setHoverVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const t = {
    view: c.translations.view[lang],
    close: c.translations.close[lang],
    download: c.translations.download[lang],
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center py-24 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url('${c.background}')` }}
    >
      {/* 🔴 Título fijo "CV" */}
      <h2 className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
        {c.title}
      </h2>

      {/* 🎥 Video con hover para reproducir */}
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

      {/* 👁️ Botón Ver/Cerrar CV */}
      <button
        onClick={() => setShowCv(!showCv)}
        className="mt-6 flex items-center gap-3 px-6 py-3 rounded-full bg-[#f5f5f5] border-2 border-red-600 transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]"
      >
        {showCv ? (
          <FaEye className="text-[#c4af37] transition-transform duration-500 transform scale-110" />
        ) : (
          <FaEyeSlash className="text-red-600 transition-transform duration-500 transform scale-110" />
        )}
        <span className="font-esteban text-gray-600 transition-all duration-300 hover:text-[#c4af37] hover:drop-shadow-[0_0_6px_rgba(196,175,55,0.6)]">
          {showCv ? t.close : t.view}
        </span>
      </button>

      {/* 📄 Ventana emergente para ver el CV */}
      {showCv && (
        <div className="mt-6 w-[90%] md:w-[60%] h-[500px] border-4 border-red-600 rounded-2xl shadow-[0_0_25px_#c4af37] overflow-hidden">
          <iframe src={c.pdf} className="w-full h-full" title="CV Preview" />
        </div>
      )}

      {/* ⬇️ Botón Descargar */}
      <a
        href={c.pdf}
        download="CV_Danier_Solarte.pdf"
        className="mt-6 flex items-center gap-3 px-6 py-3 rounded-full bg-[#f5f5f5] border-2 border-red-600 transition-all duration-500 hover:scale-105 shadow-[0_0_20px_rgba(196,175,55,0.4)]"
      >
        <FaDownload className="text-red-600" />
        <span className="font-esteban text-gray-600 transition-all duration-300 hover:text-[#c4af37] hover:drop-shadow-[0_0_6px_rgba(196,175,55,0.6)]">
          {t.download}
        </span>
      </a>
    </section>
  );
}
