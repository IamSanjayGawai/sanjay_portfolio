import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiReact, SiNextdotjs, SiRedux, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiExpress, SiSocketdotio, SiWebrtc, 
  SiTypescript, SiJavascript, SiHtml5, 
  SiMongodb, SiPostgresql, SiRedis, SiSupabase, 
  SiDocker, SiGoogleplay, SiFirebase, SiLangchain, SiRazorpay,
  SiGithubactions
} from 'react-icons/si';
import { FaAws, FaNetworkWired, FaServer, FaRobot, FaDatabase, FaVideo } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  icon: React.ElementType;
  iconColor: string;
}

interface SkillCategory {
  title: string;
  color: 'coral' | 'cyber';
  span?: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & Mobile',
    color: 'coral',
    span: 'md:col-span-2',
    skills: [
      { name: 'React.js', icon: SiReact, iconColor: 'text-[#61DAFB]' },
      { name: 'React Native (Expo/CLI)', icon: SiReact, iconColor: 'text-[#61DAFB]' },
      { name: 'Next.js', icon: SiNextdotjs, iconColor: 'text-slate-900 dark:text-white' },
      { name: 'Redux Toolkit', icon: SiRedux, iconColor: 'text-[#764ABC]' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, iconColor: 'text-[#06B6D4]' },
      { name: 'Framer Motion', icon: SiFramer, iconColor: 'text-[#0055FF]' }
    ],
  },
  {
    title: 'Backend & Architecture',
    color: 'cyber',
    span: 'md:col-span-2',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, iconColor: 'text-[#339933]' },
      { name: 'Express.js', icon: SiExpress, iconColor: 'text-slate-900 dark:text-white' },
      { name: 'REST APIs', icon: FaNetworkWired, iconColor: 'text-indigo-500' },
      { name: 'Microservices', icon: FaServer, iconColor: 'text-amber-500' },
      { name: 'Socket.IO', icon: SiSocketdotio, iconColor: 'text-slate-900 dark:text-white' },
      { name: 'WebRTC', icon: SiWebrtc, iconColor: 'text-slate-700 dark:text-slate-300' }
    ],
  },
  {
    title: 'Languages',
    color: 'coral',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, iconColor: 'text-[#3178C6]' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, iconColor: 'text-[#F7DF1E]' },
      { name: 'HTML5 / CSS3', icon: SiHtml5, iconColor: 'text-[#E34F26]' },
      { name: 'PL/pgSQL', icon: SiPostgresql, iconColor: 'text-[#336791]' }
    ],
  },
  {
    title: 'Databases & Caching',
    color: 'cyber',
    skills: [
      { name: 'MongoDB (Aggregations)', icon: SiMongodb, iconColor: 'text-[#47A248]' },
      { name: 'PostgreSQL (RLS)', icon: SiPostgresql, iconColor: 'text-[#4169E1]' },
      { name: 'Redis (Pub/Sub)', icon: SiRedis, iconColor: 'text-[#DC382D]' },
      { name: 'Supabase', icon: SiSupabase, iconColor: 'text-[#3ECF8E]' }
    ],
  },
  {
    title: 'Cloud & DevOps',
    color: 'coral',
    skills: [
      { name: 'AWS (EC2, S3)', icon: FaAws, iconColor: 'text-[#FF9900]' },
      { name: 'Docker', icon: SiDocker, iconColor: 'text-[#2496ED]' },
      { name: 'Google Play Console', icon: SiGoogleplay, iconColor: 'text-[#3DDC84]' },
      { name: 'CI/CD', icon: SiGithubactions, iconColor: 'text-[#2088FF]' },
      { name: 'Firebase Admin SDK', icon: SiFirebase, iconColor: 'text-[#FFCA28]' }
    ],
  },
  {
    title: 'AI & Specialized',
    color: 'cyber',
    skills: [
      { name: 'Agentic AI', icon: FaRobot, iconColor: 'text-emerald-500' },
      { name: 'RAG Pipelines', icon: FaDatabase, iconColor: 'text-blue-500' },
      { name: 'LangChain', icon: SiLangchain, iconColor: 'text-slate-900 dark:text-white' },
      { name: 'Razorpay SDK', icon: SiRazorpay, iconColor: 'text-[#02042B] dark:text-[#215EFA]' },
      { name: 'GetStream SDK', icon: FaVideo, iconColor: 'text-[#005FFF]' }
    ],
  },
];

const SkillsBento = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-item',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div ref={sectionRef} className="py-32 relative">


      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-4">
          <span className="font-mono text-xs text-cyber/60 tracking-[0.3em] uppercase">// Skills & Stack</span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl text-bone mb-16">
          The{' '}
          <span className="text-sky-500 dark:text-sky-400">Technical Arsenal</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`group bento-item relative p-8 rounded-3xl transition-all duration-300 ${cat.span || ''} bg-white/40 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden hover:border-slate-300 dark:hover:border-white/10`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
            >
              {/* Spotlight Glow (Extremely subtle) */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${cat.color === 'coral' ? 'rgba(255,0,127,0.06)' : 'rgba(0,255,255,0.06)'}, transparent 40%)`
                }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`w-2 h-2 rounded-full ${cat.color === 'coral' ? 'bg-coral' : 'bg-cyber'}`} />
                <h3 className="font-display text-[15px] font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                  {cat.title}
                </h3>
              </div>

              {/* Skills tags (Neutral by default, colored on hover) */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className={`group/skill flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13.5px] font-mono transition-all duration-300 cursor-default bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent hover:scale-105 ${
                        cat.color === 'coral'
                          ? 'hover:bg-coral/10 hover:text-coral hover:border-coral/30 hover:shadow-[0_0_15px_rgba(255,0,127,0.15)]'
                          : 'hover:bg-cyber/10 hover:text-cyber hover:border-cyber/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${skill.iconColor} transition-transform group-hover/skill:scale-110 drop-shadow-sm`} />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBento;
