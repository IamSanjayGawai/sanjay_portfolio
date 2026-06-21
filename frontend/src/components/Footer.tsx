import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Orbit } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket3D } from './Rocket3D';
import { Plane3D } from './Plane3D';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  const footerRef = useRef<HTMLElement>(null);

  // Rocket refs
  const launchContainerRef = useRef<HTMLDivElement>(null);
  const rocketSmokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const rocketParticlesRef = useRef<any[]>([]);

  // Plane refs
  const planeContainerRef = useRef<HTMLDivElement>(null);
  const planeRotationRef = useRef<HTMLDivElement>(null);
  const planeSmokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const planeParticlesRef = useRef<any[]>([]);

  // 1. Orbital Plane Animation
  useEffect(() => {
    if (!planeContainerRef.current || !planeRotationRef.current || !footerRef.current) return;

    const ctx = gsap.context(() => {
      const anim = { p: 0 };

      gsap.to(anim, {
        p: 1,
        duration: 15, // Smooth flight
        repeat: -1,
        repeatDelay: 2,
        ease: "power2.out", // Enters fast, then slows down
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Starts exactly when the user scrolls down to the footer
          toggleActions: "restart pause resume pause"
        },
        onUpdate: () => {
          if (!planeContainerRef.current || !planeRotationRef.current) return;
          const w = window.innerWidth;
          // Start just barely off-screen so it appears immediately
          const startX = -150;
          const endX = w + 150;
          const totalX = endX - startX;

          const x = startX + anim.p * totalX;

          // Arc height (the earth curve)
          const H = w * 0.12;

          const y = -Math.sin(anim.p * Math.PI) * H;

          const dx = totalX;
          const dy = -Math.cos(anim.p * Math.PI) * Math.PI * H;

          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          // 0 points DOWN in Plane3D. -90 points RIGHT.
          const rotationZ = angle - 90;

          gsap.set(planeContainerRef.current, { x, y });
          gsap.set(planeRotationRef.current, { rotationZ });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // 2. High Performance Local Smoke Canvas Loop for Plane
  useEffect(() => {
    const canvas = planeSmokeCanvasRef.current;
    if (!canvas || !planeContainerRef.current || !planeRotationRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastPlaneX = gsap.getProperty(planeContainerRef.current, "x") as number || 0;
    let lastPlaneY = gsap.getProperty(planeContainerRef.current, "y") as number || 0;

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentPlaneX = gsap.getProperty(planeContainerRef.current, "x") as number || 0;
      const currentPlaneY = gsap.getProperty(planeContainerRef.current, "y") as number || 0;
      const currentRotation = gsap.getProperty(planeRotationRef.current, "rotationZ") as number || 0;

      const deltaX = currentPlaneX - lastPlaneX;
      const deltaY = currentPlaneY - lastPlaneY;
      lastPlaneX = currentPlaneX;
      lastPlaneY = currentPlaneY;

      // Only emit if moving
      if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
        const angleRad = (currentRotation + 90) * (Math.PI / 180);
        const tailOffset = 30; // scaled down for footer plane
        const tailX = 128 - Math.cos(angleRad) * tailOffset;
        const tailY = 128 - Math.sin(angleRad) * tailOffset;

        // Footer plane is smaller, fewer particles
        for (let i = 0; i < 1; i++) {
          planeParticlesRef.current.push({
            x: tailX + (Math.random() - 0.5) * 6,
            y: tailY + (Math.random() - 0.5) * 6,
            vx: -Math.cos(angleRad) * (Math.random() * 1) + (Math.random() - 0.5) * 0.5,
            vy: -Math.sin(angleRad) * (Math.random() * 1) + (Math.random() - 0.5) * 0.5,
            life: 30 + Math.random() * 20,
            maxLife: 50,
            size: 1.5 + Math.random() * 2
          });
        }
      }

      const particles = planeParticlesRef.current;
      const isDark = document.documentElement.classList.contains('dark');
      const r = isDark ? 255 : 14;
      const g = isDark ? 165 : 165;
      const b = isDark ? 233 : 233;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Subtract plane movement to leave particles behind in world-space
        p.x -= deltaX;
        p.y -= deltaY;

        // Apply drift and expansion
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.2;

        // Fading out
        const progress = p.life / p.maxLife;
        const opacity = progress * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 3. Heavy Smoke Trail Loop (Runs continuously, emits when isLaunching)
  useEffect(() => {
    const canvas = rocketSmokeCanvasRef.current;
    const rocket = launchContainerRef.current;
    if (!canvas || !rocket) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed canvas covers the whole window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = rocket.getBoundingClientRect();
      // Calculate center bottom of the rocket engine in viewport coordinates
      const rocketX = rect.left + rect.width / 2;
      const rocketY = rect.top + rect.height / 2 + 80; // Adjusted so smoke connects directly to the rocket nozzle

      // No smoke at all until initialized. Heavy smoke during prep, massive trail during flight.
      const particleCount = isFlying ? 40 : (isLaunching ? 15 : 0);

      for (let i = 0; i < particleCount; i++) {
        rocketParticlesRef.current.push({
          x: rocketX + (Math.random() - 0.5) * (isFlying ? 30 : 80), // Wide spread during prep
          y: rocketY + (Math.random() - 0.5) * (isFlying ? 20 : 10),
          vx: (Math.random() - 0.5) * (isFlying ? 2 : 15), // Blast sideways during prep
          vy: Math.random() * (isFlying ? 35 : 3) + (isFlying ? 15 : 1), // Massively fast down during flight for trail
          life: 40 + Math.random() * (isFlying ? 120 : 40), // Lengthy smoke trail during flight
          maxLife: isFlying ? 160 : 80,
          size: (isFlying ? 35 : 40) + Math.random() * 20
        });
      }

      const particles = rocketParticlesRef.current;
      // Pure white smoke trail
      const r = 255;
      const g = 255;
      const b = 255;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.3; // Expand more slowly

        const progress = p.life / p.maxLife;
        const opacity = progress * 0.3; // Softer white smoke

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isLaunching]);

  const handleLaunch = () => {
    if (isLaunching || isFlying) return;
    setIsLaunching(true);
    setCountdown(3);
    document.body.style.pointerEvents = 'none';

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        startFlight();
      }
    }, 1000);
  };

  const startFlight = () => {
    setIsFlying(true);
    const rocket = launchContainerRef.current;
    if (!rocket) {
      setIsLaunching(false);
      setIsFlying(false);
      document.body.style.pointerEvents = '';
      return;
    }

    // Grab current absolute position on screen BEFORE reparenting
    const rect = rocket.getBoundingClientRect();
    const originalParent = rocket.parentNode;

    // Reparent the rocket directly to the body! 
    // This perfectly breaks it out of the footer's overflow-hidden and backdrop-blur filters,
    // allowing it to fly anywhere on the screen!
    document.body.appendChild(rocket);

    // Fix to viewport in exact same spot
    gsap.set(rocket, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      bottom: "auto",
      right: "auto",
      margin: 0,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      zIndex: 999999
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLaunching(false);
        setIsFlying(false);
        document.body.style.pointerEvents = '';
        gsap.set(rocket, { clearProps: "all" });
        // Send it back to the footer exactly where it belongs
        if (originalParent) {
          originalParent.appendChild(rocket);
        }
      }
    });

    // 1. Scroll page to top smoothly over 6 seconds
    tl.to([document.documentElement, document.body], {
      scrollTop: 0,
      duration: 6.0,
      ease: "power2.inOut"
    }, 0); // start at timeline 0

    // 2. Animate rocket physically flying UP the screen and off the top edge!
    tl.to(rocket, {
      top: -1000, // Fly off the top of the monitor
      duration: 6.0,
      ease: "power2.in" // Start slow (liftoff), end very fast
    }, 0); // start at timeline 0
  };

  return (
    <footer ref={footerRef} className="relative w-full h-[520px] md:h-[620px] overflow-hidden flex flex-col justify-end transition-colors duration-700 bg-transparent">

      {/* --- COSMIC STARS (Static) --- */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 pointer-events-none z-0">
        <div className="absolute w-[2px] h-[2px] bg-white/40 rounded-full top-[10%] left-[20%]" />
        <div className="absolute w-[3px] h-[3px] bg-white/60 rounded-full top-[15%] left-[80%]" />
        <div className="absolute w-[2px] h-[2px] bg-white/30 rounded-full top-[25%] left-[45%]" />
        <div className="absolute w-[1.5px] h-[1.5px] bg-sky-300 rounded-full top-[35%] left-[10%]" />
        <div className="absolute w-[2px] h-[2px] bg-white/50 rounded-full top-[40%] left-[90%]" />
        <div className="absolute w-[3px] h-[3px] bg-coral/40 rounded-full top-[50%] left-[60%]" />
        <div className="absolute w-[2px] h-[2px] bg-white/40 rounded-full top-[60%] left-[30%]" />
      </div>

      {/* --- CLOUDS BACKDROP (Static) --- */}
      <div
        className="absolute bottom-[28%] md:bottom-[23%] left-0 w-full z-0 pointer-events-none flex justify-center mix-blend-normal overflow-visible opacity-100"
        style={{
          maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
        }}
      >
        {/* Left Cloud */}
        <img
          src="/cloude2.png"
          alt="Cloud left"
          className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-20 transition-opacity duration-700"
          style={{ filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.15))' }}
        />
        {/* Right Cloud (Mirrored) */}
        <img
          src="/cloude2.png"
          alt="Cloud right"
          className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-20 transition-opacity duration-700"
          style={{
            filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.15))',
            transform: 'scaleX(-1)'
          }}
        />
      </div>

      {/* --- THE EARTH (Static) --- */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none flex flex-col justify-end overflow-hidden">
        {/* Light Mode: Earth Day */}
        <img
          src="/earth_day.png"
          alt="Earth Daytime"
          className="w-full h-auto object-cover block dark:hidden transition-all duration-700 ease-in-out translate-y-[30%] md:translate-y-[25%]"
        />
        {/* Dark Mode: Earth Night */}
        <img
          src="/earth_night.png"
          alt="Earth Nighttime"
          className="w-full h-auto object-cover hidden dark:block transition-all duration-700 ease-in-out translate-y-[30%] md:translate-y-[25%]"
        />
      </div>

      {/* --- ORBITAL PLANE ANIMATION --- */}
      <div className="absolute bottom-[20%] md:bottom-[25%] left-0 z-20 pointer-events-none overflow-visible w-full h-0">
        <div
          ref={planeContainerRef}
          className="absolute w-[256px] h-[256px] flex items-center justify-center -ml-[128px] -mt-[128px]"
        >
          <canvas
            ref={planeSmokeCanvasRef}
            width={256}
            height={256}
            className="absolute inset-0 z-0 pointer-events-none"
          />
          <div ref={planeRotationRef} className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-[0_10px_15px_rgba(14,165,233,0.3)]">
            <Plane3D scale={0.003} rotation={[Math.PI / 2, Math.PI, 0]} />
          </div>
        </div>
      </div>

      {/* --- FOOTER CONTENT (Overlaid on Earth) --- */}
      <div className="relative z-20 w-full pb-8">

        {/* --- SMOKE CANVAS (Moved inside z-20 so rocket z-50 can sit on top) --- */}
        <canvas
          ref={rocketSmokeCanvasRef}
          className="fixed inset-0 z-[40] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-6">

          {/* Main Footer Glassmorphism Card (Space Launching Station) */}
          <div className="relative bg-white/30 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 shadow-2xl mt-48">

            {/* Left — Logo */}
            <div className="flex items-center gap-3 order-1">
              <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10 drop-shadow-md">
                <rect x="1" y="1" width="34" height="34" rx="8" stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth="2" />
                <text x="18" y="24" textAnchor="middle" fill="currentColor" className="font-display text-[16px] font-black text-sky-600 dark:text-sky-400">SG</text>
              </svg>
              <div>
                <div className="font-display text-sm font-black text-slate-900 dark:text-white tracking-widest drop-shadow-md">SANJAY GAWAI</div>
                <div className="font-mono text-[10px] text-slate-700 dark:text-slate-300 font-bold tracking-widest">PORTFOLIO</div>
              </div>
            </div>

            {/* Center — Interactive Launch Pad */}
            <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-0 flex flex-col items-center justify-center z-50 order-3 md:order-2 mt-4 md:mt-0">

              {/* Holographic Countdown Floating Above Rocket */}
              {countdown !== null && (
                <div className="absolute top-[-100px] z-[200] pointer-events-none mix-blend-screen">
                  <span className="font-display text-[100px] font-black text-coral drop-shadow-[0_0_40px_rgba(255,87,51,1)] animate-pulse">
                    {countdown}
                  </span>
                </div>
              )}

              {/* Landing Pad Base Station Glow inside the Glass */}
              <div className="absolute bottom-[-10px] w-64 h-8 bg-slate-900/80 blur-xl rounded-full pointer-events-none" />

              <button
                onClick={handleLaunch}
                className="relative z-50 flex flex-col items-center justify-center w-36 h-36 rounded-full border-[3px] border-dashed border-slate-500/50 hover:border-coral hover:bg-coral/5 hover:shadow-[0_0_30px_rgba(255,87,51,0.2)] transition-all duration-500 group cursor-pointer overflow-visible bg-black/10 backdrop-blur-sm"
                title="Initiate Launch Sequence"
              >
                {/* Inner Metallic Ring */}
                <div className="absolute inset-2 border-2 border-slate-600/30 rounded-full flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-slate-900/60 blur-md" />
                </div>

                {/* STABLE WRAPPER to prevent React crash when moving the inner container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div ref={launchContainerRef} className="w-[450px] h-[450px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl flex items-center justify-center pointer-events-none z-[100]">
                    {/* Rotated left 90 deg on Z to stand vertical facing up */}
                    <Rocket3D scale={0.7} rotation={[0, 0, Math.PI / 2]} isSteady={isLaunching || isFlying} />

                    {/* Animated Thruster Flame Effect (Inside the container so it flies up WITH the rocket!) */}
                    {/* Using opacity instead of conditional rendering ensures React won't crash when this container moves! */}
                    <span className={`absolute bottom-[100px] w-12 h-32 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 animate-pulse rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${isFlying ? 'opacity-90' : 'opacity-0'}`} />
                  </div>
                </div>
              </button>

              <div className="relative mt-4 flex flex-col items-center h-12 pointer-events-none">
                {!isLaunching && !isFlying && (
                  <span className="font-mono text-xs font-black tracking-[0.3em] text-slate-800 dark:text-coral/80 drop-shadow-sm dark:drop-shadow-[0_0_5px_rgba(255,87,51,0.5)] transition-opacity px-4 py-1 border border-slate-300 dark:border-coral/20 rounded-sm bg-slate-200/80 dark:bg-coral/5 backdrop-blur-sm">
                    CLICK ON ROCKET
                  </span>
                )}
                {/* Empty placeholder to keep the height consistent during launch */}
                {(isLaunching || isFlying) && (
                  <span className="h-6 w-full" />
                )}
              </div>

              {/* Pad structural lines extending across the glass card */}
              <div className="hidden md:block absolute top-[85%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent pointer-events-none -z-10" />
            </div>

            {/* Right — Social Links */}
            <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mt-2 md:mt-0 order-2 md:order-3">
              <a
                href="https://github.com/IamSanjayGawai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 tracking-widest hover:text-coral dark:hover:text-coral transition-colors drop-shadow-sm"
              >
                <Github size={12} className="group-hover:scale-110 transition-transform duration-300" />
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/sanjay-gawai-74a6b815b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 tracking-widest hover:text-coral dark:hover:text-coral transition-colors drop-shadow-sm"
              >
                <Linkedin size={12} className="group-hover:scale-110 transition-transform duration-300" />
                LINKEDIN
              </a>
              <a
                href="mailto:sanjaygawai2026@gmail.com"
                className="group flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 tracking-widest hover:text-coral dark:hover:text-coral transition-colors drop-shadow-sm"
              >
                <Mail size={12} className="group-hover:scale-110 transition-transform duration-300" />
                EMAIL
              </a>
            </div>

          </div>

          {/* Copyright details */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 font-mono text-[9px] font-bold text-slate-700 dark:text-slate-400 tracking-widest gap-2">
            <span className="drop-shadow-md">
              © {currentYear} · DESIGNED & ENGINEERED BY SANJAY GAWAI
            </span>
            <span className="flex items-center gap-1 opacity-70">
              <Orbit size={10} />
              SYS: ORBITAL_v2.5.0
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
