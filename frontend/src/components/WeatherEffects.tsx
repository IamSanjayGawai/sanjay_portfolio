import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function WeatherEffects() {
  const { weather, theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (weather === 'clear') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const initParticles = () => {
      particles = [];
      const particleCount = weather === 'rainy' ? 200 : (weather === 'summer' ? 40 : 120);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: weather === 'rainy' ? Math.random() * 1 + 0.5 : (weather === 'summer' ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1),
          speedY: weather === 'rainy' ? Math.random() * 15 + 15 : (weather === 'summer' ? Math.random() * 0.5 - 0.25 : Math.random() * 2 + 1),
          speedX: weather === 'rainy' ? Math.random() * 2 - 1 : (weather === 'summer' ? Math.random() * 0.5 - 0.25 : Math.random() * 2 - 1),
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw lightning flashes for rain occasionally
      if (weather === 'rainy' && Math.random() < 0.003) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (weather === 'rainy') {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.speedY * 1.5);
          
          const rainColor = theme === 'light' ? '71, 85, 105' : '150, 180, 255';
          ctx.strokeStyle = `rgba(${rainColor}, ${p.opacity})`;
          
          ctx.lineWidth = p.radius;
          ctx.stroke();
          ctx.beginPath(); // reset path for next line
        } else {
          ctx.moveTo(p.x, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
        }

        p.y += p.speedY;
        p.x += p.speedX;

        // Add slight wobble to snow and pollen
        if (weather === 'winter' || weather === 'summer') {
          p.x += Math.sin(p.y * 0.05) * 0.5;
        }

        // Reset particle to top (or wrap around for summer dust)
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 10;
        }
        
        if (p.x > width + 20) p.x = -10;
        if (p.x < -20) p.x = width + 10;
      }

      if (weather === 'winter') {
        // Pure white snow in both modes, slightly transparent to look like snow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();
      } else if (weather === 'summer') {
        // Golden dust motes / pollen floating in the air
        ctx.fillStyle = 'rgba(253, 224, 71, 0.7)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [weather, theme]);

  if (weather === 'clear') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden transition-opacity duration-1000">
      {/* Summer mode uses the native light theme colors without ambient tints, only pollen particles are rendered via canvas */}

      {/* Winter Ambient Tint (Needs to be dark enough in light mode to see white snow) */}
      {weather === 'winter' && (
        <div className="absolute inset-0 bg-sky-800/30 dark:bg-sky-950/20 mix-blend-multiply transition-colors duration-1000" />
      )}

      {/* Rainy Ambient Tint (Overcast & Cloudy) */}
      {weather === 'rainy' && (
        <div className="absolute inset-0 bg-slate-800/50 dark:bg-slate-950/30 mix-blend-multiply transition-colors duration-1000" />
      )}

      {(weather === 'rainy' || weather === 'winter' || weather === 'summer') && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${weather === 'rainy' ? 'opacity-60' : 'opacity-80'}`}
        />
      )}
    </div>
  );
}
