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
          // 3D Flight Timeline
          // The plane loops endlessly, waiting 5.5s at the start of each loop
          const flight = gsap.timeline({ repeat: -1 });

          // Wait for path to exist, then get its length
          const checkPath = setInterval(() => {
            const pathEl = document.getElementById('visual-flight-path') as unknown as SVGPathElement;
            if (pathEl && pathEl.getTotalLength) {
              clearInterval(checkPath);

              const w = window.innerWidth;

              // Double Landing Pendulum Flight Path
              const alt = -150;
              const retAlt = -250;
              const rightOffscreen = w + 400; // Off-screen right
              const leftOffscreen = -2000;    // Off-screen left
              const runwayLeft = -800;        // Start of runway
              const runwayRight = 0;          // End of runway

              // 1. Takeoff Right: 0 to rightOffscreen
              // 2. U-turn Right
              // 3. Approach Left: rightOffscreen to 800
              // 4. Land Left: 800 to 0
              // 5. Roll Left: 0 to -800
              // 6. Takeoff Left: -800 to leftOffscreen
              // 7. U-turn Left
              // 8. Approach Right: leftOffscreen to -1400
              // 9. Land Right: -1400 to -800
              // 10. Roll Right: -800 to 0
              const pathStr = `M ${runwayRight},0 
                  C 300,0 500,${alt} 800,${alt}
                  L ${rightOffscreen},${alt}
                  C ${rightOffscreen + 400},${alt} ${rightOffscreen + 400},${retAlt} ${rightOffscreen},${retAlt}
                  L 800,${retAlt}
                  C 400,${retAlt} 200,0 ${runwayRight},0
                  L ${runwayLeft},0
                  C -1100,0 -1300,${alt} -1600,${alt}
                  L ${leftOffscreen},${alt}
                  C ${leftOffscreen - 400},${alt} ${leftOffscreen - 400},${retAlt} ${leftOffscreen},${retAlt}
                  L -1400,${retAlt}
                  C -1100,${retAlt} -1000,0 ${runwayLeft},0
                  L ${runwayRight},0`;

              // Draw the visual path
              const visualPathEl = document.getElementById('visual-flight-path') as unknown as SVGPathElement;
              if (visualPathEl) {
                visualPathEl.setAttribute('d', pathStr);
                gsap.to(visualPathEl, { opacity: 1, duration: 1.5, delay: 0.5 });
                const len = visualPathEl.getTotalLength();
                gsap.set(visualPathEl, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(visualPathEl, { strokeDashoffset: 0, duration: 25, ease: 'power1.inOut' });
              }

              // Calculate exact dynamic timings for the off-screen flips using SVG getTotalLength
              const measurePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
              const getLen = (d: string) => {
                measurePath.setAttribute("d", d);
                return measurePath.getTotalLength();
              };

              const segRollRight = `M ${runwayLeft},0 L ${runwayRight},0`;
              const segTakeoffRight = `M ${runwayRight},0 C 300,0 500,${alt} 800,${alt} L ${rightOffscreen},${alt}`;
              const segUTurnRight = `M ${rightOffscreen},${alt} C ${rightOffscreen + 400},${alt} ${rightOffscreen + 400},${retAlt} ${rightOffscreen},${retAlt}`;
              const segFlyLandLeft = `M ${rightOffscreen},${retAlt} L 800,${retAlt} C 400,${retAlt} 200,0 ${runwayRight},0`;
              const segRollLeft = `M ${runwayRight},0 L ${runwayLeft},0`;
              const segTakeoffLeft = `M ${runwayLeft},0 C -1100,0 -1300,${alt} -1600,${alt} L ${leftOffscreen},${alt}`;
              const segUTurnLeft = `M ${leftOffscreen},${alt} C ${leftOffscreen - 400},${alt} ${leftOffscreen - 400},${retAlt} ${leftOffscreen},${retAlt}`;
              const segFlyLandRight = `M ${leftOffscreen},${retAlt} L -1400,${retAlt} C -1100,${retAlt} -1000,0 ${runwayLeft},0`;

              const d1 = getLen(segRollRight);
              const d2 = getLen(segTakeoffRight);
              const d3 = getLen(segUTurnRight);
              const d4 = getLen(segFlyLandLeft);
              const d5 = getLen(segRollLeft);
              const d6 = getLen(segTakeoffLeft);
              const d7 = getLen(segUTurnLeft);
              const d8 = getLen(segFlyLandRight);

              // Variable speeds (pixels per second)
              const speedSlow = 120; // Very slow, majestic flight across the screen to read the motto
              const speedFast = 2500; // Extremely fast off-screen turnaround

              // Calculate durations for each segment based on their physical length
              const t1 = d1 / speedSlow;
              const t2 = d2 / speedSlow;
              const t3 = d3 / speedFast; // U-turn right
              const t4 = d4 / speedSlow;
              const t5 = d5 / speedSlow;
              const t6 = d6 / speedSlow;
              const t7 = d7 / speedFast; // U-turn left
              const t8 = d8 / speedSlow;

              // Chain the sequential path animations
              // Wait 15s at start (0,0) before taking off
              flight.to('.hero-badge', { motionPath: { path: segTakeoffRight, autoRotate: true }, duration: t2, ease: 'none', delay: 15 })

                // Right U-turn (Fast)
                .addLabel("rightUTurn")
                .to('.hero-badge', { motionPath: { path: segUTurnRight, autoRotate: true }, duration: t3, ease: 'none' }, "rightUTurn")
                // Trigger flip instantly at start of fast U-turn
                .to('.hero-badge', { rotationX: 180, duration: 0.1, ease: 'none' }, "rightUTurn")
                .to('.animate-wave-flag', { scaleX: -1, duration: 0.1, ease: 'none' }, "rightUTurn")

                .to('.hero-badge', { motionPath: { path: segFlyLandLeft, autoRotate: true }, duration: t4, ease: 'none' })
                .to('.hero-badge', { motionPath: { path: segRollLeft, autoRotate: true }, duration: t5, ease: 'none' })
                .to('.hero-badge', { motionPath: { path: segTakeoffLeft, autoRotate: true }, duration: t6, ease: 'none' })

                // Left U-turn (Fast)
                .addLabel("leftUTurn")
                .to('.hero-badge', { motionPath: { path: segUTurnLeft, autoRotate: true }, duration: t7, ease: 'none' }, "leftUTurn")
                // Trigger flip instantly at start of fast U-turn
                .to('.hero-badge', { rotationX: 360, duration: 0.1, ease: 'none' }, "leftUTurn")
                .to('.animate-wave-flag', { scaleX: 1, duration: 0.1, ease: 'none' }, "leftUTurn")

                .to('.hero-badge', { motionPath: { path: segFlyLandRight, autoRotate: true }, duration: t8, ease: 'none' })

                // Finally, roll right back to 0,0 to complete the loop
                .to('.hero-badge', { motionPath: { path: segRollRight, autoRotate: true }, duration: t1, ease: 'none' });

              // Reset rotationX to 0 at the end of the timeline so it loops cleanly
              flight.set('.hero-badge', { rotationX: 0 });
            }
          }, 100);
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
        const svgTl = gsap.timeline({ delay: 0.8 });

        // Step 1: Scale in the central hub (with 'SDLC' text) first
        svgTl.to(hubNode, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });

        // Draw web rings concurrently
        rings.forEach((ring) => {
          svgTl.to(ring, {
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
          svgTl.to(spoke, {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power1.inOut',
          });

          // Outer node scales in
          svgTl.to(targetNode, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          }, '-=0.1');
        });

        // Step 3: Pulsing data dots
        svgTl.to(dataPulses, {
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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-transparent transition-colors duration-1000">
      {/* --- Minimal Sun / Moon Ambient Lighting & Clouds --- */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none transition-all duration-1000">
        {/* Top Left Cloud (Hanging from ceiling) - hidden in dark mode */}
        <div className="absolute top-0 left-0 w-[80%] md:w-[50%] flex justify-start opacity-100 dark:opacity-0 transition-opacity duration-700 z-0 pointer-events-none">
          <img src="/cloude2.png" alt="Cloud" className="w-full h-auto object-contain transform drop-shadow-2xl" style={{ transform: 'scaleY(-1) scaleX(1.1)' }} />
        </div>

        {theme === 'light' ? (
          <>
            {/* Minimal Day Glow: Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[100px]" />
            {/* Minimal Day Glow: Left */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[100px]" />
          </>
        ) : (
          <>
            {/* Minimal Night Glow: Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
            {/* Minimal Night Glow: Left */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">

          {/* ── Left Column (3/5 width) ── */}
          <div className="md:col-span-3 relative z-20 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">

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
                  className="animate-wave-flag relative flex items-center justify-start px-3 sm:px-4 py-2 border-y border-l border-coral/50 bg-coral/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,87,51,0.2)] min-w-[160px] sm:min-w-[240px]"
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
            <div className="hero-headline opacity-0 mb-4 sm:mb-6 -mt-2 md:-mt-4 relative group cursor-default w-full">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-widest uppercase text-slate-900 dark:text-white transition-transform duration-500 hover:scale-[1.02]">
                Sanjay <br className="block sm:hidden" /><span className="inline-block text-sky-500 dark:text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">Gawai.</span>
              </h1>
            </div>

            {/* Description */}
            <div className="hero-desc opacity-0 relative mb-8 sm:mb-10 w-full flex justify-center md:justify-start">
              {/* Subtle brutalist accent line */}
              <div className="absolute top-1 bottom-1 left-0 md:-left-4 w-1 bg-gradient-to-b from-coral to-cyber/50 rounded-full hidden md:block" />
              <p className="font-body text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-md md:pl-2 text-center md:text-left">
                End-to-end, from scratch, in production —
                I architect high-scale platforms, direct technical strategy, and lead the engineering teams that ship them.
                Live streaming, fintech ecosystems, and workflow automation.{' '}
                <span className="text-slate-900 dark:text-white font-semibold">3 industries. 2.5 years.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta opacity-0 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 mt-2 sm:mt-6 w-full">

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
                className="magnetic group relative px-8 py-4 premium-btn text-white rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)] border border-slate-700 hover:border-sky-500"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '15px', letterSpacing: '0.15em' }}
              >
                {/* Glowing Aura Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-sky-400/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Metallic Shine Sweep */}
                <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shineSweep_1.5s_infinite_linear]" style={{ transform: 'skewX(-15deg)' }} />

                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-sky-400 animate-pulse transition-colors duration-300 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:to-white transition-all">LAUNCH SYSTEMS</span>
                  <span className="text-sky-500 group-hover:text-sky-400 transition-all duration-300 group-hover:translate-x-1.5 font-light">→</span>
                </span>
              </button>

              <a
                href="/Sanjay_Gawai_Resume14.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic px-8 py-3.5 border border-sky-500/50 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 rounded-full hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all text-center flex items-center justify-center gap-2 backdrop-blur-sm"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '14px', letterSpacing: '0.15em' }}
              >
                VIEW RESUME <span className="opacity-70">↗</span>
              </a>
            </div>
          </div>

          {/* ── Right Column (2/5 width) — SVG Blueprint ── */}
          <div className="md:col-span-2 flex justify-center items-center w-full mt-10 md:mt-0">
            <svg
              ref={svgRef}
              viewBox="0 0 500 500"
              className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Sun */}
                <radialGradient id="planet-sun" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffff00" />
                  <stop offset="60%" stopColor="#ff8800" />
                  <stop offset="100%" stopColor="#cc0000" />
                </radialGradient>

                {/* Mercury */}
                <radialGradient id="planet-mercury" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#cbd5e1" />
                  <stop offset="80%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#1e293b" />
                </radialGradient>

                {/* Venus */}
                <radialGradient id="planet-venus" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fed7aa" />
                  <stop offset="80%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#431407" />
                </radialGradient>

                {/* Earth */}
                <radialGradient id="planet-earth" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#bae6fd" />
                  <stop offset="80%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>

                {/* Mars */}
                <radialGradient id="planet-mars" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fecdd3" />
                  <stop offset="80%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#4c0519" />
                </radialGradient>

                {/* Jupiter */}
                <radialGradient id="planet-jupiter" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fef08a" />
                  <stop offset="80%" stopColor="#a16207" />
                  <stop offset="100%" stopColor="#422006" />
                </radialGradient>

                {/* Saturn */}
                <radialGradient id="planet-saturn" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e2e8f0" />
                  <stop offset="80%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>

                {/* Uranus */}
                <radialGradient id="planet-uranus" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#ccfbf1" />
                  <stop offset="80%" stopColor="#0f766e" />
                  <stop offset="100%" stopColor="#042f2e" />
                </radialGradient>
              </defs>
              {/* 1. Connection lines (Spokes) */}
              <path className="spoke spoke-1" d="M250 250 L250 80" stroke="#38bdf8" strokeWidth="2.5" />
              <path className="spoke spoke-2" d="M250 250 L383 144" stroke="#0ea5e9" strokeWidth="2.5" />
              <path className="spoke spoke-3" d="M250 250 L416 288" stroke="#38bdf8" strokeWidth="2.5" />
              <path className="spoke spoke-4" d="M250 250 L324 403" stroke="#0ea5e9" strokeWidth="2.5" />
              <path className="spoke spoke-5" d="M250 250 L176 403" stroke="#38bdf8" strokeWidth="2.5" />
              <path className="spoke spoke-6" d="M250 250 L84 288" stroke="#0ea5e9" strokeWidth="2.5" />
              <path className="spoke spoke-7" d="M250 250 L117 144" stroke="#38bdf8" strokeWidth="2.5" />

              {/* 2. Outer rings (spider-web style) */}
              <circle className="web-ring" cx="250" cy="250" r="170" stroke="#38bdf8" strokeWidth="1" opacity="0.4" strokeDasharray="6,6" />
              <circle className="web-ring" cx="250" cy="250" r="110" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" strokeDasharray="6,6" />

              {/* 3. Outer Nodes (Planets) */}
              {/* Node 1: PLANNING (Strategy) — Top */}
              <g className="outer-node outer-node-1">
                <circle cx="250" cy="80" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-mercury)" />
                <text x="250" y="74" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 800 }}>PLANNING</text>
                <text x="250" y="92" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600 }}>(STRATEGY)</text>
              </g>

              {/* Node 2: ANALYSIS (Requirements) — Top-Right */}
              <g className="outer-node outer-node-2">
                <circle cx="383" cy="144" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-venus)" />
                <text x="383" y="138" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 800 }}>ANALYSIS</text>
                <text x="383" y="156" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600 }}>(SPECS)</text>
              </g>

              {/* Node 3: DESIGN (Architecture) — Right */}
              <g className="outer-node outer-node-3">
                <circle cx="416" cy="288" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-earth)" />
                <text x="416" y="282" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 800 }}>DESIGN</text>
                <text x="416" y="300" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600 }}>(SYSTEM)</text>
              </g>

              {/* Node 4: IMPLEMENTATION (Coding) — Bottom-Right */}
              <g className="outer-node outer-node-4">
                <circle cx="324" cy="403" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-mars)" />
                <text x="324" y="397" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 800 }}>IMPLEMENT</text>
                <text x="324" y="415" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 600 }}>(CODEBASE)</text>
              </g>

              {/* Node 5: TESTING (QA) — Bottom-Left */}
              <g className="outer-node outer-node-5">
                <circle cx="176" cy="403" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-jupiter)" />
                <text x="176" y="397" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 800 }}>TESTING</text>
                <text x="176" y="415" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600 }}>(QA)</text>
              </g>

              {/* Node 6: DEPLOYMENT (Release) — Left */}
              <g className="outer-node outer-node-6">
                <ellipse cx="84" cy="288" rx="65" ry="12" fill="none" stroke="rgba(253,230,138,0.2)" strokeWidth="4" transform="rotate(-15 84 288)" />
                <circle cx="84" cy="288" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-saturn)" />
                <text x="84" y="282" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 800 }}>DEPLOY</text>
                <text x="84" y="300" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600 }}>(RELEASE)</text>
              </g>

              {/* Node 7: MAINTENANCE (Support) — Top-Left */}
              <g className="outer-node outer-node-7">
                <ellipse cx="117" cy="144" rx="8" ry="65" fill="none" stroke="rgba(165,243,252,0.2)" strokeWidth="2" transform="rotate(20 117 144)" />
                <circle cx="117" cy="144" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="url(#planet-uranus)" />
                <text x="117" y="138" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 800 }}>MAINTAIN</text>
                <text x="117" y="156" textAnchor="middle" fill="#334155" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 600 }}>(SUPPORT)</text>
              </g>

              {/* 4. Central Hub (Dynamic Sun/Moon) */}
              <g className="hub-node">
                {theme === 'light' ? (
                  <>
                    <circle cx="250" cy="250" r="85" fill="#fef08a" opacity="0.4" style={{ filter: 'drop-shadow(0 0 20px #fde047)' }} />
                    <circle cx="250" cy="250" r="65" stroke="#f59e0b" strokeWidth="3" fill="url(#planet-sun)" />
                    <circle cx="250" cy="250" r="55" fill="#fcd34d" opacity="0.3" />
                    <text x="250" y="260" textAnchor="middle" fill="#ffffff" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 900, letterSpacing: '0.05em', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>SDLC</text>
                  </>
                ) : (
                  <>
                    <circle cx="250" cy="250" r="75" fill="#e2e8f0" opacity="0.1" style={{ filter: 'drop-shadow(0 0 15px #cbd5e1)' }} />
                    <circle cx="250" cy="250" r="65" stroke="#94a3b8" strokeWidth="2" fill="#cbd5e1" />
                    {/* Moon craters */}
                    <circle cx="265" cy="235" r="8" fill="#94a3b8" opacity="0.4" />
                    <circle cx="235" cy="265" r="12" fill="#94a3b8" opacity="0.4" />
                    <circle cx="270" cy="265" r="5" fill="#94a3b8" opacity="0.4" />
                    <circle cx="225" cy="230" r="4" fill="#94a3b8" opacity="0.4" />
                    <text x="250" y="260" textAnchor="middle" fill="#0f172a" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 900, letterSpacing: '0.05em' }}>SDLC</text>
                  </>
                )}
              </g>

              {/* 5. Pulsing data flow dots along spokes */}
              <circle className="data-pulse" cx="250" cy="156" r="4" fill="#38bdf8" />
              <circle className="data-pulse" cx="323" cy="192" r="4" fill="#0ea5e9" />
              <circle className="data-pulse" cx="341" cy="271" r="4" fill="#38bdf8" />
              <circle className="data-pulse" cx="291" cy="334" r="4" fill="#0ea5e9" />
              <circle className="data-pulse" cx="209" cy="334" r="4" fill="#38bdf8" />
              <circle className="data-pulse" cx="159" cy="271" r="4" fill="#0ea5e9" />
              <circle className="data-pulse" cx="177" cy="192" r="4" fill="#38bdf8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
