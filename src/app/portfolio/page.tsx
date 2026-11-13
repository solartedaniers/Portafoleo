"use client";
import { useApp } from "../components/ThemeLangContext";
import Navbar from "../components/Navbar";
import Welcome from "../components/welcome";
import AboutMe from "../components/AboutMe";
import Lenguajes from "../components/languages";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import CvSection from "../components/CvSection";
import Experience from "../components/experience";
import Philosophy from "../components/philosophy";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// El id de cada sección debe coincidir con los ids del menú en los JSON de contenido
const sections = [
  { id: "bienvenidos", component: <Welcome /> },
  { id: "acercademi", component: <AboutMe /> },
  { id: "tecnologias", component: <Lenguajes /> },
  { id: "misproyectos", component: <Projects /> },
  { id: "testimonios", component: <Testimonials /> },
  { id: "cv", component: <CvSection /> },
  { id: "experiencia", component: <Experience /> },
  { id: "filosofia", component: <Philosophy /> },
  { id: "contacto", component: <Contact /> },
  { id: "PieDePágina", component: <Footer /> },
];

export default function PortfolioPage() {
  const { theme } = useApp();

  return (
    <div
      className={`min-h-screen flex flex-col overflow-x-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      <main className="flex flex-col gap-6 sm:gap-10 px-2 sm:px-4 py-6 pt-20 md:pt-32 lg:pt-36">
        {sections.map(({ id, component }) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-20 md:scroll-mt-36 border-[6px] sm:border-[10px] lg:border-[15px] border-gold p-1 sm:p-3 lg:p-4 box-border"
          >
            {component}
          </section>
        ))}
      </main>
    </div>
  );
}
