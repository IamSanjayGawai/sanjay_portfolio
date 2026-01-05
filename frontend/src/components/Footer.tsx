import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/IamSanjayGawai',
      color: 'text-foreground hover:text-primary'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/sanjay-gawai',
      color: 'text-foreground hover:text-primary'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:sanjaygawai2022@gmail.com',
      color: 'text-foreground hover:text-primary'
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gradient-simple">Sanjay Gawai</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Developer & Gen AI Developer crafting innovative digital solutions with modern technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ name, icon: Icon, href, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 ${color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-foreground">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:sanjaygawai2022@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>sanjaygawai2022@gmail.com</span>
              </a>
              <a
                href="tel:+917720990081"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+91 7720990081</span>
              </a>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Location</p>
                <p>Pune, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Sanjay Gawai. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-primary">❤️</span>
              <span>using React & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

