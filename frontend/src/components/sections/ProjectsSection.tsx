
import { Link } from 'react-router-dom';

const ProjectsSection = () => {

  const projects = [
    {
      id: 5,
      title: 'FunZo - Mobile App (iOS & Android)',
      category: 'Full-Stack Development',
      description: '📱 Mobile App - A cutting-edge live streaming and social media mobile application with interactive battles, party rooms, and real-time features.',
      image: 'funzo-hero.png',
      tags: ['React Native', 'React', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC', 'AWS'],
      status: 'Completed',
      featured: true
    },
    {
      id: 7,
      title: 'FunZo - Landing Page (Website)',
      category: 'Frontend Development',
      description: '🌐 Landing Page - Modern, responsive marketing website for FunZo platform with smooth animations and optimized for conversions.',
      image: 'funzo-website.png',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
      status: 'Completed',
      featured: true
    },
    {
      id: 8,
      title: 'FunZo - Admin Panel (Web App)',
      category: 'Full-Stack Development',
      description: '⚙️ Admin Panel - Comprehensive web-based admin dashboard for managing users, streamers, revenue, withdrawals, leaderboards, and analytics.',
      image: 'funzo-admin-dashboard.png',
      tags: ['React', 'Redux Toolkit', 'TypeScript', 'Node.js', 'MongoDB', 'Chart.js'],
      status: 'Completed',
      featured: true
    },
    {
      id: 6,
      title: 'Trustline - Mobile App (iOS & Android)',
      category: 'Full-Stack Development',
      description: '📱 Mobile App - Financial consultancy mobile application for channel partners to manage loan applications, track earnings, and interact with customers.',
      image: 'trustline-hero.png',
      tags: ['React Native', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      status: 'Completed',
      featured: true
    },
    {
      id: 9,
      title: 'Trustline - Admin Panel (Web App)',
      category: 'Full-Stack Development',
      description: '⚙️ Admin Panel - Web-based admin dashboard for managing loan applications, customers, partners, KYC documents, and financial transactions.',
      image: 'trustline-admin-dashboard.png',
      tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
      status: 'Completed',
      featured: true
    },
    {
      id: 1,
      title: 'Asnaro - E-Commerce Web App',
      category: 'Full-Stack Development',
      description: '🌐 Web App - Specialized Japanese e-commerce web application designed to streamline the rental and listing of industrial machines.',
      image: 'asnaro.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Aws', 'Docker'],
      status: 'Completed',
      featured: true
    },
    {
      id: 3,
      title: 'BrandWave - Web App',
      category: 'Full-Stack Development',
      description: '🌐 Web App - Modern design and digital agency web application with AI-powered features and creative solutions.',
      image: 'brandwave.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Gen AI', 'OpenAI'],
      status: 'Completed',
      featured: false
    },
    {
      id: 2,
      title: 'Toads - Educational Website',
      category: 'Full-Stack Development',
      description: '🌐 Website - Official educational website for Toads Academy, the educational division of Flying Toads, India\'s leading VFX studio.',
      image: 'toads.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Hostinger', 'Render'],
      status: 'Completed',
      featured: false
    },
    {
      id: 4,
      title: 'Fake Client - AI Chatbot Web App',
      category: 'Full-Stack Development',
      description: '🌐 Web App - AI-powered chatbot web application designed to assist freelancers in managing their projects and clients.',
      image: 'fake-client.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'TypeScript', 'Gen AI', 'OpenAI'],
      status: 'In Development',
      featured: false
    },
  ];

  return (
    <div className="min-h-screen py-32 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div>
            <span className="inline-block px-4 py-2 glass-effect rounded-full text-xs font-semibold text-gradient-simple mb-6 border border-primary/20">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gradient bg-clip-text tracking-tight">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my latest work, demonstrating expertise across various technologies and platforms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl glass-effect border border-border/50 flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-gradient-primary text-primary-foreground rounded-full text-xs font-bold shadow-lg z-10">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Status badge */}
                  <span className={`absolute top-4 right-4 px-3 py-1.5 ${project.status === 'Completed'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600'
                    } text-white rounded-full text-xs font-bold shadow-lg backdrop-blur-sm z-10`}>
                    {project.status}
                  </span>

                  {/* View Details Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
                    <Link
                      to={`/project/${project.id}`}
                      className="px-8 py-4 bg-gradient-primary text-primary-foreground rounded-2xl font-bold shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Details
                        <span>→</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6 relative z-10 bg-card/50 backdrop-blur-sm flex flex-col flex-grow min-h-[200px]">
                <div className="text-xs text-primary mb-2 font-bold uppercase tracking-wider">{project.category}</div>
                <h3 className="text-xl font-black mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-5 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 glass-effect text-foreground rounded-lg text-xs font-medium border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-3 py-1.5 glass-effect text-foreground rounded-lg text-xs font-medium border border-border/50">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            to="/projects"
            className="inline-block px-10 py-5 neon-border rounded-2xl font-bold text-lg text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
