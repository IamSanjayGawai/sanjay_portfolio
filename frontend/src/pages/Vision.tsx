
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parallaxRef.current && textRef.current) {
      gsap.fromTo(
        parallaxRef.current,
        { y: 0 },
        {
          y: -100,
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-electric-blue/20 blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gradient">
              My Vision
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Crafting digital experiences that bridge the gap between 
              human creativity and technological innovation
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div ref={textRef} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Design Philosophy
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  I believe that great design is invisible. It solves problems 
                  so elegantly that users don't even notice the complexity behind it.
                </p>
                <p>
                  Every pixel, every interaction, every animation serves a purpose - 
                  to create meaningful connections between people and technology.
                </p>
                <p>
                  My approach combines aesthetic beauty with functional excellence, 
                  ensuring that every project not only looks stunning but performs flawlessly.
                </p>
              </div>
            </div>
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-primary p-8 rounded-2xl glass-effect">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl mb-2">🎨</div>
                    <div className="font-semibold">Creative</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-semibold">Fast</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl mb-2">🔧</div>
                    <div className="font-semibold">Functional</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl mb-2">📱</div>
                    <div className="font-semibold">Responsive</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              Mission Statement
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <blockquote className="text-2xl md:text-3xl font-light italic text-foreground leading-relaxed">
                "To empower businesses and individuals through innovative digital solutions 
                that not only meet their current needs but anticipate future challenges, 
                creating lasting value and meaningful impact."
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
              Core Values
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Innovation',
                description: 'Constantly pushing boundaries and exploring new technologies to deliver cutting-edge solutions.',
              },
              {
                icon: '🤝',
                title: 'Collaboration',
                description: 'Working closely with clients and teams to ensure every project exceeds expectations.',
              },
              {
                icon: '🎯',
                title: 'Excellence',
                description: 'Maintaining the highest standards in code quality, design, and user experience.',
              },
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <motion.div
                  className="bg-card border border-border rounded-xl p-6 text-center h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
