"use client";
import React, { useRef } from "react";
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

  const items: AboutItem[] = [
    {
      img: "/images/family.jpeg",
      text: {
        es: "Me encanta salir a pasear con mi familia y pasar tiempo con mi hermana. A mi juicio, esos instantes simples son muy valiosos, ya que nos hacen recordar lo fundamental que es gozar de la compañía de aquellos a quienes más queremos",
        en: "I love going out with my family and spending time with my sister. In my view, those simple moments are very valuable, reminding us how important it is to enjoy the company of those we love most.",
      },
      audio: "/sounds/family.mp3",
    },
    {
      img: "/images/motorcycle.jpeg",
      text: {
        es: "Me encanta viajar en moto, recorrer nuevos lugares. Porque cada viaje es una oportunidad para descubrir paisajes, culturas y formas de pensar que me enriquecen y me ayudan a crecer.",
        en: "I love traveling by motorcycle and exploring new places. Every trip is a chance to discover landscapes, cultures, and ways of thinking that enrich me and help me grow.",
      },
      audio: "/sounds/motorcycle.mp3",
    },
    {
      img: "/images/group.jpeg",
      text: {
        es: "Me gusta jugar microfútbol con amigos, no en torneos, sino como un espacio para compartir, reír y desconectarme. También practico taekwondo, camino o corro con frecuencia, porque me gusta mantenerme activo y sentir la energía del movimiento.",
        en: "I enjoy playing soccer with friends—not in tournaments, but as a space to share, laugh, and disconnect. I also practice taekwondo, walk or run often, because I like staying active and feeling the energy of movement.",
      },
      audio: "/sounds/group.mp3",
    },
    {
      img: "/images/paragliding.jpeg",
      text: {
        es: "Las montañas y los deportes extremos me apasionan, porque ahí encuentro tanto paz como adrenalina. Me gusta sentir ese impulso de libertad y desafío que me recuerda que la vida también está hecha para atreverse.",
        en: "I'm passionate about mountains and extreme sports because they offer both peace and adrenaline. I love the feeling of freedom and challenge that reminds me life is also about daring.",
      },
      audio: "/sounds/paragliding.mp3",
    },
    {
      img: "/images/Bible.jpg",
      text: {
        es: "Me gusta leer la Biblia, conversar y compartir con personas que me inspiran. Disfruto estar activo y ayudar a los demás, porque creo que crecer como persona es un camino que se construye con humildad y sabiendo escuchar.",
        en: "I enjoy reading the Bible, talking and sharing with people who inspire me. I like staying active and helping others, because I believe personal growth is built with humility and the ability to listen.",
      },
      audio: "/sounds/bible.mp3",
    },
  ];

  const playAudio = (src: string) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <section className="w-full text-black overflow-x-hidden">
      {/* 🌲 Fondo superior */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest 2.jpg')" }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          {/* 🔴 Título con hover dorado */}
          <h2
            className="text-2xl sm:text-4xl text-center mb-10 px-4 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-500
                       bg-red-600/60 text-white hover:bg-[#d4af37] hover:text-black font-irish"
            style={{ fontFamily: "'Irish Grover', cursive" }}
          >
            {lang === "es" ? "Acerca de mí" : "About Me"}
          </h2>

          {/* 📌 Primeros 2 cuadros */}
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 hover:scale-105 w-full shadow-lg"
                style={{ boxShadow: "0px 4px 20px #c4af37" }}
              >
                {/* 🔊 Icono bocina */}
                <div
                  onClick={() => playAudio(item.audio)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition-all duration-300 cursor-pointer"
                >
                  <FaVolumeUp className="text-xl sm:text-2xl hover:scale-125 transition-transform duration-300" />
                </div>

                {/* 🖼️ Imagen */}
                <Image
                  src={item.img}
                  alt={item.text[lang]}
                  width={110}
                  height={110}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-red-600 shadow-md transition-all duration-500 hover:border-[#c4af37] hover:scale-110"
                />

                {/* 📜 Texto */}
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
          style={{ backgroundImage: "url('/images/forest.jpg')" }}
        />
        <div className="relative z-10 py-16 px-4 sm:px-6 flex flex-col items-center">
          {/* 📌 Últimos 3 cuadros */}
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(2).map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 hover:scale-105 w-full shadow-lg"
                style={{ boxShadow: "0px 4px 20px #c4af37" }}
              >
                {/* 🔊 Icono bocina */}
                <div
                  onClick={() => playAudio(item.audio)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition-all duration-300 cursor-pointer"
                >
                  <FaVolumeUp className="text-xl sm:text-2xl hover:scale-125 transition-transform duration-300" />
                </div>

                {/* 🖼️ Imagen */}
                <Image
                  src={item.img}
                  alt={item.text[lang]}
                  width={110}
                  height={110}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-red-600 shadow-md transition-all duration-500 hover:border-[#c4af37] hover:scale-110"
                />

                {/* 📜 Texto */}
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

      {/* 🎵 Reproductor de audio oculto */}
      <audio ref={audioRef} preload="auto" />
    </section>
  );
}