import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      // If not on homepage, navigate there first
      if (location.pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${isScrolled
          ? 'top-4 md:top-6 w-[92%] md:w-[800px] glass-panel rounded-[50px] px-2.5 py-2.5'
          : 'top-0 w-full max-w-7xl bg-transparent px-6 py-6'
          }`}
      >
        <div className="w-full flex items-center justify-between">

          {/* Logo (Left Circle) */}
          <Link to="/" className="flex-shrink-0 group">
            <div className={`flex items-center justify-center rounded-full transition-all duration-500 bg-gradient-to-r from-coral to-cyber shadow-lg overflow-hidden border-[1.5px] border-white/20 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
              <img 
                src="/profile-img.png" 
                alt="Sanjay Gawai" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/profile.png';
                }}
              />
            </div>
          </Link>

          {/* Desktop Nav Links (Center) */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body text-[13px] font-medium tracking-wide transition-colors ${isScrolled ? 'text-slate-600 hover:text-coral dark:text-white/70 dark:hover:text-coral' : 'text-slate-700 hover:text-coral dark:text-white/70 dark:hover:text-coral'
                    }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-body text-[13px] font-medium tracking-wide transition-colors ${isScrolled ? 'text-slate-600 hover:text-coral dark:text-white/70 dark:hover:text-coral' : 'text-slate-700 hover:text-coral dark:text-white/70 dark:hover:text-coral'
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA (Right Pill) & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Highly Animated Creative Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-24 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 transition-all duration-500 focus:outline-none shadow-md active:scale-95 group flex items-center"
              aria-label="Toggle theme"
            >
              {/* Sky Backgrounds (Shows target theme sky) */}
              <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 ${
                theme === 'dark'
                  ? 'from-sky-400 via-sky-300 to-amber-200'
                  : 'from-slate-950 via-slate-900 to-indigo-950'
              }`} />
              
              {/* Twinkling stars (visible when current theme is light, showing the target dark state) */}
              <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                theme === 'light' ? 'opacity-100 animate-pulse' : 'opacity-0'
              }`}>
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-2 left-4" />
                <div className="absolute w-[3px] h-[3px] bg-white rounded-full top-6 left-8" />
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-3 left-10" />
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-7 left-3" />
              </div>
              
              {/* Clouds (visible when current theme is dark, showing the target light state) */}
              <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                theme === 'dark' ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute w-5 h-2 bg-white/70 rounded-full top-2 left-10 animate-[bounce_4s_infinite]" />
                <div className="absolute w-6 h-2.5 bg-white/60 rounded-full top-4.5 left-12 animate-[bounce_6s_infinite]" />
              </div>

              {/* Slider Labels (Shows action/target state) */}
              <span className={`absolute left-3.5 font-mono text-[9px] font-black z-10 select-none transition-all duration-500 ${
                theme === 'light' ? 'opacity-100 text-indigo-200' : 'opacity-0 text-transparent pointer-events-none'
              }`}>
                NIGHT
              </span>
              <span className={`absolute right-3.5 font-mono text-[9px] font-black z-10 select-none transition-all duration-500 ${
                theme === 'dark' ? 'opacity-100 text-slate-800' : 'opacity-0 text-transparent pointer-events-none'
              }`}>
                DAY
              </span>

              {/* Toggle Handle: Sun / Moon (Shows target theme icon) */}
              <div
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                  theme === 'dark'
                    ? 'left-1 bg-amber-100 text-amber-500 border border-amber-300/30'
                    : 'left-[60px] bg-slate-800 text-indigo-300 border border-indigo-500/20'
                } group-hover:scale-105`}
              >
                {theme === 'dark' ? (
                  <Sun size={17} className="fill-amber-400 animate-[spin_10s_linear_infinite]" />
                ) : (
                  <Moon size={15} className="fill-indigo-300 animate-wiggle" />
                )}
              </div>
            </button>

            <a
              href="/Sanjay_Gawai_Resume14.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 items-center justify-center rounded-[30px] font-body text-[12.5px] font-semibold tracking-wider transition-all duration-500 hover:scale-105 active:scale-95 bg-gradient-to-r from-coral to-cyber text-white hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] ${isScrolled
                ? 'px-6 py-3'
                : 'px-7 py-3'
                }`}
            >
              VIEW RESUME
            </a>
          </div>

          {/* Mobile toggle group */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Round Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 transition-all duration-500 focus:outline-none shadow-md active:scale-95 group flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-amber-200 dark:from-slate-950 dark:to-indigo-950 transition-all duration-500" />
              <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-2 left-2 animate-pulse" />
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-7 left-7 animate-pulse" style={{ animationDuration: '2s' }} />
              </div>
              <div className="relative z-10 transition-all duration-500 transform group-hover:scale-110">
                {theme === 'dark' ? (
                  <Moon size={17} className="text-indigo-200 fill-indigo-300" />
                ) : (
                  <Sun size={19} className="text-amber-100 fill-amber-300 animate-[spin_8s_linear_infinite]" />
                )}
              </div>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-colors ${isScrolled ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white' : 'bg-white/50 text-slate-900 dark:bg-white/10 dark:text-white backdrop-blur-sm'
                }`}
              aria-label="Toggle menu"
            >
              <span className={`block w-[18px] h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-900 dark:bg-white'
                } ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-[18px] h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-900 dark:bg-white'
                } ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-[18px] h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-slate-900 dark:bg-white' : 'bg-slate-900 dark:bg-white'
                } ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-lg" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            link.href.startsWith('#') ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-2xl text-slate-900 dark:text-white tracking-widest hover:text-coral dark:hover:text-coral transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="font-display text-2xl text-slate-900 dark:text-white tracking-widest hover:text-coral dark:hover:text-coral transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            )
          ))}

          <a
            href="/Sanjay_Gawai_Resume14.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 bg-gradient-to-r from-coral to-cyber text-white font-display text-sm tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
