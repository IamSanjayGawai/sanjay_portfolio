import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane3D } from '../Plane3D';

gsap.registerPlugin(ScrollTrigger);

// --- BOARDING PASS COMPONENT ---
const BoardingPassCard = ({ exp, index }: { exp: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Hover Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (window.innerWidth < 768) return;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const isLeft = index % 2 === 0;
  const isCompleted = exp.period === 'Completed' || exp.period.includes('2023') || exp.period.includes('2024');

  return (
    <div
      className={`timeline-item relative w-full flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="hidden md:block w-1/2"></div>
      <div className="w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0" style={{ perspective: '1000px' }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative flex flex-row glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] border-slate-200/10 dark:bg-slate-900/30 ${isLeft ? 'md:mr-16' : 'md:ml-16'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="hidden sm:flex w-16 md:w-20 bg-slate-100 dark:bg-[#0a0a0a] border-r-2 border-dashed border-slate-300 dark:border-slate-800 flex-col items-center justify-between py-6 relative shrink-0">
            <span className="[writing-mode:vertical-lr] text-slate-400 dark:text-slate-600 font-mono text-[10px] tracking-[0.3em] uppercase rotate-180">
              BOARDING PASS
            </span>
            <div className="flex flex-col gap-1 w-full px-3 mt-4 opacity-50 dark:opacity-30">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="bg-slate-900 dark:bg-white w-full" style={{ height: `${Math.random() * 3 + 1}px` }}></div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-5 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.15] overflow-hidden">
                <div className="border-[8px] border-emerald-500 text-emerald-500 font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase px-4 py-2 rounded-xl" style={{ transform: 'rotate(-25deg)' }}>
                  {exp.type === 'education' ? 'GRADUATED' : 'COMPLETED'}
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4 border-b border-slate-100 dark:border-white/5 pb-3 relative z-10">
              <div className="pr-2">
                <div className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">PASSENGER</div>
                <div className="font-bold font-display text-slate-800 dark:text-slate-200 uppercase tracking-wide text-xs md:text-sm">Sanjay Gawai</div>
              </div>
              <div className="text-right">
                <div className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">DATE</div>
                <div className="font-mono text-sky-500 font-bold text-xs">{exp.period}</div>
              </div>
            </div>

            <div className="relative p-[1.5px] rounded-lg mb-3 z-10 overflow-hidden shadow-[0_0_15px_rgba(14,165,233,0.1)]">
              {/* Spinning glowing border effect */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0ea5e9_50%,transparent_100%)] opacity-80"></div>
              
              {/* Opaque inner box for perfect text readability */}
              <div className="relative bg-slate-50 dark:bg-[#0b1120] rounded-lg p-3 h-full w-full">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
                  <div className="text-[9px] font-mono text-sky-500 uppercase tracking-wider font-bold">MISSION DIRECTIVE</div>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1 leading-tight">{exp.title}</h3>
                <p className="text-[11px] md:text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{exp.description}</p>
              </div>
            </div>

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="space-y-1 hidden sm:block relative z-10 mb-2">
                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider mb-1">FLIGHT LOGS</div>
                {exp.achievements.map((a: string, i: number) => (
                  <div key={i} className="flex text-[11px] text-slate-600 dark:text-slate-500 items-start">
                    <span className="text-sky-500 mr-2 opacity-50">+</span> {a}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-between items-end border-t border-slate-100 dark:border-white/5 pt-3 relative z-10">
              <div className="flex items-center gap-2">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-6 w-6 object-cover rounded bg-white dark:bg-transparent"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + exp.company.charAt(0) + '&background=0ea5e9&color=fff';
                  }}
                />
                <span className="text-xs font-display text-slate-900 dark:text-white font-bold tracking-wide uppercase line-clamp-1">{exp.company}</span>
              </div>
              <div className="text-right text-[8px] font-mono text-slate-400 shrink-0">CLASS: {exp.type.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const planeContainerRef = useRef<HTMLDivElement>(null);
  const planeRotationRef = useRef<HTMLDivElement>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const scrollVelocityRef = useRef<number>(0);

  const [svgHeight, setSvgHeight] = useState(1000);
  const [cardCenters, setCardCenters] = useState<number[]>([]);
  const cardCentersRef = useRef<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    {
      type: 'work',
      title: 'Technical Lead & Operations Head',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'May 2026 – Present',
      location: 'Pune, India',
      description: 'Directing the overall technical strategy, portfolio operations, and engineering lifecycles for all platforms. Architecting proprietary automation infrastructure to optimize deployments and streamline ecosystem scalability.',
      achievements: [
        'Managing complete platform portfolios and core infrastructure release pipelines',
        'Directing zero-to-one proprietary automation systems to accelerate development velocity',
        'Overseeing team coordination, architectural planning, and technology adoption strategies'
      ],
    },
    {
      type: 'work',
      title: 'Founding Engineer — RingBuzz (Product Lead)',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'May 2026 – Present',
      location: 'Pune, India',
      description: 'Led the design, development, and production deployment of RingBuzz, a real-time virtual economy platform. Engineered the WebRTC call infrastructure and secured the dual-token virtual ledger.',
      achievements: [
        'Optimizing WebRTC turn/stun server latency for audio/video calling',
        'Enforcing database-level ledger security using PostgreSQL Row-Level Security (RLS)',
        'Managing transaction integrity across recharge, gifting, and withdrawal flows'
      ],
    },
    {
      type: 'work',
      title: 'Founding Engineer — DhanSource (Fintech Product Lead)',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'Oct 2025 – Jun 2026',
      location: 'Pune, India',
      description: 'Built the Channel Partner mobile application for DhanSource Capital from scratch. Standardized automated KYC pipelines and built dynamic PDF contract generation.',
      achievements: [
        'Developing the cross-platform partner mobile app using React Native & Expo Router',
        'Building an automated KYC pipeline with document verification state machines',
        'Engineering dynamic PDF agreement generation and signature embedding using pdf-lib'
      ],
    },
    {
      type: 'work',
      title: 'Team Lead',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'Sep 2025 – Oct 2025',
      location: 'Pune, India',
      description: 'Stepped up to coordinate development teams, direct architecture reviews, and oversee sprint deliverables for multi-role workflows and backend systems.',
      achievements: [
        'Leading task planning, sprint execution, and code reviews for backend API integration',
        'Mentoring junior engineers and interns on system designs and testing pipelines'
      ],
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'Aug 2025 – Sep 2025',
      location: 'Pune, India',
      description: 'Transitioned to full-stack execution, building clean responsive management panels and integrating client interfaces with scalable backend layers.',
      achievements: [
        'Developing multi-role dashboards and admin panels with Redux Toolkit state managers',
        'Bridging user interfaces and RESTful microservices for loan verification systems'
      ],
    },
    {
      type: 'work',
      title: 'Backend Engineer',
      logo: '/placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'Aug 2025',
      location: 'Pune, India',
      description: 'Joined as a backend engineer to design database schemas, write scalable REST APIs, and implement secure JWT authentication systems.',
      achievements: [
        'Designing scalable relational schemas and optimizing complex data queries',
        'Building authentication and authorization layers for core backend systems'
      ],
    },
    {
      type: 'work',
      title: 'Freelance Frontend Developer',
      logo: '/toads.jpeg',
      company: 'Toads Academy',
      period: '2025',
      location: 'Remote',
      description: 'Designed and developed a complete educational platform website with modern responsive UI/UX using Node.js and Bootstrap.',
      achievements: ['Completed project ahead of schedule', 'Enhanced user experience with responsive design'],
    },
    {
      type: 'work',
      title: 'Full Stack Software Engineer',
      logo: '/careersurvival.jpeg',
      company: 'Career Survival Japan',
      period: 'Jan 2024 – Aug 2025',
      location: 'Remote',
      description: 'Delivered production-grade applications for Japanese B2B clients. Managed end-to-end SDLC including requirements gathering, architecture, and cloud deployment.',
      achievements: [
        'Built Asnaro machinery rental e-commerce platform',
        'Integrated secure payment APIs and real-time chat'
      ],
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      logo: '/placeholder.svg',
      company: 'Vibencode',
      period: 'Sep 2023 – Dec 2023',
      location: 'Remote',
      description: 'Assisted in frontend development using React.js and Redux Toolkit. Worked with backend APIs, Node.js, and MongoDB for web and data integration.',
      achievements: [
        'Collaborated with developers using Git and Agile workflows',
      ],
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      logo: '/placeholder.svg',
      company: 'Code Inbound LLP',
      period: 'Jun 2023 – Sep 2023',
      location: 'Remote',
      description: 'Worked on frontend development for NMS (Network Monitoring System) dashboards and monitoring interfaces. Implemented reusable UI components and API integrations using React.js.',
      achievements: [
        'Collaborated with developers using Git for version control and debugging',
      ],
    },
    {
      type: 'education',
      title: 'Bachelor of Technology, Electronics',
      logo: '/placeholder.svg',
      company: 'CSMSS Chh. Shahu College of Engineering',
      period: 'Completed',
      location: 'Aurangabad, India',
      description: 'Focused on core electronics, embedded systems, and foundational computer science principles. Participated in multiple technical symposiums and hackathons.',
      achievements: ['Graduated with Distinction', 'Led final year technical project'],
    },
    {
      type: 'education',
      title: 'Diploma, Computer Engineering',
      logo: '/placeholder.svg',
      company: 'CSMSS Chh. Shahu College of Engineering',
      period: 'Completed',
      location: 'Aurangabad, India',
      description: 'Gained hands-on experience in software development, data structures, algorithms, and database management.',
      achievements: ['Top performer in programming labs'],
    },
    {
      type: 'education',
      title: 'HSC, Science',
      logo: '/placeholder.svg',
      company: 'Deogiri College',
      period: 'Completed',
      location: 'Aurangabad, India',
      description: 'Completed higher secondary education with a strong focus on mathematics and physical sciences.',
      achievements: [],
    }
  ];

  // Map exact physical Y to X based on card centers
  const getPlaneX = (y: number, centers: number[]) => {
    const amplitude = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 250;
    if (centers.length === 0) return 0;

    if (y <= centers[0]) {
      const f = Math.max(0, y / centers[0]);
      return Math.sin(f * Math.PI / 2) * amplitude;
    }

    const N = centers.length;
    if (y >= centers[N - 1]) {
      const i = N - 1;
      const lastX = (i % 2 === 0 ? 1 : -1) * amplitude;
      return lastX;
    }

    for (let i = 0; i < N - 1; i++) {
      if (y >= centers[i] && y < centers[i + 1]) {
        const L = centers[i + 1] - centers[i];
        const f = (y - centers[i]) / L;
        const sign = i % 2 === 0 ? 1 : -1;
        return sign * Math.cos(f * Math.PI) * amplitude;
      }
    }
    return 0;
  };

  const getPlaneDxDy = (y: number, centers: number[]) => {
    const amplitude = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 250;
    if (centers.length === 0) return { dx: 0, dy: 1 };

    if (y <= centers[0]) {
      const f = Math.max(0, y / centers[0]);
      const dx_dy = (Math.cos(f * Math.PI / 2) * (Math.PI / 2) * amplitude) / centers[0];
      return { dx: dx_dy, dy: 1 };
    }

    const N = centers.length;
    if (y >= centers[N - 1]) {
      return { dx: 0, dy: 1 };
    }

    for (let i = 0; i < N - 1; i++) {
      if (y >= centers[i] && y < centers[i + 1]) {
        const L = centers[i + 1] - centers[i];
        const f = (y - centers[i]) / L;
        const sign = i % 2 === 0 ? 1 : -1;
        const dx_dy = sign * (-Math.sin(f * Math.PI) * Math.PI * amplitude) / L;
        return { dx: dx_dy, dy: 1 };
      }
    }
    return { dx: 0, dy: 1 };
  };

  useEffect(() => {
    if (timelineRef.current) {
      const handleResize = () => {
        const containerEl = timelineRef.current;
        if (!containerEl) return;
        setSvgHeight(containerEl.offsetHeight);

        const centers = cardRefs.current.map(el => {
          if (!el) return 0;
          let y = 0;
          let currentEl: HTMLElement | null = el;
          while (currentEl && currentEl !== containerEl) {
            y += currentEl.offsetTop;
            currentEl = currentEl.offsetParent as HTMLElement;
          }
          return y + el.offsetHeight / 2;
        });
        cardCentersRef.current = centers;
        setCardCenters(centers);
      };
      
      handleResize();
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 500);

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // High Performance Local Smoke Canvas Loop
  useEffect(() => {
    const canvas = smokeCanvasRef.current;
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

      // Decay velocity so smoke stops naturally when scroll stops
      scrollVelocityRef.current *= 0.9;

      // Emit new particles if moving
      if (Math.abs(scrollVelocityRef.current) > 10) {
        const angleRad = (currentRotation + 90) * (Math.PI / 180);
        const tailOffset = 60;
        const tailX = 256 - Math.cos(angleRad) * tailOffset;
        const tailY = 256 - Math.sin(angleRad) * tailOffset;

        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: tailX + (Math.random() - 0.5) * 10,
            y: tailY + (Math.random() - 0.5) * 10,
            vx: -Math.cos(angleRad) * (Math.random() * 2) + (Math.random() - 0.5),
            vy: -Math.sin(angleRad) * (Math.random() * 2) + (Math.random() - 0.5),
            life: 40 + Math.random() * 20,
            maxLife: 60,
            size: 2 + Math.random() * 4
          });
        }
      }

      const particles = particlesRef.current;
      const isDark = document.documentElement.classList.contains('dark');
      const r = isDark ? 255 : 14;
      const g = isDark ? 255 : 165;
      const b = isDark ? 255 : 233;
      const rCenter = isDark ? 200 : 2;
      const gCenter = isDark ? 240 : 132;
      const bCenter = isDark ? 255 : 199;

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
        p.size += 0.3;

        // Fading out
        const progress = p.life / p.maxLife;
        const opacity = progress * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rCenter}, ${gCenter}, ${bCenter}, ${opacity * 0.8})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    if (!timelineRef.current || !planeContainerRef.current || !planeRotationRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.normalizeScroll(true);

      const timer = setTimeout(() => {
        const xTo = gsap.quickTo(planeContainerRef.current, "x", { duration: 0.1, ease: "power2.out" });
        const yTo = gsap.quickTo(planeContainerRef.current, "y", { duration: 0.1, ease: "power2.out" });

        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1.2,
          onUpdate: (self) => {
            if (!planeContainerRef.current || !timelineRef.current) return;

            const progress = self.progress;
            const h = timelineRef.current.offsetHeight;

            // Physical Y inside the timeline container
            const y = progress * h;
            const x = getPlaneX(y, cardCentersRef.current);
            const scrollVelocity = self.getVelocity();
            scrollVelocityRef.current = scrollVelocity;
            const { dx, dy } = getPlaneDxDy(y, cardCentersRef.current);

            if (Math.abs(scrollVelocity) > 10) {
              let targetRotation = 0;
              if (scrollVelocity > 0) {
                targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
              } else {
                targetRotation = Math.atan2(-dy, -dx) * (180 / Math.PI) - 90;
              }

              gsap.to(planeRotationRef.current, {
                rotationZ: targetRotation,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }

            // Fade out the plane at the very bottom to prevent it from overlapping 
            // the next section (since the plane div is 512px tall and overflows its center)
            let targetOpacity = 1;
            if (progress > 0.96) {
              targetOpacity = 0; // Fade out before hitting the bottom boundary
            }

            gsap.to(planeContainerRef.current, {
              opacity: targetOpacity,
              duration: 0.3,
              overwrite: 'auto'
            });

            xTo(x);
            yTo(y);
          }
        });

        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const generatePath = () => {
    let d = `M 0 0 `;
    // Draw the path using a loop over physical Y pixels
    const step = 20; 
    for (let y = 0; y <= svgHeight; y += step) {
      const x = getPlaneX(y, cardCenters);
      d += `L ${x} ${y} `;
    }
    // ensure last point connects
    const finalX = getPlaneX(svgHeight, cardCenters);
    d += `L ${finalX} ${svgHeight} `;
    return d;
  };

  return (
    <div ref={sectionRef} className="py-20 bg-transparent overflow-hidden relative">

      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 relative z-20">

        <div className="text-center relative z-20 opacity-100 mb-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display text-slate-900 dark:text-white">
            Professional <span className="text-sky-500">Experience</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-body">
            A chronological timeline of my career trajectory and educational checkpoints.
          </p>
        </div>

        <div className="timeline-container relative pt-32 pb-10 z-30" ref={timelineRef}>

          {/* Dash flight path SVG */}
          <svg className="absolute top-0 left-[20px] md:left-1/2 w-px h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
            <path
              d={generatePath()}
              fill="none"
              stroke="url(#planePathGradient)"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              className="opacity-30 dark:opacity-40"
            />
            <defs>
              <linearGradient id="planePathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* The 3D Airplane Container */}
          <div
            ref={planeContainerRef}
            className="absolute left-[20px] md:left-1/2 top-0 z-30 w-[512px] h-[512px] flex items-center justify-center -ml-[256px] -mt-[256px] pointer-events-none"
          >
            {/* High Performance Local Smoke Canvas */}
            <canvas 
              ref={smokeCanvasRef}
              width={512}
              height={512}
              className="absolute inset-0 z-0 pointer-events-none"
            />
            
            <div 
              ref={planeRotationRef} 
              className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-[0_20px_25px_rgba(14,165,233,0.4)]"
            >
              <Plane3D scale={0.006} rotation={[Math.PI / 2, Math.PI, 0]} />
            </div>
          </div>

          <div className="flex flex-col relative z-10 w-full">
            {experiences.map((exp, index) => (
              <div key={index} className="relative w-full min-h-[100vh] flex flex-col justify-center py-20" ref={el => { if (el) cardRefs.current[index] = el; }}>
                {index < experiences.length - 1 && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[2000px] h-[500px] z-0 pointer-events-none flex justify-center mix-blend-normal overflow-visible opacity-100"
                    style={{
                      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                    }}
                  >
                    <div className="absolute top-1/2 left-0 w-full flex justify-center opacity-100 dark:opacity-20 transform -translate-y-1/2 scale-100">
                      <img src="/cloude2.png" alt="Cloud" className="w-1/2 h-auto object-cover object-bottom brightness-100 drop-shadow-[0px_0px_40px_rgba(0,0,0,0.3)] transition-opacity duration-700" />
                      <img src="/cloude2.png" alt="Cloud" className="w-1/2 h-auto object-cover object-bottom brightness-100 drop-shadow-[0px_0px_40px_rgba(0,0,0,0.3)] transition-opacity duration-700 transform scale-x-[-1]" />
                    </div>
                  </div>
                )}
                
                <div className="relative z-10 w-full">
                  <BoardingPassCard exp={exp} index={index} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;