import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '2.5+', label: 'Years Exp.' },
  { value: '8+', label: 'Production Systems' },
  { value: '500ms', label: 'Real-time Updates' },
  { value: '100K+', label: 'Users Served' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // 1. Added reference for the video

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 60, skewY: 2 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 0.8,
          scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.about-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
          scrollTrigger: { trigger: '.about-text', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.stat-card', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      // 2. Add ScrollTrigger specifically for the video playback
      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top 80%', // Triggers when the top of the video hits 80% down the screen
          onEnter: () => videoRef.current?.play(), // Plays when entering viewport
          onLeave: () => videoRef.current?.pause(), // Pauses when scrolling past it
          onEnterBack: () => videoRef.current?.play(), // Plays when scrolling back up to it
          onLeaveBack: () => videoRef.current?.pause(), // Pauses when scrolling back up past it
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Section accent line */}


      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="mb-4">
          <span className="font-mono text-xs text-cyber/60 tracking-[0.3em] uppercase">// About</span>
        </div>

        <h2 className="about-heading font-display text-4xl md:text-6xl text-bone mb-10">
          The Engineer Behind{' '}
          <span className="text-gradient-coral">The Systems</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left — Narrative */}
          <div className="lg:col-span-3 space-y-5">
            <p className="about-text font-body text-sm sm:text-base text-slate-600 leading-relaxed">
              I’m <span className="text-coral font-semibold">Sanjay Gawai</span>, a <span className="text-cyber font-semibold">Technical Lead & Founding Engineer</span> built for high-scale platform lifecycles and rapid early-stage startup execution. I direct technical strategy, system architecture, and end-to-end production deployments—from secure fintech ecosystems and real-time WebRTC platforms to custom workflow automation engines built from scratch.
            </p>

            <div className="about-text space-y-3 pt-2">
              <h4 className="font-display text-lg text-bone uppercase tracking-wider">My execution blueprint includes:</h4>
              <ul className="space-y-2.5">
                <li className="text-sm font-body text-slate-600 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-coral font-semibold">Full-Stack Execution:</strong> Engineering responsive interfaces and high-performance mobile apps using React, Next.js, and React Native.
                  </span>
                </li>
                <li className="text-sm font-body text-slate-600 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-cyber font-semibold">Robust Infrastructure:</strong> Architecting secure, scalable backend APIs, containerizing applications with Docker, and integrating critical fintech and payment gateways.
                  </span>
                </li>
                <li className="text-sm font-body text-slate-600 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-coral font-semibold">Workflow Automation:</strong> Deploying advanced workflow automations to maximize development velocity and operational efficiency.
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right — Profile image/video */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-coral/20 to-cyber/20 blur-sm" />
              <video 
                ref={videoRef} // 3. Attached the ref here
                src="/itroduction.mp4"
                loop
                muted // 4. Muted is required for code-triggered autoplay in modern browsers
                playsInline
                controls
                className="relative rounded-lg w-64 h-96 md:w-[14.5rem] md:h-[22.25rem] object-cover border border-border grayscale-0 hover:grayscale transition-all duration-700"
              />
              {/* Blueprint corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyber/40" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyber/40" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-coral/40" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-coral/40" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card blueprint-card rounded-lg p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl text-coral mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;