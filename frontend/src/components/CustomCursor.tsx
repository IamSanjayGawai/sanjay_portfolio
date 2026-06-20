import { useEffect, useRef, useState } from 'react';
import { Plane } from 'lucide-react';

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
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(45);
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;

      let isMoving = false;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Calculate angle (in degrees)
        const theta = Math.atan2(dy, dx) * (180 / Math.PI);
        // Add 45 because the Plane icon points top-right natively (-45deg)
        setAngle(theta + 45);
        isMoving = true;
      }

      // Initialize lastPos if it's the first move
      if (lastPosRef.current.x === -100) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }

      setPosition({ x: e.clientX, y: e.clientY });

      // Add particles for smoke if moving
      if (isMoving && Math.random() > 0.2) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 4
        });
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Canvas rendering loop
    const renderCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle resize
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      // Loop backwards to safely remove elements
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.1; // Smoke expands

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        } else {
          const progress = p.life / p.maxLife;
          const opacity = (1 - progress) * 0.4; // Fade out

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          // Neutral grey smoke
          ctx.fillStyle = `rgba(156, 163, 175, ${opacity})`;
          ctx.fill();
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
        className="fixed top-0 left-0 pointer-events-none z-[10001] flex items-center justify-center transition-transform duration-75 ease-out mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${isHovering ? 1.5 : 1})`
        }}
      >
        <Plane className={`w-6 h-6 transition-colors duration-300 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`} fill="currentColor" />
      </div>
    </>
  );
};

export default CustomCursor;
