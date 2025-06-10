
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Projects grid animation with section-based triggering
      gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 60,
            rotationX: 30,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Subtle floating animation after initial animation
      gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
        gsap.to(card, {
          y: -5,
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2 + (index * 0.5)
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Asnaro - E-Commerce Platform',
      category: 'Full-Stack Development',
      description: 'Asnaro is a specialized Japanese e-commerce platform designed to streamline the rental and listing of industrial machines.',
      image: 'asnaro.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Aws', 'Docker'],
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Toads - Educational Platform',
      category: 'Full-Stack Development',
      description: 'Developed the official website for Toads Academy, the educational division of Flying Toads, India’s leading VFX studio.',
      image: 'toads.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Hostinger', 'Render'],
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Fake Client - AI Chatbot For Freelancers ',
      category: 'Full-Stack Development',
      description: 'AI-powered chatbot designed to assist freelancers in managing their projects and clients.',
      image: 'fake-client.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Gen AI', 'OpenAI'],
      status: 'In Development'
    },
        {
      id: 4,
      title: 'BrandWave - Design and Digital Agency',
      category: 'Full-Stack Development',
      description: 'AI-powered chatbot designed to assist freelancers in managing their projects and clients.',
      image: 'fake-client.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Gen AI', 'OpenAI'],
      status: 'In Development'
    }
     
  ];

  return (
    <div ref={sectionRef} className="min-h-screen py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-reveal text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-reveal text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work, demonstrating expertise across various technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card stagger-item group relative overflow-hidden rounded-2xl bg-card border border-border"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/project/${project.id}`}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
              <span className={`absolute top-4 right-4 px-3 py-1 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'} text-secondary-foreground rounded-full text-xs font-semibold`}>
                {project.status}
              </span>

              <div className="p-6">
                <div className="text-sm text-primary mb-2">{project.category}</div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              View All Projects
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
