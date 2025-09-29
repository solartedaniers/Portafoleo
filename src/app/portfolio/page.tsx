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
      <section id="bienvenidos" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Welcome />
      </section>
      <section id="acercademi" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <AboutMe />
      </section>
      <section id="lenguajes" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Lenguajes />
      </section>
      <section id="misproyectos" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Projects />
      </section>
      <section id="testimonios" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Testimonials />
      </section>
      <section id="cv" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <CvSection />
      </section>
      <section id="experiencia" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Experiencia />
      </section>
      <section id="filosofia" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Filosofia />
      </section>
      <section id="contacto" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Contact />
      </section>
      <section id="PieDePágina" className="border-[20px] border-[#d4af37] box-border m-0 p-0">
        <Footer />
      </section>
    </main>
  );
}