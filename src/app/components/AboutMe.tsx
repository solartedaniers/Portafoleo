"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaVolumeUp } from "react-icons/fa";
import { useApp } from "./ThemeLangContext";

interface AboutItem {
  img: string;
  text: { es: string; en: string };
  audio: string;
}

export default function AboutMe() {
  const { lang } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasHover, setHasHover] = useState(true);

  // ✅ Detectar si el dispositivo tiene hover real
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover)");
      setHasHover(mq.matches);
    }
  }, []);

  const items: AboutItem[] = [
    {
      img: "/images/family.webp",
      text: {
        es: "Me encanta salir a pasear con mi familia y pasar tiempo con mi hermana. A mi juicio, esos instantes simples son muy valiosos, ya que nos hacen recordar lo fundamental que es gozar de la compañía de aquellos a quienes más queremos",
        en: "I love going out with my family and spending time with my sister. In my view, those simple moments are very valuable, reminding us how important it is to enjoy the company of those we love most.",
      },
      audio: "/sounds/family.mp3",
    },
    {
      img: "/images/motorcycle.webp",
      text: {
        es: "Me encanta viajar en moto, recorrer nuevos lugares. Porque cada viaje es una oportunidad para descubrir paisajes, culturas y formas de pensar que me enriquecen y me ayudan a crecer.",
        en: "I love traveling by motorcycle and exploring new places. Every trip is a chance to discover landscapes, cultures, and ways of thinking that enrich me and help me grow.",
      },
      audio: "/sounds/motorcycle.mp3",
    },
    {
      img: "/images/group.webp",
      text: {
        es: "Me gusta jugar microfútbol con amigos, no en torneos, sino como un espacio para compartir, reír y desconectarme. También practico taekwondo, camino o corro con frecuencia, porque me gusta mantenerme activo y sentir la energía del movimiento.",
        en: "I enjoy playing soccer with friends—not in tournaments, but as a space to share, laugh, and disconnect. I also practice taekwondo, walk or run often, because I like staying active and feeling the energy of movement.",
      },
      audio: "/sounds/group.mp3",
    },
    {
      img: "/images/paragliding.webp",
      text: {
        es: "Las montañas y los deportes extremos me apasionan, porque ahí encuentro tanto paz como adrenalina. Me gusta sentir ese impulso de libertad y desafío que me recuerda que la vida también está hecha para atreverse.",
        en: "I'm passionate about mountains and extreme sports because they offer both peace and adrenaline. I love the feeling of freedom and challenge that reminds me life is also about daring.",
      },
      audio: "/sounds/paragliding.mp3",
    },
    {
      img: "/images/Bible.webp",
      text: {
        es: "Me gusta leer la Biblia, conversar y compartir con personas que me inspiran. Disfruto estar activo y ayudar a los demás, porque creo que crecer como persona es un camino que se construye con humildad y sabiendo escuchar.",
        en: "I enjoy reading the Bible, talking and sharing with people who inspire me. I like staying active and helping others, because I believe personal growth is built with humility and the ability to listen.",
      },
      audio: "/sounds/bible.mp3",
    },
  ];

  // 🎙️ Voz
  const speakText = (text: string, index: number) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
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

    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);

    synth.speak(utterance);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // 🧠 Función para activar "hover simulado" en móviles
  const handleTouch = (index: number) => {
    if (!hasHover) {
      setHoveredIndex(index);
      setTimeout(() => setHoveredIndex(null), 1200);
    }
  };

  return (
    <section className="w-full text-black overflow-x-hidden">
      {/* 🌲 Fondo superior */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest-2.webp')" }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          <h2
            className="text-2xl sm:text-4xl text-center mb-10 px-4 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-500
                       bg-red-600/60 text-white hover:bg-[#d4af37] hover:text-black font-['Irish_Grover']"
          >
            {lang === "es" ? "Acerca de mí" : "About Me"}
          </h2>

          {/* Primeros 2 ítems */}
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                onTouchStart={() => handleTouch(i)}
                className={`relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 w-full shadow-lg ${
                  hoveredIndex === i
                    ? "scale-105 border-2 border-[#c4af37]"
                    : "hover:scale-105"
                }`}
                style={{ boxShadow: "0px 4px 20px #c4af37" }}
              >
                {/* Icono de audio */}
                <div
                  onClick={() => speakText(item.text[lang], i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
                    speakingIndex === i || hoveredIndex === i
                      ? "text-blue-600 scale-125"
                      : "text-gray-500"
                  }`}
                >
                  <FaVolumeUp className="text-xl sm:text-2xl transition-transform duration-300" />
                </div>

                {/* Imagen */}
                <Image
                  src={item.img}
                  alt={item.text[lang]}
                  width={110}
                  height={110}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 shadow-md transition-all duration-500 ${
                    hoveredIndex === i
                      ? "border-[#c4af37] scale-110"
                      : "border-red-600 hover:border-[#c4af37]"
                  }`}
                />

                {/* Texto */}
                <p
                  className="text-base sm:text-lg text-center mt-6"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {item.text[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌲 Fondo inferior */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest.webp')" }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(2).map((item, i) => {
              const index = i + 2;
              return (
                <div
                  key={index}
                  onTouchStart={() => handleTouch(index)}
                  className={`relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 w-full shadow-lg ${
                    hoveredIndex === index
                      ? "scale-105 border-2 border-[#c4af37]"
                      : "hover:scale-105"
                  }`}
                  style={{ boxShadow: "0px 4px 20px #c4af37" }}
                >
                  {/* Icono de audio */}
                  <div
                    onClick={() => speakText(item.text[lang], index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
                      speakingIndex === index || hoveredIndex === index
                        ? "text-blue-600 scale-125"
                        : "text-gray-500"
                    }`}
                  >
                    <FaVolumeUp className="text-xl sm:text-2xl transition-transform duration-300" />
                  </div>

                  {/* Imagen */}
                  <Image
                    src={item.img}
                    alt={item.text[lang]}
                    width={110}
                    height={110}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 shadow-md transition-all duration-500 ${
                      hoveredIndex === index
                        ? "border-[#c4af37] scale-110"
                        : "border-red-600 hover:border-[#c4af37]"
                    }`}
                  />

                  {/* Texto */}
                  <p
                    className="text-base sm:text-lg text-center mt-6"
                    style={{ fontFamily: "'Esteban', serif" }}
                  >
                    {item.text[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🎵 Reproductor oculto */}
      <audio ref={audioRef} preload="auto" />
    </section>
  );
}
