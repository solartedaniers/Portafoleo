import Navbar from "../components/Navbar";
import Welcome from "../components/welcome";
import AboutMe from "../components/AboutMe";
import Lenguajes from "../components/languages";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import CvSection from "../components/CvSection";
import Experiencia from "../components/experience";
import Filosofia from "../components/philosophy";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen w-full bg-black overflow-y-auto scroll-smooth">
      {/* ✅ Barra de navegación fija */}
      <Navbar />

      {/* ✅ Agrego un padding arriba para que el menú no tape contenido */}
      <div className="pt-20">
        <section id="bienvenidos" className="border-[20px] border-[#d4af37]">
          <Welcome />
        </section>
        <section id="acercademi" className="border-[20px] border-[#d4af37]">
          <AboutMe />
        </section>
        <section id="lenguajes" className="border-[20px] border-[#d4af37]">
          <Lenguajes />
        </section>
        <section id="misproyectos" className="border-[20px] border-[#d4af37]">
          <Projects />
        </section>
        <section id="testimonios" className="border-[20px] border-[#d4af37]">
          <Testimonials />
        </section>
        <section id="cv" className="border-[20px] border-[#d4af37]">
          <CvSection />
        </section>
        <section id="experiencia" className="border-[20px] border-[#d4af37]">
          <Experiencia />
        </section>
        <section id="filosofia" className="border-[20px] border-[#d4af37]">
          <Filosofia />
        </section>
        <section id="contacto" className="border-[20px] border-[#d4af37]">
          <Contact />
        </section>
        <section id="PieDePágina" className="border-[20px] border-[#d4af37]">
          <Footer />
        </section>
      </div>
    </main>
  );
}
