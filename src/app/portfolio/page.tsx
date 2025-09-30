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
    <main className="min-h-screen flex flex-col gap-10 scroll-smooth px-4 py-6 - pt-24 
     bg-black">
      {/* ✅ Barra de navegación fija */}
      <Navbar />

      {/* ✅ Secciones con margen interno y bordes dorados */}
      <section id="bienvenidos" className=" scroll-mt-24 border-[15px] border-[#d4af37] p-4 box-border">
        <Welcome />
      </section>
      <section id="acercademi" className="border-[15px] border-[#d4af37] p-4 box-border">
        <AboutMe />
      </section>
      <section id="lenguajes" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Lenguajes />
      </section>
      <section id="misproyectos" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Projects />
      </section>
      <section id="testimonios" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Testimonials />
      </section>
      <section id="cv" className="border-[15px] border-[#d4af37] p-4 box-border">
        <CvSection />
      </section>
      <section id="experiencia" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Experiencia />
      </section>
      <section id="filosofia" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Filosofia />
      </section>
      <section id="contacto" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Contact />
      </section>
      <section id="PieDePágina" className="border-[15px] border-[#d4af37] p-4 box-border">
        <Footer />
      </section>
    </main>
  );
}