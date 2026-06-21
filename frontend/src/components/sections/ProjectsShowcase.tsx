import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const showcaseProjects = [
  {
    id: 10,
    title: 'DHANSOURCE',
    subtitle: 'Fintech Loan Management',
    color: 'coral' as const,
    description:
      'Channel partner app for DhanSource Capital — Expo-based mobile app with KYC automation, dynamic PDF generation/signing, and real-time loan tracking.',
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'pdf-lib', 'Socket.io'],
    images: [
      '/dhansource/dhansource-1.jpeg',
      '/dhansource/dhansource-2.jpeg',
      '/dhansource/dhansource-3.jpeg',
      '/dhansource/dhansource-4.jpeg',
    ],
  },
  {
    id: 1,
    title: 'ASNARO',
    subtitle: 'Japanese E-Commerce Platform',
    color: 'cyber' as const,
    description:
      'Specialized Japanese machinery rental e-commerce with multi-vendor support, real-time quotation system, GMO payment integration, and PDF chat workflows.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    images: [
      '/asnaro-home.png',
      '/asnaro-dashboard.png',
      '/asnaro-admin.png',
      '/asnaro-product.png',
    ],
  },
  {
    id: 11,
    title: 'RINGBUZZ',
    subtitle: 'Social Economy Platform',
    color: 'coral' as const,
    description:
      'Dual-token virtual ledger economy with WebRTC 1-on-1 audio/video calling. PostgreSQL RLS triggers prevent ledger fraud across gift, recharge, and withdrawal flows.',
    tech: ['React Native', 'PostgreSQL', 'WebRTC', 'Redis', 'Supabase', 'GetStream SDK'],
    images: [
      '/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.56 PM (1).jpeg',
      '/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.59 PM (1).jpeg',
      '/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM (2).jpeg',
      '/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM.jpeg',
    ],
  },
  {
    id: 5,
    title: 'FUNZO',
    subtitle: 'Live Streaming & PK Battle Platform',
    color: 'cyber' as const,
    description:
      'Microservices-inspired live streaming and social platform with PK battles. Redis Pub/Sub cache handles 500ms real-time updates for concurrent sessions.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.IO', 'Redis', 'Agora', 'AWS'],
    images: [
      '/funzo-mobile-home.png',
      '/funzo-mobile-live.png',
      '/funzo-mobile-chat.png',
      '/funzo-mobile-profile.png',
    ],
  },
];

const ProjectsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectSections = gsap.utils.toArray<HTMLElement>('.project-parallax-section');

      const isDesktop = window.innerWidth >= 1024;

      projectSections.forEach((section) => {
        if (isDesktop) {
          const floatingImages = section.querySelectorAll('.floating-img');

          floatingImages.forEach((img, i) => {
            // Fast and smooth scrub (0.5s smoothing) instead of 1.5 to reduce delay
            const yOffset = i % 2 === 0 ? 100 : -100;

            gsap.fromTo(
              img,
              { y: yOffset },
              {
                y: -yOffset,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5, // Buttery smooth 1.5s glide
                },
              }
            );
          });
        }

        // Fast fade-in for text block to feel snappy
        const textBlock = section.querySelector('.text-block');
        if (textBlock) {
          gsap.fromTo(
            textBlock,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top center+=150',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-transparent overflow-hidden">
      {/* Global Title */}
      <div className="relative z-30 pt-24 pb-12 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <span className="font-mono text-[10px] sm:text-xs text-bone/70 tracking-[0.3em] sm:tracking-[0.5em] uppercase block mb-4 drop-shadow-md">Core Systems</span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-8xl text-bone/60 font-bold tracking-widest md:whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] leading-tight">
            SELECTED WORKS
          </h2>
        </div>
      </div>

      {showcaseProjects.map((project, idx) => {
        const isCoral = project.color === 'coral';

        // Strict 4-image layout: 2 Left (Front/Back), 2 Right (Front/Back)
        const positions = [
          // Left Side - Front (Large)
          { top: '25%', left: '4%', zIndex: 10, width: 'w-56 md:w-80 lg:w-[22rem]', rotate: 'rotate-2' },
          // Left Side - Back (Small, peeks from top right of the front one)
          { top: '12%', left: '12%', zIndex: 5, width: 'w-48 md:w-64 lg:w-[18rem]', rotate: '-rotate-6' },

          // Right Side - Front (Large)
          { bottom: '25%', right: '4%', zIndex: 10, width: 'w-56 md:w-80 lg:w-[22rem]', rotate: '-rotate-2' },
          // Right Side - Back (Small, peeks from bottom left of the front one)
          { bottom: '12%', right: '12%', zIndex: 5, width: 'w-48 md:w-64 lg:w-[18rem]', rotate: 'rotate-6' },
        ];

        return (
          <section
            key={project.id + project.title}
            className="project-parallax-section relative w-full md:min-h-screen flex flex-col justify-center py-16 md:py-32"
          >
            {/* Background elements */}
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${isCoral ? 'coral' : 'cyber'}/5 to-transparent opacity-30 pointer-events-none`} />

            {/* Premium Cloud Image Backdrop - BOTTOM */}
            <div
              className="absolute bottom-0 left-0 w-full z-10 pointer-events-none flex justify-center overflow-visible opacity-100"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
              }}
            >
              {/* Left Cloud */}
              <img
                src="/cloude2.png"
                alt="Cloud left"
                className="w-1/2 h-auto object-cover object-right-bottom opacity-90"
              />
              {/* Right Cloud (Mirrored for perfect seamless join in the center) */}
              <img
                src="/cloude2.png"
                alt="Cloud right"
                className="w-1/2 h-auto object-cover object-right-bottom opacity-90"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>

            {project.images.length > 0 ? (
              <div className="relative w-full max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 items-center">

                {/* Left Images Column */}
                <div className="hidden lg:flex justify-center items-center relative z-10 w-full h-[70vh]">
                  {project.images.slice(0, 2).map((imgSrc, imgIdx) => {
                    const isFront = imgIdx === 0;
                    const isDesktop =
                      !project.title.toLowerCase().includes('asnaro') &&
                      (project.title.toLowerCase().includes('brandwave') ||
                        imgSrc.toLowerCase().includes('desktop') ||
                        imgSrc.toLowerCase().includes('website') ||
                        imgSrc.toLowerCase().includes('admin'));

                    return (
                      <div
                        key={`wrapper-${imgIdx}`}
                        className={`group transition-all duration-300 hover:z-50 ${isFront ? 'relative z-20 -translate-x-[15%] lg:-translate-x-[20%]' : 'absolute z-10 translate-x-[15%] lg:translate-x-[20%] translate-y-4 scale-[0.95]'
                          }`}
                      >
                        <div className="floating-img cursor-pointer">
                          <div className="transition-transform duration-300 group-hover:scale-[1.05]">
                            {isDesktop ? (
                              /* Premium Laptop Mockup */
                              <div className="relative w-[28vw] max-w-[420px] shadow-2xl">
                                {/* Screen Frame */}
                                <div className="relative rounded-t-xl rounded-b-sm border-[6px] md:border-[10px] border-[#1a1a1a] bg-black shadow-2xl overflow-hidden aspect-video">
                                  <img
                                    src={imgSrc}
                                    alt={`${project.title} screenshot ${imgIdx + 1}`}
                                    className="w-full h-full object-cover block"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                                  />
                                  {/* Camera Dot */}
                                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#333] rounded-full" />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                                </div>
                                {/* Laptop Base */}
                                <div className="relative h-1.5 md:h-2 w-[115%] -ml-[7.5%] bg-gradient-to-b from-[#b3b3b3] to-[#666666] rounded-b-lg rounded-t-sm shadow-[0_15px_25px_rgba(0,0,0,0.5)] z-10 flex justify-center">
                                  {/* Base Notch */}
                                  <div className="w-1/6 h-[40%] bg-[#8c8c8c] rounded-b-sm shadow-inner" />
                                </div>
                              </div>
                            ) : (
                              /* Premium iPhone Mockup */
                              <div className={`p-1.5 md:p-2 rounded-[1.8rem] border-[3px] ${isCoral ? 'border-coral/20' : 'border-cyber/20'} bg-slate-100 dark:bg-[#1a1a1a] shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}>
                                <div className="relative rounded-[1.4rem] overflow-hidden bg-black aspect-[9/19.5] w-[15vw] max-w-[220px]">
                                  <img
                                    src={imgSrc}
                                    alt={`${project.title} screenshot ${imgIdx + 1}`}
                                    className="w-full h-full object-cover block"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                                  />
                                  {/* Dynamic Island */}
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[16px] bg-black rounded-full z-10 shadow-sm flex items-center justify-end px-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]" />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Central Typography Block */}
                <div className="text-block lg:col-span-2 relative z-30 w-full max-w-md lg:max-w-lg mx-auto text-center bg-white/90 dark:bg-[#0d0d0d]/90 border border-slate-200 dark:border-sky-500/20 shadow-2xl p-6 md:p-10 rounded-2xl">
                  <span className={`font-display text-6xl md:text-7xl opacity-10 block -mb-6 ${isCoral ? 'text-coral' : 'text-cyber'}`}>
                    0{idx + 1}
                  </span>
                  {project.title === 'DHANSOURCE' && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-[10px] md:text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.2)] backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      Major Achievement
                    </div>
                  )}
                  {project.title === 'RINGBUZZ' && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Built in 10 Days
                    </div>
                  )}
                  <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl tracking-widest mb-2 ${isCoral ? 'text-glow-coral text-coral' : 'text-glow-cyber text-cyber'}`}>
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-slate-700 dark:text-slate-400 font-semibold tracking-[0.2em] uppercase mb-6">
                    {project.subtitle}
                  </p>

                  <p className="font-body text-xs md:text-sm text-slate-900 dark:text-slate-300 font-medium leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-3 py-1.5 rounded text-[10px] font-mono border backdrop-blur-sm ${isCoral ? 'border-coral/20 text-coral/80 bg-coral/5' : 'border-cyber/20 text-cyber/80 bg-cyber/5'
                          }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full">
                    <Link
                      to={`/project/${project.id}`}
                      className={`group flex-[1_1_auto] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-[10px] md:text-xs font-display tracking-widest transition-all duration-300 relative overflow-hidden ${isCoral
                        ? 'border border-coral/30 text-coral hover:text-surface hover:shadow-[0_0_30px_rgba(255,87,51,0.6)]'
                        : 'border border-cyber/30 text-cyber hover:text-surface hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]'
                        }`}
                    >
                      <div className={`absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full ${isCoral ? 'bg-coral' : 'bg-cyber'} -z-10`} />
                      <span className="relative z-10">EXPLORE PROJECT</span>
                      <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>

                    {/* LIVE WEBSITE FOR ALL PROJECTS */}
                    <a
                      href={project.title === 'ASNARO' ? 'https://asnaro.co.jp/' : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex-[1_1_auto] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-[10px] md:text-xs font-display tracking-widest transition-all duration-300 relative overflow-hidden bg-white/5 backdrop-blur-sm hover:bg-white/10 ${isCoral ? 'text-coral border border-coral/10 hover:border-coral/40' : 'text-cyber border border-cyber/10 hover:border-cyber/40'}`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className={`w-5 h-5 ${isCoral ? 'text-coral' : 'text-cyber'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        LIVE WEBSITE
                      </span>
                    </a>

                    {/* PLAY STORE BUTTON ONLY FOR APPS */}
                    {project.title !== 'ASNARO' && (
                      <a
                        href={project.title === 'DHANSOURCE' ? "https://play.google.com/store/apps/details?id=com.dhansourcecapital.partner&pcampaignid=web_share" : '#'}
                        target={project.title === 'DHANSOURCE' ? "_blank" : undefined}
                        rel={project.title === 'DHANSOURCE' ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (['RINGBUZZ', 'FUNZO'].some(t => project.title.toUpperCase().includes(t))) e.preventDefault();
                        }}
                        className={`group flex-[1_1_auto] w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded text-[10px] md:text-xs font-display tracking-widest transition-all duration-300 relative overflow-hidden bg-white/5 backdrop-blur-sm ${['RINGBUZZ', 'FUNZO'].some(t => project.title.toUpperCase().includes(t)) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/10 hover:shadow-lg'} ${isCoral ? 'border border-coral/20' : 'border border-cyber/20'} ${['RINGBUZZ', 'FUNZO'].some(t => project.title.toUpperCase().includes(t)) ? (isCoral ? 'text-coral' : 'text-cyber') : 'text-slate-900 dark:text-white'}`}
                      >
                        <span className="relative z-10 flex items-center gap-2.5 font-bold">
                          {/* MASSIVE COLORFUL PLAY STORE ICON */}
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="url(#playStoreGradient)">
                            <defs>
                              <linearGradient id="playStoreGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#4285F4" />
                                <stop offset="33%" stopColor="#34A853" />
                                <stop offset="66%" stopColor="#FBBC05" />
                                <stop offset="100%" stopColor="#EA4335" />
                              </linearGradient>
                            </defs>
                            <path d="M5 3v18l15-9L5 3z" />
                          </svg>
                          {['RINGBUZZ', 'FUNZO'].some(t => project.title.toUpperCase().includes(t)) ? 'PLAY STORE (COMING SOON)' : 'OPEN IN PLAY STORE'}
                        </span>
                      </a>
                    )}
                  </div>

                  {['RINGBUZZ', 'FUNZO'].includes(project.title) && (
                    <div className="mt-4 text-center">
                      <span className={`inline-block text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest ${isCoral ? 'text-coral/60' : 'text-cyber/60'}`}>
                        * Coming soon on Play Store *
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Images Column */}
                <div className="hidden lg:flex justify-center items-center relative z-10 w-full h-[70vh]">
                  {project.images.slice(2, 4).map((imgSrc, imgIdx) => {
                    const isFront = imgIdx === 0;
                    const isDesktop =
                      !project.title.toLowerCase().includes('asnaro') &&
                      (project.title.toLowerCase().includes('brandwave') ||
                        imgSrc.toLowerCase().includes('desktop') ||
                        imgSrc.toLowerCase().includes('website') ||
                        imgSrc.toLowerCase().includes('admin'));

                    return (
                      <div
                        key={`wrapper-${imgIdx + 2}`}
                        className={`group transition-all duration-300 hover:z-50 ${isFront ? 'relative z-20 translate-x-[15%] lg:translate-x-[20%]' : 'absolute z-10 -translate-x-[15%] lg:-translate-x-[20%] translate-y-4 scale-[0.95]'
                          }`}
                      >
                        <div className="floating-img cursor-pointer">
                          <div className="transition-transform duration-300 group-hover:scale-[1.05]">
                            {isDesktop ? (
                              /* Premium Laptop Mockup */
                              <div className="relative w-[28vw] max-w-[420px] shadow-2xl">
                                {/* Screen Frame */}
                                <div className="relative rounded-t-xl rounded-b-sm border-[6px] md:border-[10px] border-[#1a1a1a] bg-black shadow-2xl overflow-hidden aspect-video">
                                  <img
                                    src={imgSrc}
                                    alt={`${project.title} screenshot ${imgIdx + 3}`}
                                    className="w-full h-full object-cover block"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                                  />
                                  {/* Camera Dot */}
                                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#333] rounded-full" />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                                </div>
                                {/* Laptop Base */}
                                <div className="relative h-1.5 md:h-2 w-[115%] -ml-[7.5%] bg-gradient-to-b from-[#b3b3b3] to-[#666666] rounded-b-lg rounded-t-sm shadow-[0_15px_25px_rgba(0,0,0,0.5)] z-10 flex justify-center">
                                  {/* Base Notch */}
                                  <div className="w-1/6 h-[40%] bg-[#8c8c8c] rounded-b-sm shadow-inner" />
                                </div>
                              </div>
                            ) : (
                              /* Premium iPhone Mockup */
                              <div className={`p-1.5 md:p-2 rounded-[1.8rem] border-[3px] ${isCoral ? 'border-coral/20' : 'border-cyber/20'} bg-slate-100 dark:bg-[#1a1a1a] shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}>
                                <div className="relative rounded-[1.4rem] overflow-hidden bg-black aspect-[9/19.5] w-[15vw] max-w-[220px]">
                                  <img
                                    src={imgSrc}
                                    alt={`${project.title} screenshot ${imgIdx + 3}`}
                                    className="w-full h-full object-cover block"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                                  />
                                  {/* Dynamic Island */}
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[16px] bg-black rounded-full z-10 shadow-sm flex items-center justify-end px-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]" />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Fallback Grid (Hidden based on user request) */}
                <div className="hidden mt-8">
                  {project.images.map((imgSrc, imgIdx) => (
                    <div key={imgIdx} className={`p-1 rounded-xl border ${isCoral ? 'border-coral/30' : 'border-cyber/30'} bg-surface/90 overflow-hidden`}>
                      <div className="w-full rounded-lg overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={`${project.title} screenshot ${imgIdx + 1}`}
                          className="w-full h-auto block"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              // Empty fallback (Funzo)
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
                  <div className={`absolute w-full h-[1px] ${isCoral ? 'bg-coral' : 'bg-cyber'} opacity-20 shadow-[0_0_20px_rgba(0,102,255,0.8)] animate-pulse`} />
                  <div className={`absolute h-full w-[1px] ${isCoral ? 'bg-coral' : 'bg-cyber'} opacity-20 shadow-[0_0_20px_rgba(0,102,255,0.8)] animate-pulse`} />

                  <div className={`w-32 h-32 rounded-full blur-[80px] ${isCoral ? 'bg-coral/40' : 'bg-cyber/40'}`} />

                  <div className="absolute inset-0 bg-blueprint-grid bg-grid-40 opacity-10" />

                  <div className="absolute top-1/4 right-1/4 font-mono text-xs text-cyber/40 tracking-widest animate-pulse">
                    [DATA_STREAM_ACTIVE]
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 font-mono text-xs text-cyber/40 tracking-widest animate-pulse" style={{ animationDelay: '1s' }}>
                    [ASSETS_CLASSIFIED]
                  </div>
                </div>
              </div>
            )}

            {/* Fallback Text Block for Funzo (when images are empty) */}
            {project.images.length === 0 && (
              <div className="text-block relative z-20 w-full max-w-md lg:max-w-lg mx-auto px-6 text-center bg-white/90 dark:bg-[#0d0d0d]/90 border border-slate-200 dark:border-sky-500/20 shadow-2xl p-6 md:p-10 rounded-2xl">
                <span className={`font-display text-6xl md:text-7xl opacity-10 block -mb-6 ${isCoral ? 'text-coral' : 'text-cyber'}`}>
                  0{idx + 1}
                </span>
                <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl tracking-widest mb-2 ${isCoral ? 'text-glow-coral text-coral' : 'text-glow-cyber text-cyber'}`}>
                  {project.title}
                </h3>
                <p className="font-mono text-xs md:text-sm text-slate-700 dark:text-slate-400 font-semibold tracking-[0.2em] uppercase mb-6">
                  {project.subtitle}
                </p>

                <p className="font-body text-xs md:text-sm text-slate-900 dark:text-slate-300 font-medium leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-3 py-1.5 rounded text-[10px] font-mono border backdrop-blur-sm ${isCoral ? 'border-coral/20 text-coral/80 bg-coral/5' : 'border-cyber/20 text-cyber/80 bg-cyber/5'
                        }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className={`group inline-flex items-center gap-2 px-6 py-3 rounded text-[10px] md:text-xs font-display tracking-widest transition-all duration-300 relative overflow-hidden ${isCoral
                    ? 'border border-coral/30 text-coral hover:text-surface hover:shadow-[0_0_30px_rgba(255,87,51,0.6)]'
                    : 'border border-cyber/30 text-cyber hover:text-surface hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]'
                    }`}
                >
                  <div className={`absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full ${isCoral ? 'bg-coral' : 'bg-cyber'} -z-10`} />
                  <span className="relative z-10">EXPLORE PROJECT</span>
                  <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default ProjectsShowcase;
