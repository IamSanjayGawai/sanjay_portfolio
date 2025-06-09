import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Full-Stack Development',
      description: 'Modern e-commerce solution with React, Node.js, and Stripe integration',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      featured: true,
    },
    {
      id: 2,
      title: 'Toads Academy Dashboard',
      category: 'UI/UX Design',
      description: 'Clean and intuitive dashboard design for analytics platform',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['Figma', 'React', 'TypeScript', 'Chart.js'],
      featured: true,
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      description: 'Secure mobile banking application with biometric authentication',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      tags: ['React Native', 'Firebase', 'Biometrics'],
      featured: false,
    },
    {
      id: 4,
      title: 'AI Chat Interface',
      category: 'Frontend Development',
      description: 'Interactive chat interface with AI integration and real-time messaging',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      tags: ['React', 'WebSocket', 'OpenAI', 'TailwindCSS'],
      featured: false,
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'Web Design',
      description: 'Creative portfolio website with advanced animations and interactions',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      tags: ['React', 'Framer Motion', 'GSAP'],
      featured: false,
    },
    {
      id: 6,
      title: 'Task Management App',
      category: 'Full-Stack Development',
      description: 'Collaborative task management with real-time updates and team features',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tags: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest work, demonstrating expertise across 
              various technologies and design approaches
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.2}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border"
                  whileHover={{ y: -10 }}
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
                        View Case Study
                      </Link>
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-sm text-primary mb-2">{project.category}</div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
              More Projects
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <motion.div
                  className="group bg-card border border-border rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      to={`/project/${project.id}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
