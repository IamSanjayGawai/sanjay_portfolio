import { useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorWrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  const mouseState = useRef({
    lastX: -100,
    lastY: -100,
    isHovering: false,
    particlesActive: false
  });

  useEffect(() => {
    if (!cursorWrapperRef.current) return;

    // Center the element naturally so GSAP x/y act from the center
    gsap.set(cursorWrapperRef.current, { xPercent: -50, yPercent: -50, rotation: 45 });

    // GSAP quickTo for buttery smooth, high-performance tracking
    const xTo = gsap.quickTo(cursorWrapperRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorWrapperRef.current, "y", { duration: 0.15, ease: "power3.out" });
    const rotTo = gsap.quickTo(cursorWrapperRef.current, "rotation", { duration: 0.2, ease: "power2.out" });
    const scaleTo = gsap.quickTo(cursorWrapperRef.current, "scale", { duration: 0.2, ease: "back.out(1.5)" });

    let animationFrameId: number;

    const updatePosition = (e: MouseEvent) => {
      const dx = e.clientX - mouseState.current.lastX;
      const dy = e.clientY - mouseState.current.lastY;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const theta = Math.atan2(dy, dx) * (180 / Math.PI);
        rotTo(theta + 45);
        
        // Spawn particles
        if (Math.random() > 0.2) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 0,
            maxLife: 20 + Math.random() * 15,
            size: 2 + Math.random() * 3
          });
          mouseState.current.particlesActive = true;
        }
      }

      xTo(e.clientX);
      yTo(e.clientY);

      mouseState.current.lastX = e.clientX;
      mouseState.current.lastY = e.clientY;
    };

    const handleMouseEnter = () => {
      mouseState.current.isHovering = true;
      scaleTo(1.5);
    };
    
    const handleMouseLeave = () => {
      mouseState.current.isHovering = false;
      scaleTo(1);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const renderCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Optimize: Only clear and draw if there are active particles
      if (mouseState.current.particlesActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let aliveParticles = false;

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.size += 0.1;

          if (p.life >= p.maxLife) {
            particlesRef.current.splice(i, 1);
          } else {
            aliveParticles = true;
            const progress = p.life / p.maxLife;
            const opacity = (1 - progress) * 0.4;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(156, 163, 175, ${opacity})`;
            ctx.fill();
          }
        }
        
        if (!aliveParticles) {
          mouseState.current.particlesActive = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      animationFrameId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      cancelAnimationFrame(animationFrameId);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[10000]"
      />
      <div
        ref={cursorWrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] flex items-center justify-center mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <Plane className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" fill="currentColor" />
      </div>
    </>
  );
};

export default CustomCursor;
