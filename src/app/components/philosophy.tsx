"use client";
import { useState, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

interface FilosofiaData {
  title: string;
  text: string[];
  image: string;
  background: string;
}

export default function Filosofia() {
  const { lang, theme } = useApp();
  const { content } = useContent();

  const data = content?.filosofia as FilosofiaData | undefined;
  const [speaking, setSpeaking] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches);
      window.speechSynthesis?.getVoices();
    }
  }, []);

  const speakText = () => {
    if (!data || typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(data.text.join(" "));
    const voices = synth.getVoices();
    const preferredLang = lang === "es" ? "es-ES" : "en-US";

    const maleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith(lang) &&
          /male|man|david|jorge|diego|pablo|john|mike|brian|daniel/i.test(v.name)
      ) ?? voices.find((v) => v.lang.startsWith(lang));

    utterance.voice = maleVoice ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    synth.speak(utterance);
  };

  const handleTouch = () => {
    if (isTouchDevice) {
      setHovered(true);
      setTimeout(() => setHovered(false), 400);
    }
  };

  const handleIconTouch = () => {
    if (isTouchDevice) {
      setIconHovered(true);
      setTimeout(() => setIconHovered(false), 400);
    }
  };

  if (!data) return null;

  const bgColor = theme === "dark" ? "bg-[#111]" : "bg-[#f5f5f5]";
  const textColor = theme === "dark" ? "text-[#e6e6e6]" : "text-[#5c4c4c]";

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url('${data.background}')` }}
    >
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "bg-black/50" : "bg-white/40"
        } z-0`}
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10 mt-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500 bg-red-600 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#d4af37]">
          {data.title}
        </h2>

        <div
          className={`relative w-full ${bgColor} rounded-2xl shadow-[0_0_20px_#d4af37] p-6 sm:p-8 md:p-10 transition-all duration-500 border-4 border-transparent flex flex-col md:flex-row items-center gap-8 ${
            hovered ? "scale-105 border-red-600 shadow-[0_0_30px_#d4af37]" : ""
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={handleTouch}
        >
          {/* Botón de lectura en voz alta */}
          <button
            onClick={speakText}
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            onTouchStart={handleIconTouch}
            className={`absolute top-3 right-3 transition-all duration-300 hover:scale-125 ${
              speaking || iconHovered
                ? "text-blue-600 drop-shadow-[0_0_10px_#3b82f6]"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            <FaVolumeUp size={28} />
          </button>

          {/* Imagen decorativa */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden border-[3px] border-[#d4af37] shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-black hover:border-red-600">
              <Image
                src={data.image}
                alt="Filosofía"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto descriptivo */}
          <div className="relative w-full md:w-1/2 md:pr-10">
            <div
              className={`text-base sm:text-lg md:text-xl leading-relaxed font-['Esteban'] ${textColor} transition-all duration-300 hover:tracking-wide text-justify md:-translate-x-3`}
            >
              {data.text.map((p, i) => (
                <p key={i} className="mb-4 hover:text-red-600">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
