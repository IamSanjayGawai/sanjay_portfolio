
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
    <div ref={heroRef} className="min-h-screen lg:h-screen flex items-center justify-center relative overflow-y-auto pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-12">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(30 90% 55% / 0.25), transparent 70%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(180 60% 50% / 0.2), transparent 70%)'
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Floating Tech Icons Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {techIcons.map(({ src, alt }, i) => (
          <motion.img
            key={i}
            src={src}
            alt={alt}
            className="absolute rounded-lg filter blur-sm"
            style={{
              width: 80,
              height: 80,
              left: `${(i * 15 + 10) % 90}%`,
              top: `${(i * 20 + 10) % 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center py-4 sm:py-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center w-full">
          {/* Left Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left order-2 lg:order-1"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-3 sm:mb-3 lg:mb-4"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 glass-effect rounded-full border border-primary/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
              >
                <motion.span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-primary rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] sm:text-xs font-semibold text-gradient-simple">Available for Opportunities</span>
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 lg:mb-3 text-gradient leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sanjay Gawai
            </motion.h1>
            
            {/* Animated Role Subtitle */}
            <motion.div 
              className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-4 h-12 sm:h-14 lg:h-16 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span ref={textRef} className="text-gradient-simple font-bold"></span>
              <motion.span 
                className="text-primary ml-2 text-xl sm:text-2xl"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="hero-description text-sm sm:text-base md:text-lg text-foreground/85 mb-4 sm:mb-5 lg:mb-5 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Crafting <span className="text-gradient-simple font-bold">digital experiences</span> that blend innovation with purpose. 
              I transform ideas into powerful, user-centered applications.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="hero-cta flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="group relative px-5 sm:px-8 py-2.5 sm:py-3 bg-gradient-primary text-primary-foreground rounded-lg sm:rounded-xl font-medium sm:font-semibold text-xs sm:text-base overflow-hidden shadow-md sm:shadow-lg glow-primary w-full sm:w-auto transition-all duration-300 min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <span>View My Work</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-sm sm:text-lg"
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-5 sm:px-8 py-2.5 sm:py-3 border-2 border-primary/50 hover:border-primary rounded-lg sm:rounded-xl font-medium sm:font-semibold text-xs sm:text-base text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 overflow-hidden w-full sm:w-auto min-h-[40px] sm:min-h-[44px] flex items-center justify-center bg-transparent"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get In Touch</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated SDLC Circle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center lg:justify-end order-1 lg:order-2 mb-4 sm:mb-6 lg:mb-0 mt-2 sm:mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square mx-auto">
              {/* SDLC Steps */}
              {(() => {
                const sdlcSteps = [
                  { name: 'Planning', angle: 0 },
                  { name: 'Analysis', angle: 60 },
                  { name: 'Design', angle: 120 },
                  { name: 'Development', angle: 180 },
                  { name: 'Testing', angle: 240 },
                  { name: 'Deployment', angle: 300 },
                ];
                // Responsive radius and center
                const radius = 180;
                const centerX = 250;
                const centerY = 250;

                return (
                  <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                    {/* Central Circle */}
                    <motion.circle
                      cx={centerX}
                      cy={centerY}
                      r={70}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2.5"
                      className="opacity-30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                    />
                    
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(30 90% 55%)" />
                        <stop offset="100%" stopColor="hsl(180 60% 50%)" />
                      </linearGradient>
                    </defs>

                    {/* SDLC Step Circles and Labels */}
                    {sdlcSteps.map((step, index) => {
                      const angleRad = (step.angle - 90) * (Math.PI / 180);
                      const x = centerX + radius * Math.cos(angleRad);
                      const y = centerY + radius * Math.sin(angleRad);
                      
                      return (
                        <g key={index}>
                          {/* Connecting Line */}
                          <motion.line
                            x1={centerX}
                            y1={centerY}
                            x2={x}
                            y2={y}
                            stroke="hsl(var(--primary))"
                            strokeWidth="2.5"
                            className="opacity-20"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                          />
                          
                          {/* Step Circle */}
                          <motion.g
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                          >
                            <circle
                              cx={x}
                              cy={y}
                              r={50}
                              fill="hsl(var(--card))"
                              stroke="hsl(var(--primary))"
                              strokeWidth="2.5"
                              className="glass-effect"
                            />
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-foreground font-semibold"
                              style={{ fontSize: 'clamp(10px, 2.5vw, 13px)' }}
                            >
                              {step.name}
                            </text>
                          </motion.g>
                        </g>
                      );
                    })}

                    {/* Center Text */}
                    <motion.text
                      x={centerX}
                      y={centerY - 10}
                      textAnchor="middle"
                      className="fill-primary font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      style={{ fontSize: 'clamp(12px, 3vw, 15px)' }}
                    >
                      SDLC
                    </motion.text>
                    <motion.text
                      x={centerX}
                      y={centerY + 10}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}
                    >
                      Approach
                    </motion.text>
                  </svg>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
