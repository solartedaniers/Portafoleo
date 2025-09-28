"use client";
import { FaVolumeUp } from "react-icons/fa";
import Image from "next/image";

export default function Filosofia() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/path.jpg')" }}
    >
      <div className="relative max-w-3xl w-[90%] flex flex-col items-center gap-6">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-irish text-white px-6 py-2 rounded-full bg-red-600 transition-all duration-500 hover:bg-[#c4af37] shadow-lg">
          Mi Filosofía de Vida
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
              width={100} // ancho reducido
              height={90} // altura reducida
              className="object-cover rounded-2xl border-4 border-[#c4af37] shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-black hover:border-red-600"
            />
          </div>

          {/* Texto */}
          <p className="text-[17px] leading-relaxed font-esteban text-[#5c4c4c] transition-all duration-300 hover:tracking-wide">
            Mi filosofía de vida se basa en tres pilares: la fe en Dios, el amor
            por mi familia y la convicción de que cada reto es una oportunidad
            para crecer. <br /> Creo que la disciplina y la constancia son el
            camino para alcanzar las metas, mientras que el aprendizaje continuo
            nos permite fortalecernos y evolucionar. <br /> Vivir plenamente
            significa disfrutar cada momento —reír, llorar, soñar— entendiendo
            que cada experiencia forma nuestro carácter. <br /> Busco ayudar a
            los demás y aportar valor, porque la verdadera grandeza no está en
            lo que logramos, sino en mantener intactos los principios que nos
            definen.
          </p>
        </div>
      </div>
    </section>
  );
}