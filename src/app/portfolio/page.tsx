import AboutMe from "../components/AboutMe";
import Lenguajes from "../components/languages";
import Projects from "../components/Projects"; 
import Testimonials from "../components/Testimonials";
import CvSection from "../components/CvSection";
import Experiencia from "../components/Experiencia";
import Filosofia from "../components/filosofia";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


export default function portfolioPage() {
  return (
    <main className="min-h-screen flex flex-col gap-20">
      {/* Sección acerca de mí */}
      <AboutMe />

      {/* Sección lenguajes */}
      <Lenguajes />

      {/* Sección proyectos */}
      <Projects />   {/* 👈 aquí se renderiza */}

      {/* Sección testimonios */}
      <Testimonials />

      {/* Sección CV */}
      <CvSection />

      {/* Sección experiencia */}
      <Experiencia />

      {/* Sección filosofía */}
      <Filosofia />

      {/* Sección contacto */}
      <Contact />

      {/* Pie de página */}
      <Footer />
    </main>

  );
}
