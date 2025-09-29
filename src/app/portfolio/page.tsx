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
    <main className="min-h-screen flex flex-col gap-20 scroll-smooth">
      <section id="bienvenidos"><Welcome /></section>
      <section id="acercademi"><AboutMe /></section>
      <section id="lenguajes"><Lenguajes /></section>
      <section id="misproyectos"><Projects /></section>
      <section id="testimonios"><Testimonials /></section>
      <section id="cv"><CvSection /></section>
      <section id="experiencia"><Experiencia /></section>
      <section id="filosofia"><Filosofia /></section>
      <section id="contacto"><Contact /></section>
      <section id="PieDePágina"><Footer/></section>
    </main>
  );
}