
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = '/' + href;
    } else {
      // If on home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-effect border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient-simple relative group">
            {theme === 'dark' ?  <img src="/logo1.png" alt="Logo" className="h-10 w-auto transition-transform group-hover:scale-110" /> : <img src="/logo.png" alt="Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="relative px-4 py-2 text-sm font-semibold transition-all rounded-lg group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10 text-foreground/80 group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="absolute inset-0 bg-gradient-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-primary group-hover:w-3/4 transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-effect border border-border/50 hover:border-primary/50 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="relative z-10 text-xl">{theme === 'dark' ? '🌞' : '🌙'}</span>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass-effect border border-border/50 hover:border-primary/50 transition-all relative overflow-hidden group"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative z-10">
                <motion.span 
                  className={`bg-foreground h-0.5 w-6 transition-all rounded-full ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
                  animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span 
                  className={`bg-foreground h-0.5 w-6 transition-all mt-1 rounded-full ${isMenuOpen ? 'opacity-0' : ''}`}
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span 
                  className={`bg-foreground h-0.5 w-6 transition-all mt-1 rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
                  animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 rounded-xl transition-all hover:bg-gradient-primary/10 border border-transparent hover:border-primary/20 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-foreground/80 group-hover:text-primary font-semibold transition-colors">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
