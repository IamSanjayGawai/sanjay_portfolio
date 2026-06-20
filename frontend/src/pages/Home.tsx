
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsBento from '../components/sections/SkillsBento';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsShowcase from '../components/sections/ProjectsShowcase';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';
import CloudDivider from '../components/ui/CloudDivider';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after layout
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="relative">
        <section id="home" className="relative">
          <HeroSection />
          <CloudDivider />
        </section>

        <section id="experience" className="relative">
          <ExperienceSection />
          <CloudDivider />
        </section>

        <section id="projects" className="relative">
          <ProjectsShowcase />
          {/* ProjectsShowcase renders its own internal cloud dividers, but adding one here caps off the entire section */}
          <CloudDivider />
        </section>

        <section id="skills" className="relative">
          <SkillsBento />
          <CloudDivider />
        </section>

        <section id="about" className="relative">
          <AboutSection />
          <CloudDivider />
        </section>

        <section id="contact" className="relative">
          <ContactSection />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
