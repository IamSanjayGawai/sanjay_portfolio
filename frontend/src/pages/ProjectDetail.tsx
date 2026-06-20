
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { project_detail } from '../data/project-details';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'stack'>('features');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const project = project_detail.find((p: any) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.fromTo('.pd-hero-bg', { scale: 1.1 }, {
        scale: 1, duration: 1.4, ease: 'power3.out'
      });

      // Staggered entrance
      gsap.fromTo('.pd-animate',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // Scroll-triggered cards
      gsap.utils.toArray<HTMLElement>('.pd-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      });

      // Feature list items
      gsap.fromTo('.pd-feature-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-features-list', start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#080c14]">
        <div className="text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="font-display text-4xl text-coral mb-4 tracking-widest">PROJECT NOT FOUND</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">This project doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-full font-mono text-sm tracking-wider hover:shadow-lg hover:shadow-coral/30 transition-all">
            ← RETURN TO HOME
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = project.status === 'Completed'
    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    : 'bg-amber-500/10 text-amber-500 border-amber-500/20';

  return (
    <div ref={sectionRef} className="min-h-screen bg-white dark:bg-[#080c14] transition-colors duration-500">

      {/* ── CINEMATIC HERO ── */}
      <div ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background image with overlay */}
        <div className="pd-hero-bg absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/80 via-transparent to-transparent" />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,87,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,51,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-coral/60 z-10" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-coral/60 z-10" />

        {/* Back link */}
        <Link to="/"
          className="absolute top-8 left-20 z-20 pd-animate inline-flex items-center gap-2 text-white/70 hover:text-coral font-mono text-xs tracking-wider transition-colors"
        >
          ← BACK TO SYSTEMS
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-32">
          <div className="pd-animate flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full border border-coral/30 bg-coral/10 backdrop-blur-sm font-mono text-xs text-coral tracking-wider">
              {project.category}
            </span>
            <span className={`px-3 py-1 rounded-full border font-mono text-xs tracking-wider ${statusColor}`}>
              {project.status}
            </span>
          </div>

          <h1 className="pd-animate font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wide mb-5 leading-[1.05]">
            {project.title}
          </h1>

          <p className="pd-animate font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="pd-animate flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-mono text-xs tracking-widest rounded-full hover:shadow-xl hover:shadow-coral/30 hover:scale-105 transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                VIEW LIVE ↗
              </a>
            )}
            {(project as any).websiteUrl && (
              <a href={(project as any).websiteUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-sky-400/40 text-sky-400 font-mono text-xs tracking-widest rounded-full hover:bg-sky-400/10 hover:scale-105 transition-all duration-200"
              >
                WEBSITE ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 font-mono text-xs tracking-widest rounded-full hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-200"
              >
                ⌥ SOURCE CODE
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── TECH TAGS STRIP ── */}
      <div className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] py-4 overflow-hidden">
        <div className="flex gap-3 px-6 flex-wrap max-w-6xl mx-auto">
          {project.tags.map((tag: string) => (
            <span key={tag}
              className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 font-mono text-[11px] tracking-wider whitespace-nowrap hover:border-coral/40 hover:text-coral transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Features + Stack — Tabbed on mobile, side by side on desktop */}
        <div className="mb-24">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-5 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-200 ${activeTab === 'features' ? 'bg-coral text-white shadow-lg shadow-coral/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
              >
                FEATURES
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-5 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-200 ${activeTab === 'stack' ? 'bg-cyber text-white shadow-lg shadow-cyber/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
              >
                TECH STACK
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <div className={`pd-features-list transition-all duration-300 ${activeTab === 'stack' ? 'opacity-40 lg:opacity-100' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-coral/60 tracking-[0.3em] uppercase">// Capabilities</span>
              </div>
              <h2 className="font-display text-3xl text-slate-900 dark:text-white mt-1 mb-8">
                Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-[#FF8A65]">Features</span>
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="pd-feature-item flex items-start gap-3 group">
                    <span className="w-5 h-5 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-coral/20 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                    </span>
                    <span className="font-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className={`space-y-6 transition-all duration-300 ${activeTab === 'features' ? 'opacity-40 lg:opacity-100' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-cyber/60 tracking-[0.3em] uppercase">// Architecture</span>
              </div>
              <h2 className="font-display text-3xl text-slate-900 dark:text-white mt-1 mb-8">
                Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-indigo-400">Stack</span>
              </h2>
              {Object.entries(project.technologies as Record<string, string[]>).map(([category, techs]) => (
                <div key={category} className="pd-card">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-cyber rounded-full" />
                    <h3 className="font-mono text-xs text-cyber tracking-[0.2em] uppercase">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span key={tech}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 hover:border-cyber/40 hover:text-cyber dark:hover:text-cyber transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CHALLENGES & SOLUTIONS ── */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-xs text-slate-400 tracking-[0.3em] uppercase">// Engineering</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-900 dark:text-white mb-12">
              Challenges <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-[#FF8A65] to-cyber">&amp; Solutions</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {project.challenges.map((challenge: any, i: number) => (
                <div key={i} className="pd-card group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-6 hover:border-coral/30 dark:hover:border-coral/20 transition-all duration-300 hover:shadow-xl hover:shadow-coral/5 overflow-hidden">
                  {/* Subtle number */}
                  <div className="absolute top-4 right-5 font-display text-7xl text-slate-100 dark:text-white/5 select-none leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                      <h3 className="font-display text-base text-coral tracking-wider">{challenge.title}</h3>
                    </div>
                    <p className="font-body text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                      {challenge.description}
                    </p>
                    <div className="rounded-xl border border-cyber/20 bg-cyber/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] text-cyber tracking-[0.2em] uppercase">→ Solution</span>
                      </div>
                      <p className="font-body text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SCREENSHOT GALLERY ── */}
        {project.projectImages && project.projectImages.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-xs text-slate-400 tracking-[0.3em] uppercase">// Interface</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-900 dark:text-white mb-12">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-[#FF8A65]">Screens</span>
            </h2>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {project.projectImages.map((image: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setLightboxImg(image.src)}
                  className="pd-card break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 group cursor-zoom-in relative hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/20 backdrop-blur-sm text-white font-mono text-xs px-3 py-1.5 rounded-full border border-white/30">
                      🔍 VIEW
                    </span>
                  </div>
                  <div className="px-4 py-3 bg-white dark:bg-[#0d1117]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{image.name || image.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white font-mono text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt="Screenshot"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
