"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useApp } from "./ThemeLangContext";
import { FaVolumeUp } from "react-icons/fa";

const translations = {
  es: {
    home: "Inicio",
    subtitle: "Ingeniero de Software",
    welcome: "Bienvenidos",
    description: [
      "Soy ingeniero de software y creo que la tecnología debe ir más allá de resolver problemas: debe transformar vidas.",
      "Me especializo en backend con Node.js, Spring Boot, Python y Java, y también disfruto los desafíos del frontend con React, Angular, Next.js y Tailwind CSS. Me apasiona crear aplicaciones seguras, escalables e intuitivas.",
      "Me inspiran la ciberseguridad, la inteligencia artificial y la realidad mixta, porque conectan lo digital con lo humano. <br />Te invito a explorar mi portafolio y descubrir cómo cada proyecto refleja mi pasión, mi aprendizaje y mi forma de ver el mundo del software.",
    ],
  },
  en: {
    home: "Home",
    subtitle: "Software Engineer",
    welcome: "Welcome",
    description: [
      "I am a software engineer and I believe technology should go beyond solving problems—it should transform lives.",
      "I specialize in backend with Node.js, Spring Boot, Python, and Java, and I also enjoy frontend challenges with React, Angular, Next.js, and Tailwind CSS. I’m passionate about building secure, scalable, and intuitive applications.",
      "I’m inspired by cybersecurity, artificial intelligence, and mixed reality because they connect the digital with the human. <br />I invite you to explore my portfolio and discover how each project reflects my passion, my learning, and my view of the software world.",
    ],
  },
};

export default function Welcome() {
  const router = useRouter();
  const { lang } = useApp();
  const t = translations[lang];
  const [hovered, setHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 🎵 Sonido de espada
  const playSwordSound = () => {
    const audio = new Audio("/sounds/sword.mp3");
    audio.play().catch((e) => console.error("Error al reproducir audio:", e));
  };

  // 🔘 Navegar al inicio
  const handleHomeClick = () => {
    playSwordSound();
    router.push("/");
  };

  // 🗣️ Narrar o detener el texto con voz masculina
  const toggleSpeech = () => {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = t.description.map((d) => d.replace(/<br\s*\/?>/gi, "")).join(" ");
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voices = synth.getVoices();
    const preferredLang = lang === "es" ? "es-ES" : "en-US";

    const maleVoice = voices.find(
      (v) =>
        v.lang === preferredLang &&
        /male|man|david|jorge|diego|miguel|pablo|john|mike/i.test(v.name)
    );

    const fallbackVoice = voices.find((v) => v.lang === preferredLang);
    utterance.voice = maleVoice ?? fallbackVoice ?? null;
    utterance.lang = preferredLang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
    setIsSpeaking(true);
  };

  // 🗣️ Asegurar que las voces estén disponibles
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start bg-cover bg-center px-4 py-6 sm:px-6 sm:py-10"
      style={{ backgroundImage: "url('/images/temple.webp')" }}
    >
      {/* 🔺 Botón Inicio */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1 bg-[#f5f5f5] px-1 py-0.5 rounded-lg shadow-md border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_4px_15px_rgba(218,165,32,0.6)]"
        onClick={handleHomeClick}
      >
        <div className="w-8 h-8 rounded-md overflow-hidden border-2 border-transparent transition-all duration-300">
          <Image
            src="/images/fire.webp"
            alt={t.home}
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-['Irish_Grover'] text-black text-sm drop-shadow-[0_0_1px_silver] hover:scale-110 hover:drop-shadow-[0_0_5px_red] transition-all duration-300">
          {t.home}
        </span>
      </div>

      {/* 🖼️ Imagen de perfil */}
      <div
        className={`rounded-full border-4 overflow-hidden w-48 h-48 sm:w-64 sm:h-64 mt-8 transition-all duration-500 ${
          hovered ? "scale-110 border-red-600" : "border-yellow-500"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src="/images/profile.webp"
          alt="Perfil"
          width={256}
          height={256}
          className={`w-full h-full object-cover ${hovered ? "animate-pulse" : ""}`}
        />
      </div>

      {/* 🧑 Nombre */}
      <h1 className="mt-6 font-['Irish_Grover'] text-2xl sm:text-3xl text-black drop-shadow-[0_0_2px_gold] hover:scale-110 hover:drop-shadow-[0_0_5px_red] transition-all duration-300 text-center cursor-pointer">
        Daniers Alexander Solarte Limas
      </h1>

      <hr className="w-1/2 border-t-2 border-black mt-4" />

      {/* 🧠 Subtítulo */}
      <h2 className="mt-2 font-['Esteban'] text-xl sm:text-2xl font-bold drop-shadow-[0_0_1px_gray] animate-pulse hover:animate-none hover:scale-105 transition-all duration-300 bg-white/60 px-1 py-1 rounded-xl text-stroke-silver text-center cursor-pointer">
        {t.subtitle}
      </h2>

      {/* 🎉 Bienvenida */}
      <h3 className="mt-6 font-['Irish_Grover'] text-2xl sm:text-4xl text-white bg-red-600/70 px-6 sm:px-10 py-3 rounded-full shadow-md hover:bg-[#d4af37] hover:text-black transition-all duration-300 text-center">
        {t.welcome}
      </h3>

      {/* 📜 Descripción con narración */}
      <div className="bg-[#f5f5f5] p-4 sm:p-6 rounded-2xl shadow-md border mt-6 w-full max-w-2xl relative hover:border-yellow-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <div
          className={`absolute top-2 right-2 transition-all duration-300 cursor-pointer ${
            isSpeaking ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={toggleSpeech}
        >
          <FaVolumeUp className="text-xl hover:scale-125 transition-transform duration-300" />
        </div>

        {t.description.map((text, i) => (
          <p
            key={i}
            className={`mt-${i === 0 ? "0" : "4"} font-['Esteban'] text-[#5c4c4c] text-base sm:text-lg leading-relaxed text-center`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>
    </section>
  );
}
