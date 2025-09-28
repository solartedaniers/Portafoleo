"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface AboutItem {
  img: string;
  text: string;
  audio: string;
}

export default function AboutMe() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const items: AboutItem[] = [
    {
      img: "/images/family.jpeg",
      text: "Me encanta salir a pasear con mi familia y pasar tiempo con mi hermana. A mi juicio, esos instantes simples son muy valiosos, ya que nos hacen recordar lo fundamental que es gozar de la compañía de aquellos a quienes más queremos",
      audio: "/sounds/family.mp3",
    },
    {
      img: "/images/motorcycle.jpeg",
      text: "Me encanta viajar en moto, recorrer nuevos lugares. Porque cada viaje es una oportunidad para descubrir paisajes, culturas y formas de pensar que me enriquecen y me ayudan a crecer.",
      audio: "/sounds/motorcycle.mp3",
    },
    {
      img: "/images/group.jpeg",
      text: "Me gusta jugar microfútbol con amigos, no en torneos, sino como un espacio para compartir, reír y desconectarme. También practico taekwondo, camino o corro con frecuencia, porque me gusta mantenerme activo y sentir la energía del movimiento.",
      audio: "/sounds/group.mp3",
    },
    {
      img: "/images/paragliding.jpeg",
      text: "Las montañas y los deportes extremos me apasionan, porque ahí encuentro tanto paz como adrenalina. Me gusta sentir ese impulso de libertad y desafío que me recuerda que la vida también está hecha para atreverse.",
      audio: "/sounds/paragliding.mp3",
    },
    {
      img: "/images/Bible.jpg",
      text: "Me gusta leer la Biblia, conversar y compartir con personas que me inspiran. Disfruto estar activo y ayudar a los demás, porque creo que crecer como persona es un camino que se construye con humildad y sabiendo escuchar.",
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
      {/* 🌲 Fondo superior con forest 2.jpg */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest 2.jpg')" }}
        />
        <div className="relative z-10 py-16 px-4 flex flex-col items-center">
          {/* 🔴 Título más pequeño y redondeado */}
          <h2
            className="text-4xl text-center mb-10 px-6 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-500 bg-red-600/60 text-white hover:bg-[#c4af37] hover:text-gold font-irish"
            style={{ fontFamily: "'Irish Grover', cursive" }}
          >
            Acerca de mí
          </h2>

          {/* 📌 Primeros 2 cuadros */}
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 hover:scale-105 w-full shadow-lg"
                style={{
                  boxShadow: "0px 4px 20px #c4af37",
                }}
              >
                {/* 🔊 Botón de audio arriba a la derecha */}
                <button
                  onClick={() => playAudio(item.audio)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-teal-400 transition-colors text-2xl"
                  aria-label="Reproducir audio"
                >
                  🔊
                </button>

                {/* 🖼️ Imagen circular */}
                <Image
                  src={item.img}
                  alt={item.text}
                  width={110}
                  height={110}
                  className="w-24 h-24 rounded-full object-cover border-4 border-red-600 shadow-md transition-all duration-500 hover:border-[#c4af37] hover:scale-110"
                />

                {/* 📜 Texto */}
                <p
                  className="text-lg text-center mt-6"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌲 Fondo inferior con forest.jpg */}
      <div className="relative w-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/forest.jpg')" }}
        />
        <div className="relative z-10 py-16 px-4 flex flex-col items-center">
          {/* 📌 Últimos 3 cuadros */}
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            {items.slice(2).map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center p-6 rounded-xl bg-[#f5f5f5] transition-all duration-500 hover:scale-105 w-full shadow-lg"
                style={{
                  boxShadow: "0px 4px 20px #c4af37",
                }}
              >
                {/* 🔊 Botón de audio arriba a la derecha */}
                <button
                  onClick={() => playAudio(item.audio)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-teal-400 transition-colors text-2xl"
                  aria-label="Reproducir audio"
                >
                  🔊
                </button>

                {/* 🖼️ Imagen circular */}
                <Image
                  src={item.img}
                  alt={item.text}
                  width={110}
                  height={110}
                  className="w-24 h-24 rounded-full object-cover border-4 border-red-600 shadow-md transition-all duration-500 hover:border-[#c4af37] hover:scale-110"
                />

                {/* 📜 Texto */}
                <p
                  className="text-lg text-center mt-6"
                  style={{ fontFamily: "'Esteban', serif" }}
                >
                  {item.text}
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
