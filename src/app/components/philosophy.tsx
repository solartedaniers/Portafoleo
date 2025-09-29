"use client";
import { FaVolumeUp } from "react-icons/fa";
import Image from "next/image";
import { useApp } from "./ThemeLangContext";

export default function Filosofia() {
  const { lang } = useApp();

  const translations = {
    es: {
      title: "Mi Filosofía de Vida",
      text: `Mi filosofía de vida se basa en tres pilares: la fe en Dios, el amor
      por mi familia y la convicción de que cada reto es una oportunidad
      para crecer. <br /> Creo que la disciplina y la constancia son el
      camino para alcanzar las metas, mientras que el aprendizaje continuo
      nos permite fortalecernos y evolucionar. <br /> Vivir plenamente
      significa disfrutar cada momento —reír, llorar, soñar— entendiendo
      que cada experiencia forma nuestro carácter. <br /> Busco ayudar a
      los demás y aportar valor, porque la verdadera grandeza no está en
      lo que logramos, sino en mantener intactos los principios que nos
      definen.`,
    },
    en: {
      title: "My Life Philosophy",
      text: `My life philosophy is based on three pillars: faith in God, love for my family, and the belief that every challenge is an opportunity to grow. <br /> I believe discipline and consistency are the path to achieving goals, while continuous learning helps us strengthen and evolve. <br /> Living fully means enjoying every moment—laughing, crying, dreaming—understanding that each experience shapes our character. <br /> I strive to help others and add value, because true greatness lies not in what we achieve, but in preserving the principles that define us.`,
    },
  };

  const t = translations[lang];

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/path.jpg')" }}
    >
      <div className="relative max-w-3xl w-[90%] flex flex-col items-center gap-6">
        {/* Título */}
        <h2 className="text-4xl text-center px-6 py-2 rounded-full shadow-lg transition-all duration-500
           bg-red-600/80 text-white font-['Irish_Grover'] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_#c4af37]">
          {t.title}
        </h2>

        {/* Contenedor principal */}
        <div className="relative bg-[#f5f5f5] rounded-2xl shadow-[0_0_20px_#c4af37] p-6 md:p-10 text-center transition-all duration-500 hover:scale-105 hover:border-red-600 hover:shadow-[0_0_30px_#c4af37] border-4 border-transparent">
          {/* Botón audio */}
          <button className="absolute top-4 right-4 p-2 rounded-full text-black transition-all duration-300 hover:scale-110 hover:text-blue-600">
            <FaVolumeUp size={24} />
          </button>

          {/* Imagen optimizada */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/samurai tiger.jpeg"
              alt="Filosofía"
              width={100}
              height={90}
              className="object-cover rounded-2xl border-4 border-[#c4af37] shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-black hover:border-red-600"
            />
          </div>

          {/* Texto */}
          <p
            className="text-[17px] leading-relaxed font-esteban text-[#5c4c4c] transition-all duration-300 hover:tracking-wide"
            dangerouslySetInnerHTML={{ __html: t.text }}
          />
        </div>
      </div>
    </section>
  );
}