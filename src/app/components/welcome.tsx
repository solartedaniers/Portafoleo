"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";
import { useContent } from "./ContentProvider";

function useRotation3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height, left, top } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setRotation({ x: y * 20, y: x * 20 });
  };

  const onMouseLeave = () => setRotation({ x: 0, y: 0 });
  return { rotation, containerRef, onMouseMove, onMouseLeave };
}

function useSpeechSynthesis(textArray: string[], lang: string) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleSpeech = () => {
    const text = textArray.join(" ");
    const synth = window.speechSynthesis;
    if (!text) return;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voices = synth.getVoices();
    const preferredLang = lang === "es" ? "es-ES" : "en-US";
    const maleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith(lang) &&
          /male|man|david|jorge|john|mike|daniel/i.test(v.name)
      ) ?? voices.find((v) => v.lang.startsWith(lang));

    utterance.voice = maleVoice ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
    setIsSpeaking(true);
  };

  return { isSpeaking, toggleSpeech };
}

interface WelcomeLang {
  home: string;
  subtitle: string;
  welcomeTitle: string;
  description: string[];
}
interface WelcomeData {
  welcome: WelcomeLang;
}

export default function Welcome() {
  const router = useRouter();
  const { lang, theme } = useApp();
  const { content, loading } = useContent();
  const t = (content as WelcomeData | null)?.welcome;

  const { rotation, containerRef, onMouseMove, onMouseLeave } = useRotation3D();
  const { isSpeaking, toggleSpeech } = useSpeechSynthesis(
    t?.description ?? [],
    lang
  );
  const [hovered, setHovered] = useState(false);

  const playSwordSound = () =>
    new Audio("/sounds/sword.mp3").play().catch(() => {});
  const handleHomeClick = () => {
    playSwordSound();
    router.push("/");
  };

  if (loading || !t)
    return <p className="text-center py-10">Cargando contenido...</p>;

  const bgBox =
    theme === "dark" ? "bg-black text-white" : "bg-[#f5f5f5] text-[#5c4c4c]";
  const bgWhiteBox =
    theme === "dark" ? "bg-black/70 text-white" : "bg-white/60 text-black";
  const hrColor = theme === "dark" ? "border-white" : "border-black";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-3 sm:px-6 md:px-10 py-8 sm:py-12 transition-all duration-700 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/images/temple.webp')" }}
    >
      {/* Botón Home */}
      <div
        aria-label="Home"
        className={`absolute flex items-center gap-2 rounded-lg shadow-md border cursor-pointer transition-all duration-300
          hover:scale-105 hover:shadow-[0_4px_15px_rgba(218,165,32,0.6)]
          ${bgBox}
          top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-6
          px-2 sm:px-3 py-1 sm:py-2
        `}
        style={{
          zIndex: 20, 
          pointerEvents: "auto",
          backdropFilter: "blur(2px)",
        }}
        onClick={handleHomeClick}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md overflow-hidden border-2 border-transparent transition-all duration-300">
          <Image
            src="/images/fire.webp"
            alt={t.home}
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-['Irish_Grover'] text-xs sm:text-sm drop-shadow-[0_0_1px_silver] whitespace-nowrap">
          {t.home}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative flex justify-center items-center"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className={`rounded-full border-[4px] overflow-hidden 
            w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 
            shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 
            ${hovered ? "scale-110 border-red-600" : "border-yellow-500"}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setTimeout(() => setHovered(false), 400)}
        >
          <Image
            src="/images/profile.webp"
            alt="Perfil"
            width={256}
            height={256}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
      {/* Nombre lo dejo porque pues ese no va a cambiar por eso esta literal hay*/}
      <h1
        className={`font-['Irish_Grover'] text-center drop-shadow-[0_0_2px_gold] hover:scale-110 hover:drop-shadow-[0_0_5px_red] transition-all duration-300 cursor-pointer 
        ${theme === "dark" ? "text-white" : "text-black"}
        text-lg sm:text-2xl md:text-3xl lg:text-4xl px-4`}
      >
        Daniers Alexander Solarte Limas
      </h1>

      <hr
        className={`w-3/4 sm:w-2/3 md:w-1/2 border-t-2 transition-colors duration-500 ${hrColor}`}
      />

      <h2
        className={`font-['Esteban'] text-center font-bold drop-shadow-[0_0_1px_gray] px-3 py-1 rounded-xl cursor-pointer transition-all duration-500 ${bgWhiteBox} animate-pulse 
        text-sm sm:text-base md:text-lg lg:text-xl`}
      >
        {t.subtitle}
      </h2>

      <h3
        className={`font-['Irish_Grover'] text-center px-4 sm:px-6 md:px-10 py-2 sm:py-3 rounded-full shadow-md transition-all duration-300 
        ${theme === "dark" ? "bg-red-800/80 text-white" : "bg-red-600/70 text-white"} 
        hover:bg-[#d4af37] hover:text-black 
        text-base sm:text-lg md:text-2xl lg:text-3xl`}
      >
        {t.welcomeTitle}
      </h3>

      {/* Descripción con narrador */}
      <div
        className={`relative p-3 sm:p-4 md:p-6 rounded-2xl shadow-md border w-full max-w-[95%] sm:max-w-lg md:max-w-2xl lg:max-w-3xl 
        hover:border-yellow-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-500 ${bgBox}`}
      >
        <div
          aria-label="Toggle speech"
          className={`absolute top-2 right-2 transition-all duration-300 cursor-pointer ${
            isSpeaking ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={toggleSpeech}
        >
          <FaVolumeUp className="text-lg sm:text-xl md:text-2xl hover:scale-125 transition-transform duration-300" />
        </div>

        {t.description.map((text, i) => (
          <p
            key={i}
            className="mt-3 font-['Esteban'] text-center leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>
    </section>
  );
}
