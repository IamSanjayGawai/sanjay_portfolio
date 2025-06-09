
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion } from 'framer-motion';

gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

const techIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
];



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typing animation
      const roles = ['Full-Stack Developer', 'Gen AI Developer', 'Creative Technologist'];
      let roleIndex = 0;

      const typeRole = () => {
        gsap.to(textRef.current, {
          duration: 1,
          text: roles[roleIndex],
          ease: 'none',
          onComplete: () => {
            gsap.delayedCall(2, () => {
              gsap.to(textRef.current, {
                duration: 0.5,
                text: '',
                ease: 'none',
                onComplete: () => {
                  roleIndex = (roleIndex + 1) % roles.length;
                  typeRole();
                }
              });
            });
          }
        });
      };

      gsap.delayedCall(1, typeRole);

      // Hero elements animation
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.h1 
          className="hero-title text-6xl md:text-8xl font-bold mb-6 text-gradient mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
        Sanjay Gawai
        </motion.h1>
        
        <div className="hero-subtitle text-2xl md:text-4xl font-light mb-8 h-16">
          <span ref={textRef} className="text-primary"></span>
          <span className="animate-pulse">|</span>
        </div>
        
        <p className="hero-description text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Crafting digital experiences that blend innovation with purpose. 
          I transform ideas into powerful, user-centered applications that make a difference.
        </p>
        
        <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </button>
          
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>


       
      </div>

     
      
      {/* Animated background elements */}
     <div className="absolute inset-0 opacity-6 ">
      {techIcons.map(({ src, alt }, i) => (
        <motion.img
          key={i}
          src={src}
          alt={alt}
          className="absolute rounded-full filter blur-sm opacity-50"
          loading="lazy"
          style={{
            width: 100,
            height: 100,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30],
            y: [0, Math.random() * 60 - 30],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
    </div>
  );
};

export default HeroSection;
