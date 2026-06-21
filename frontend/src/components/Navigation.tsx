import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, CloudRain, Snowflake, CloudOff, SunMedium } from 'lucide-react';
import { useTheme, Weather } from '../contexts/ThemeContext';

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
  const [isWeatherMenuOpen, setIsWeatherMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, weather, setWeather } = useTheme();

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
          ? 'top-4 md:top-6 w-[95%] max-w-[1100px] glass-panel rounded-[50px] px-4 py-2.5'
          : 'top-0 w-full max-w-7xl bg-transparent px-6 py-6'
          }`}
      >
        <div className="w-full flex items-center justify-between relative">

          {/* Left: Logo */}
          <div className="flex flex-1 justify-start">
            <Link to="/" className="flex-shrink-0 group">
              <div className={`flex items-center justify-center rounded-full transition-all duration-500 bg-slate-900 shadow-[0_0_15px_rgba(14,165,233,0.4)] overflow-hidden border-[2.5px] border-sky-500 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}>
                <img
                  src="/profile.png"
                  alt="Sanjay Gawai"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile.png';
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center gap-4 xl:gap-8">
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

          {/* Right: Desktop CTA & Toggles */}
          <div className="flex-1 flex justify-end items-center gap-3 xl:gap-4 hidden lg:flex">
            {/* Weather Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsWeatherMenuOpen(!isWeatherMenuOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-md border ${isScrolled ? 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10' : 'bg-white/10 dark:bg-slate-900/10 border-white/20 dark:border-white/10 backdrop-blur-md'} hover:scale-105 active:scale-95 text-slate-800 dark:text-white`}
                aria-label="Toggle weather"
              >
                {weather === 'summer' && <SunMedium size={18} className="text-amber-500 fill-amber-300" />}
                {weather === 'winter' && <Snowflake size={18} className="text-sky-500" />}
                {weather === 'rainy' && <CloudRain size={18} className="text-indigo-500" />}
                {weather === 'clear' && <CloudOff size={18} className="text-slate-500" />}
              </button>

              {/* Weather Menu */}
              {isWeatherMenuOpen && (
                <div className="absolute top-14 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 w-40 transform origin-top-right animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">ENVIRONMENT</span>
                  </div>

                  <button onClick={() => { setWeather('summer'); setIsWeatherMenuOpen(false); }} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-display text-xs tracking-wider ${weather === 'summer' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                    <SunMedium size={14} className="text-amber-500" /> Summer Flare
                  </button>
                  <button onClick={() => { setWeather('rainy'); setIsWeatherMenuOpen(false); }} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-display text-xs tracking-wider ${weather === 'rainy' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                    <CloudRain size={14} className="text-indigo-500" /> Overcast Rain
                  </button>
                  <button onClick={() => { setWeather('winter'); setIsWeatherMenuOpen(false); }} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-display text-xs tracking-wider ${weather === 'winter' ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                    <Snowflake size={14} className="text-sky-500" /> Arctic Snow
                  </button>
                </div>
              )}
            </div>

            {/* Highly Animated Creative Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-24 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 transition-all duration-500 focus:outline-none shadow-md active:scale-95 group flex items-center"
              aria-label="Toggle theme"
            >
              {/* Sky Backgrounds (Shows target theme sky) */}
              <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 ${theme === 'dark'
                  ? 'from-sky-400 via-sky-300 to-amber-200'
                  : 'from-slate-950 via-slate-900 to-indigo-950'
                }`} />

              {/* Twinkling stars (visible when current theme is light, showing the target dark state) */}
              <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${theme === 'light' ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`}>
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-2 left-4" />
                <div className="absolute w-[3px] h-[3px] bg-white rounded-full top-6 left-8" />
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-3 left-10" />
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-7 left-3" />
              </div>

              {/* Clouds (visible when current theme is dark, showing the target light state) */}
              <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="absolute w-5 h-2 bg-white/70 rounded-full top-2 left-10 animate-[bounce_4s_infinite]" />
                <div className="absolute w-6 h-2.5 bg-white/60 rounded-full top-4.5 left-12 animate-[bounce_6s_infinite]" />
              </div>

              {/* Slider Labels (Shows action/target state) */}
              <span className={`absolute left-3.5 font-mono text-[9px] font-black z-10 select-none transition-all duration-500 ${theme === 'light' ? 'opacity-100 text-indigo-200' : 'opacity-0 text-transparent pointer-events-none'
                }`}>
                NIGHT
              </span>
              <span className={`absolute right-3.5 font-mono text-[9px] font-black z-10 select-none transition-all duration-500 ${theme === 'dark' ? 'opacity-100 text-slate-800' : 'opacity-0 text-transparent pointer-events-none'
                }`}>
                DAY
              </span>

              {/* Toggle Handle: Sun / Moon (Shows target theme icon) */}
              <div
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${theme === 'dark'
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
              href="/SanjayGawai_Resume.pdf"
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
          <div className="flex lg:hidden items-center gap-3">
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
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
            href="/SanjayGawai_Resume.pdf"
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
