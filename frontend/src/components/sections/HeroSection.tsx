import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useTheme } from '../../contexts/ThemeContext';
import { Plane3D } from '../Plane3D';

gsap.registerPlugin(TextPlugin, MotionPathPlugin);

const HeroSection = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let svgTimeline: gsap.core.Timeline | null = null;
    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      // — Typing animation for roles —
      const roles = ['Technical Lead', 'Founding Engineer', 'Full-Stack Architect', 'Real-Time Systems Developer'];
      let roleIndex = 0;

      const typeRole = () => {
        gsap.to(roleRef.current, {
          duration: 1.2,
          text: roles[roleIndex],
          ease: 'none',
          onComplete: () => {
            gsap.delayedCall(2.5, () => {
              gsap.to(roleRef.current, {
                duration: 0.4,
                text: '',
                ease: 'none',
                onComplete: () => {
                  roleIndex = (roleIndex + 1) % roles.length;
                  typeRole();
                },
              });
            });
          },
        });
      };
      gsap.delayedCall(1.2, typeRole);

      // — Hero entrance animations —
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-headline', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .add(() => {
          // Gentle hovering animation for the steady plane
          gsap.to('.hero-badge', {
            y: -10,
            duration: 2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
          });
        });

      // — SVG Stroke Draw Animation —
      if (svgRef.current) {
        const hubNode = svgRef.current.querySelector('.hub-node');
        const outerNodes = svgRef.current.querySelectorAll('.outer-node');
        const rings = svgRef.current.querySelectorAll('.web-ring');
        const spokes = Array.from(svgRef.current.querySelectorAll('.spoke'));
        const dataPulses = svgRef.current.querySelectorAll('.data-pulse');

        // Initialize elements to hidden/undrawn
        gsap.set(hubNode, { scale: 0, opacity: 0, transformOrigin: 'center' });
        gsap.set(outerNodes, { scale: 0, opacity: 0, transformOrigin: 'center' });

        rings.forEach((ring) => {
          const el = ring as SVGPathElement;
          const length = el.getTotalLength();
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        });

        spokes.forEach((spoke) => {
          const el = spoke as SVGPathElement;
          const length = el.getTotalLength();
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        });

        gsap.set(dataPulses, { opacity: 0 });

        // Create the timeline
        svgTimeline = gsap.timeline({ delay: 0.8 });

        // Step 1: Scale in the central hub (with 'SDLC' text) first
        svgTimeline.to(hubNode, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });

        // Draw web rings concurrently
        rings.forEach((ring) => {
          svgTimeline.to(ring, {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: 'power2.out',
          }, '-=0.4');
        });

        // Step 2: Draw spokes and scale in outer nodes sequentially following SDLC rules
        spokes.forEach((spoke, idx) => {
          const nodeNum = idx + 1;
          const targetNode = svgRef.current?.querySelector(`.outer-node-${nodeNum}`);

          // Spoke line grows outward
          svgTimeline.to(spoke, {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power1.inOut',
          });

          // Outer node scales in
          svgTimeline.to(targetNode, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          }, '-=0.1');
        });

        // Step 3: Pulsing data dots
        svgTimeline.to(dataPulses, {
          opacity: 0.3,
          duration: 0.5,
          stagger: 0.05,
          onComplete: () => {
            gsap.to(dataPulses, {
              opacity: 0.8,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              stagger: 0.3,
            });
          }
        });
      }
    }, heroRef);

    // ── Intersection Observer to pause SVG animations offscreen ──
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          svgTimeline?.play();
        } else {
          svgTimeline?.pause();
        }
      });
    }, { threshold: 0.05 });

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-start pt-20 sm:pt-28 lg:pt-30 overflow-hidden bg-transparent transition-colors duration-1000">
      {/* --- Minimal Sun / Moon Ambient Lighting & Upper Clouds --- */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none transition-all duration-1000">

        {/* UPPER CLOUDS (Dense & Borderless) */}
        <div
          className={`absolute top-[-10%] sm:top-[-15%] left-0 w-full h-[50vh] flex transition-opacity duration-700 pointer-events-none mix-blend-normal ${theme === 'dark' ? 'opacity-0' : 'opacity-80'}`}
          style={{ maskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)' }}
        >
          {/* Layer 1 (Background large) */}
          <img src="/cloude2.png" alt="Upper Cloud" className="absolute top-0 left-[-10%] w-[80%] h-auto object-cover opacity-40 blur-[4px] scale-[1.5]" />
          <img src="/cloude2.png" alt="Upper Cloud" className="absolute top-[10%] right-[-20%] w-[90%] h-auto object-cover opacity-30 blur-[6px] scale-[1.8] scale-x-[-1]" />

          {/* Layer 2 (Midground crisp) */}
          <img src="/cloude2.png" alt="Upper Cloud" className="absolute top-[5%] left-[10%] w-[60%] md:w-[40%] h-auto object-cover opacity-70 scale-[1.2]" />
          <img src="/cloude2.png" alt="Upper Cloud" className="absolute top-[15%] right-[5%] w-[70%] md:w-[50%] h-auto object-cover opacity-60 scale-[1.3] scale-x-[-1]" />

          {/* Layer 3 (Foreground wisps) */}
          <img src="/cloude2.png" alt="Upper Cloud" className="absolute top-[20%] left-[30%] w-[40%] h-auto object-cover opacity-80 blur-[2px] scale-[1.1]" />
        </div>

        {theme === 'light' ? (
          <>
            {/* Minimal Day Glow: Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)' }} />
            {/* Minimal Day Glow: Left */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, transparent 70%)' }} />
          </>
        ) : (
          <>
            {/* Minimal Night Glow: Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }} />
            {/* Minimal Night Glow: Left */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)' }} />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative pb-12 sm:pb-16">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* ── Left Column (3/5 width) - High z-index to stay above clouds ── */}
          <div className="md:col-span-3 relative z-30 flex flex-col items-center md:items-start text-center md:text-left -mt-4 sm:-mt-8">

            {/* Visual Flight Path Container — hidden */}
            <div className="absolute top-[60px] sm:top-[70px] left-[200px] sm:left-[280px] w-full h-full pointer-events-none z-0 hidden">
              <svg className="overflow-visible w-full h-full">
                <path id="visual-flight-path" fill="none" stroke="rgba(255,87,51,0.5)" strokeWidth="2" strokeDasharray="8,8" opacity="0" d="" />
              </svg>
            </div>

            {/* Smoke Particles */}
            <style>{`
              @keyframes smokePuff {
                0%   { transform: translate(0px, 0px) scale(0.5); opacity: 0.85; }
                30%  { opacity: 0.55; }
                70%  { opacity: 0.2; }
                100% { transform: translate(-160px, 0px) scale(3.5); opacity: 0; }
              }
              @keyframes smokePuffWide {
                0%   { transform: translate(0px, 0px) scale(0.5); opacity: 0.75; }
                30%  { opacity: 0.45; }
                70%  { opacity: 0.15; }
                100% { transform: translate(-140px, -10px) scale(3.0); opacity: 0; }
              }
              @keyframes smokePuffNarrow {
                0%   { transform: translate(0px, 0px) scale(0.4); opacity: 0.9; }
                30%  { opacity: 0.5; }
                70%  { opacity: 0.2; }
                100% { transform: translate(-150px, 10px) scale(2.8); opacity: 0; }
              }
              .smoke-particle {
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(220,220,235,0.9) 0%, rgba(180,185,210,0.4) 50%, transparent 75%);
                pointer-events: none;
                opacity: 0;
                animation: none;
              }
              .smoke-active .smoke-particle:nth-child(1)  { animation: smokePuff       1.8s ease-out infinite 0.00s; }
              .smoke-active .smoke-particle:nth-child(2)  { animation: smokePuffWide   1.8s ease-out infinite 0.18s; }
              .smoke-active .smoke-particle:nth-child(3)  { animation: smokePuffNarrow 1.8s ease-out infinite 0.36s; }
              .smoke-active .smoke-particle:nth-child(4)  { animation: smokePuff       1.8s ease-out infinite 0.54s; }
              .smoke-active .smoke-particle:nth-child(5)  { animation: smokePuffWide   1.8s ease-out infinite 0.72s; }
              .smoke-active .smoke-particle:nth-child(6)  { animation: smokePuffNarrow 1.8s ease-out infinite 0.90s; }
              .smoke-active .smoke-particle:nth-child(7)  { animation: smokePuff       1.8s ease-out infinite 1.08s; }
              .smoke-active .smoke-particle:nth-child(8)  { animation: smokePuffWide   1.8s ease-out infinite 1.26s; }
              .smoke-active .smoke-particle:nth-child(9)  { animation: smokePuffNarrow 1.8s ease-out infinite 1.44s; }
              .smoke-active .smoke-particle:nth-child(10) { animation: smokePuff       1.8s ease-out infinite 1.62s; }
            `}</style>

            {/* Runway and Plane Wrapper */}
            <div className="relative w-full">
              {/* Proper Visual Runway Background (Hidden per user request) */}
              <div className="hidden absolute top-[40px] sm:top-[50px] left-[-100vw] w-[150vw] h-[60px] bg-slate-800/90 dark:bg-slate-900 border-y border-slate-600 rounded-r-3xl z-0 flex flex-col justify-between py-1.5 shadow-2xl">
                {/* Top runway edge lights */}
                <div className="w-full h-[2px] border-b-[3px] border-dotted border-yellow-500/50" />
                {/* Center runway dashed line */}
                <div className="w-full h-0 border-b-4 border-dashed border-white/40" />
                {/* Bottom runway edge lights */}
                <div className="w-full h-[2px] border-t-[3px] border-dotted border-yellow-500/50" />
              </div>

              {/* 3D Plane Banner Badge */}
              <div className="hero-badge opacity-0 mb-4 md:mb-2 flex items-center justify-center md:justify-start w-full relative z-10">

                {/* Waving Flag */}
                <div
                  className="animate-wave-flag relative flex items-center justify-start px-3 sm:px-4 py-2 border-y border-l border-coral/50 bg-slate-800/95 min-w-[160px] sm:min-w-[240px]"
                  style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)' }}
                >
                  {/* Pole / string attachment edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-coral shadow-[0_0_10px_rgba(255,87,51,0.5)]"></div>

                  <div className="flex items-center ml-2 hero-text-wrapper transform-gpu">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse mr-2" />
                    <span ref={roleRef} className="font-mono text-[10px] md:text-[12px] tracking-widest text-coral font-bold uppercase drop-shadow-md text-left" />
                  </div>
                </div>

                {/* String attached to plane */}
                <div className="h-[2px] w-12 sm:w-20 border-b-2 border-coral/50 transform -translate-y-0.5 z-0"></div>

                {/* 3D Plane Model with Smoke */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 -ml-2 drop-shadow-md flex items-center justify-center mt-6 sm:mt-10">
                  {/* Smoke emitter at the TAIL of the plane (left side = trailing toward the flag) */}
                  <div id="plane-smoke" className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                    <div className="smoke-particle" />
                  </div>
                  <div className="w-full h-full rotate-[-90deg] transform origin-center scale-[0.6] sm:scale-[0.85] md:scale-100">
                    <Plane3D scale={0.0065} rotation={[Math.PI / 8, 8, 8]} />
                  </div>
                </div>
              </div>
            </div>

            {/* Name Presentation */}
            <div className="hero-headline opacity-0 mb-4 sm:mb-6 -mt-2 md:-mt-4 relative group cursor-default w-full flex flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-[4px] sm:border-[5px] border-sky-500 overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.5)] group-hover:border-sky-400 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.7)] transition-all duration-500">
                  <img
                    src="/profile.png"
                    alt="Sanjay Gawai"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-sky-500/5 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.1] tracking-widest uppercase text-slate-900 dark:text-white transition-transform duration-500 hover:scale-[1.02] text-left">
                Sanjay <br className="block sm:hidden" /><span className="inline-block text-sky-500 dark:text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">Gawai.</span>
              </h1>
            </div>

            {/* Description */}
            <div className="hero-desc opacity-0 relative mb-8 sm:mb-10 w-full flex justify-center md:justify-start">
              {/* Subtle brutalist accent line */}
              <div className="absolute top-1 bottom-1 left-0 md:-left-4 w-1 bg-gradient-to-b from-coral to-cyber/50 hidden md:block" />
              <p className="font-body text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-md md:pl-2 text-center md:text-left">
                End-to-end, from scratch, in production —
                I architect high-scale platforms, direct technical strategy, and lead the engineering teams that ship them.
                Live streaming, fintech ecosystems, and workflow automation.{' '}
                <span className="text-slate-900 dark:text-white font-semibold">3 industries. 2.5 years.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta opacity-0 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 mt-6 sm:mt-6 w-full">

              <style>{`
                @keyframes shineSweep {
                  0% { transform: translateX(-100%) skewX(-15deg); }
                  100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes gradientPan {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 200% 50%; }
                }
                .premium-btn {
                  background: linear-gradient(90deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 50%, rgba(15,23,42,1) 100%);
                  background-size: 200% auto;
                  animation: gradientPan 3s linear infinite;
                }
              `}</style>

              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="magnetic group relative px-4 sm:px-8 py-3.5 sm:py-4 premium-btn text-white overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)] border border-slate-700 hover:border-sky-500 w-full sm:w-auto flex-shrink-0"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '14px', letterSpacing: '0.1em' }}
              >
                {/* Glowing Aura Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-sky-400/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Metallic Shine Sweep */}
                <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shineSweep_1.5s_infinite_linear]" style={{ transform: 'skewX(-15deg)' }} />

                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-sky-400 animate-pulse transition-colors duration-300 shadow-[0_0_8px_rgba(14,165,233,0.8)] flex-shrink-0" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:to-white transition-all whitespace-normal sm:whitespace-nowrap text-center">LAUNCH SYSTEMS</span>
                  <span className="text-sky-500 group-hover:text-sky-400 transition-all duration-300 group-hover:translate-x-1.5 font-light flex-shrink-0">→</span>
                </span>
              </button>

              <a
                href="/Sanjay_Gawai_Resume14.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-3.5 border border-sky-500/50 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all text-center flex items-center justify-center gap-2 backdrop-blur-sm flex-shrink-0"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '14px', letterSpacing: '0.1em' }}
              >
                VIEW RESUME <span className="opacity-70">↗</span>
              </a>
            </div>
          </div>

          {/* ── Right Column (2/5 width) — Celestial Body (Sun/Moon) - Low z-index to stay behind clouds ── */}
          <div className="md:col-span-2 flex justify-center items-center w-full mt-10 md:mt-16 lg:mt-24 h-[300px] md:h-[400px] relative z-10 overflow-visible">
            {/* 
              --- SDLC SVG DIAGRAM (COMMENTED OUT) ---
              <svg ref={svgRef} viewBox="0 0 500 500" className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                ... (original SVG code preserved in Git history)
              </svg>
            */}

            {/* Realistic Sun Object */}
            <div
              className={`absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-all duration-[30000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform flex items-center justify-center
                ${theme === 'light' ? 'translate-y-0 opacity-100 rotate-0 scale-100' : 'translate-y-[200px] opacity-0 rotate-90 scale-50 pointer-events-none'}`}
            >
              {/* Sun Core (Pulses between light and orange) */}
              <div
                className={`absolute inset-0 rounded-full ${theme === 'light' ? 'animate-sun-color-shift' : ''}`}
                style={{
                  background: '#ffffff',
                  boxShadow: '0 0 120px #ffffff, 0 0 180px rgba(253, 224, 71, 0.5)'
                }}
              />

              {/* Sun Corona / Blinding Rays (Fades dynamically) */}
              <div className={`absolute inset-[-20%] rounded-full bg-white/60 blur-[15px] animate-pulse mix-blend-screen pointer-events-none ${theme === 'light' ? 'animate-rays-fade' : 'opacity-0'}`} style={{ animationDuration: '3s' }} />
              <div className={`absolute inset-[-50%] rounded-full bg-yellow-100/30 blur-[25px] animate-pulse mix-blend-screen pointer-events-none ${theme === 'light' ? 'animate-rays-fade' : 'opacity-0'}`} style={{ animationDuration: '7s', animationDelay: '1s' }} />
              <div className={`absolute inset-[-100%] rounded-full bg-amber-200/10 blur-[40px] mix-blend-screen pointer-events-none ${theme === 'light' ? 'animate-rays-fade' : 'opacity-0'}`} />

              {/* Core intense glow */}
              <div className={`absolute inset-0 rounded-full bg-white blur-[5px] mix-blend-screen pointer-events-none ${theme === 'light' ? 'animate-rays-fade' : 'opacity-0'}`} />
            </div>

            {/* Realistic Moon Object (Pure CSS) */}
            <div
              className={`absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-all duration-[30000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform flex items-center justify-center
                ${theme === 'dark' ? 'translate-y-[-40px] opacity-100 rotate-0 scale-100' : 'translate-y-[200px] opacity-0 -rotate-90 scale-50 pointer-events-none'}`}
              style={{
                background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f8fafc 40%, #e2e8f0 80%, #cbd5e1 100%)',
                boxShadow: '0 0 80px rgba(255, 255, 255, 0.6), 0 0 150px rgba(255, 255, 255, 0.3), inset -10px -10px 25px rgba(15, 23, 42, 0.2), inset 10px 10px 20px rgba(255, 255, 255, 1)'
              }}
            >
              {/* Subtle moon surface crater texture */}
              <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-slate-400/20 blur-[5px]" />
              <div className="absolute bottom-[30%] right-[25%] w-[40%] h-[40%] rounded-full bg-slate-500/15 blur-[8px]" />
              <div className="absolute top-[60%] left-[15%] w-[25%] h-[25%] rounded-full bg-slate-400/20 blur-[4px]" />

              {/* Moon Glow Halo */}
              <div className="absolute inset-[-40%] rounded-full bg-white/20 blur-[30px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

          </div>
        </div>
      </div>

      {/* 3. Massive Sea of Clouds (Covers Sun, sits behind Text) */}
      <div
        className={`absolute bottom-[0%] sm:bottom-[10%] left-[-10%] w-[120%] h-[50vh] transition-opacity duration-1000 z-20 pointer-events-none mix-blend-normal ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
        style={{ maskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)' }}
      >
        {/* RIGHT SIDE (Massive mix of clouds peaking to hide bottom half of the Sun) */}
        <img src="/cloud.png" alt="Cloud" className="absolute top-[10%] right-[0%] w-[60%] md:w-[50%] h-auto object-cover opacity-60 blur-[2px] scale-[1.5]" />
        <img src="/cloude2.png" alt="Cloud" className="absolute top-[25%] right-[-10%] w-[65%] md:w-[55%] h-auto object-cover opacity-100 scale-[1.6]" />
        <img src="/cloud.png" alt="Cloud" className="absolute top-[40%] right-[5%] w-[60%] md:w-[50%] h-auto object-cover opacity-60 scale-[1.5] scale-x-[-1]" />
        <img src="/cloude2.png" alt="Cloud" className="absolute top-[50%] right-[-15%] w-[80%] md:w-[70%] h-auto object-cover opacity-100 scale-[1.8] scale-x-[-1]" />

        {/* CENTER (Bridging the gap) */}
        <img src="/cloud.png" alt="Cloud" className="absolute top-[30%] left-[25%] w-[50%] md:w-[45%] h-auto object-cover opacity-60 scale-[1.4] scale-x-[-1]" />
        <img src="/cloude2.png" alt="Cloud" className="absolute top-[45%] left-[40%] w-[60%] md:w-[50%] h-auto object-cover opacity-100 scale-[1.3]" />

        {/* LEFT SIDE (Sprawling horizon base) */}
        <img src="/cloude2.png" alt="Cloud" className="absolute top-[25%] left-[-10%] w-[60%] md:w-[50%] h-auto object-cover opacity-100 blur-[3px] scale-[1.5]" />
        <img src="/cloud.png" alt="Cloud" className="absolute top-[45%] left-[5%] w-[65%] md:w-[55%] h-auto object-cover opacity-60 scale-[1.4]" />
        <img src="/cloude2.png" alt="Cloud" className="absolute top-[60%] left-[-15%] w-[75%] md:w-[65%] h-auto object-cover opacity-100 scale-[1.6]" />
      </div>

    </div>
  );
};

export default HeroSection;
