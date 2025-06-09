
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import FloatingElements from '../components/FloatingElements';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to ensure proper calculations
      ScrollTrigger.refresh();

      // Text reveal animations with proper timing
      gsap.utils.toArray('.text-reveal').forEach((text: any) => {
        gsap.fromTo(text, 
          { 
            opacity: 0, 
            y: 50,
            skewY: 3 
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Stagger animations for cards with better timing
      gsap.utils.toArray('.stagger-item').forEach((item: any, index: number) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 40,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Progress indicator
      gsap.to('.progress-bar', {
        scaleX: 1,
        transformOrigin: 'left',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5
        }
      });

      // Section entrance animations
      gsap.utils.toArray('section').forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
        <div className="progress-bar h-full bg-gradient-primary scale-x-0"></div>
      </div>

      <FloatingElements />
      
      <div ref={containerRef} className="relative">
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="experience">
          <ExperienceSection />
        </section>
        
        <section id="projects">
          <ProjectsSection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </div>
  );
};

export default Home;
