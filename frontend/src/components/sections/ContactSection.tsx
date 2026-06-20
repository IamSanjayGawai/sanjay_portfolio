import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('All fields are required');
      }

      // Supabase insert
      const { error } = await supabase
        .from('contacts')
        .insert([{ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }]);

      if (error) throw error;

      // Web3Forms email notification
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (web3FormsKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Message from ${formData.name} via Portfolio`,
            from_name: 'Sanjay Portfolio',
          }),
        });
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setErrorMessage(error.message || 'Transmission failed.');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    // Reduced padding-bottom to 0 to completely eliminate gap before the Footer
    <div ref={sectionRef} id="contact" className="pt-32 pb-0 relative z-20 overflow-visible">

      {/* Premium Cloud Image Backdrop - BOTTOM */}
      <div
        className="absolute bottom-0 left-0 w-full z-0 pointer-events-none flex justify-center mix-blend-normal overflow-visible opacity-100"
        style={{
          maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
        }}
      >
        {/* Left Cloud */}
        <img
          src="/cloude2.png"
          alt="Cloud left"
          className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-20 transition-opacity duration-700"
          style={{ filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.2))' }}
        />
        {/* Right Cloud (Mirrored for perfect seamless join in the center) */}
        <img
          src="/cloude2.png"
          alt="Cloud right"
          className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-20 transition-opacity duration-700"
          style={{
            filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.2))',
            transform: 'scaleX(-1)'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="mb-4">
          <span className="font-mono text-xs text-cyber/60 tracking-[0.3em] uppercase contact-animate">// Contact</span>
        </div>

        <h2 className="contact-animate font-display text-4xl md:text-6xl text-slate-900 dark:text-bone mb-6">
          Let's Build{' '}
          <span className="text-sky-500">Something Epic</span>
        </h2>

        <p className="contact-animate font-body text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-16 leading-relaxed">
          I'm actively looking for Founding Engineer, Full-Stack Engineer, or Senior Engineer roles.
          If you're building something ambitious, let's connect.
        </p>

        {/* Contact Layout */}
        <div className="contact-animate grid md:grid-cols-5 gap-6 md:gap-8 mb-4 text-left">

          {/* Left Side: Contact Cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Email */}
            <a
              href="mailto:sanjaygawai2026@gmail.com"
              className="magnetic blueprint-card bg-white dark:bg-[#0a0a0a] rounded-lg p-6 hover:border-coral/50 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-display text-sm text-coral mb-1 group-hover:text-coral/80 transition-all tracking-widest">EMAIL</div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400">sanjaygawai2026@gmail.com</div>
              </div>
              <svg className="w-5 h-5 text-coral opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sanjay-gawai-74a6b815b/"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic blueprint-card bg-white dark:bg-[#0a0a0a] rounded-lg p-6 hover:border-coral/50 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-display text-sm text-coral mb-1 group-hover:text-coral/80 transition-all tracking-widest">LINKEDIN</div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400">linkedin.com/in/sanjay-gawai-74a6b815b</div>
              </div>
              <svg className="w-5 h-5 text-coral opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/IamSanjayGawai"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic blueprint-card bg-white dark:bg-[#0a0a0a] rounded-lg p-6 hover:border-coral/50 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-display text-sm text-coral mb-1 group-hover:text-coral/80 transition-all tracking-widest">GITHUB</div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400">github.com/IamSanjayGawai</div>
              </div>
              <svg className="w-5 h-5 text-coral opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Right Side: Brutalist Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 blueprint-card bg-white dark:bg-[#0a0a0a] p-6 sm:p-8 rounded-lg flex flex-col gap-5 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="font-mono text-[10px] text-sky-500 mb-2 uppercase tracking-[0.2em] border-b border-sky-500/20 pb-2">
              &gt;&gt; SECURE_CHANNEL_OPEN
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest ml-1">IDENTIFICATION (NAME)</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-md p-3 font-mono text-sm text-slate-900 dark:text-bone outline-none focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest ml-1">RETURN_ADDRESS (EMAIL)</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-md p-3 font-mono text-sm text-slate-900 dark:text-bone outline-none focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-2">
              <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest ml-1">PAYLOAD (MESSAGE)</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something epic..."
                className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-md p-3 font-mono text-sm text-slate-900 dark:text-bone outline-none focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none w-full"
              ></textarea>
              {errorMessage && (
                <div className="text-red-500 font-mono text-xs mt-1">{errorMessage}</div>
              )}
            </div>

            <button
              disabled={formStatus !== 'idle'}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-coral to-cyber text-white font-display text-sm tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none relative overflow-hidden"
            >
              {/* Button Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]"></div>

              {formStatus === 'idle' ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  TRANSMIT_DATA
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              ) : formStatus === 'sending' ? (
                <span className="animate-pulse relative z-10 font-mono text-xs">UPLOADING_PAYLOAD...</span>
              ) : formStatus === 'error' ? (
                <span className="text-red-200 font-mono text-xs relative z-10 flex items-center justify-center gap-2">
                  TRANSMISSION_FAILED
                </span>
              ) : (
                <span className="text-white font-mono text-xs relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TRANSMISSION_SUCCESSFUL
                </span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
