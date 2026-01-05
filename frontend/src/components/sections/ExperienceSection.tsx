import { useRef, useEffect } from 'react';

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation for timeline items
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'Full Stack Software Engineer | MERN Stack | Team Lead',
      logo: 'placeholder.svg',
      company: 'RescueClick Pvt. Ltd',
      period: 'Aug 2025 – Present',
      location: 'Onsite – Pune, India',
      description: 'Acted as technical owner for multiple production projects, responsible for system architecture, task planning, code reviews, team coordination, and final deliveries. Played a key role in requirement analysis, technical decision-making, and sprint planning to ensure scalable and maintainable solutions.',
      achievements: [
        'Technical owner for multiple production projects',
        'Led system architecture and task planning',
        'Conducted code reviews and team coordination',
        'Worked closely with product and business stakeholders',
        'Mentored interns and junior developers'
      ],
      projects: [
        {
          name: 'Funzo (Live Social Entertainment Platform)',
          tech: 'TypeScript, Node.js, MongoDB, AWS, Agora, Socket.IO, Redis, React Native, React Web, Redux Toolkit, Firebase',
          description: 'Real-time social entertainment platform enabling creators to host interactive video/audio live streams with high user concurrency. Designed and led backend architecture, implemented scalable REST APIs, WebSocket-based real-time communication, and optimized database queries and caching strategies.'
        },
        {
          name: 'Trustline (Loan Management & Multi-Role Platform)',
          tech: 'JavaScript, Node.js, Express.js, MongoDB, JWT, Argon2, React Web & React Native, Redux Toolkit',
          description: 'Secure loan management platform supporting multi-role workflows (Admin, ASM, RM, Partner, Customer). Architected backend services for loan processing, approvals, and role-based access control. Implemented secure authentication, authorization, and document upload workflows.'
        }
      ]
    },
    {
      title: 'Freelancer Frontend Developer - Short-term Contract',
      logo: 'toads.jpeg',
      company: 'Toads Academy',
      period: '2025',
      location: 'Remote',
      description: 'Designed and Developed the Toad\'s Academy website using HTML, CSS, JavaScript, Bootstrap and Node.js. Delivered a complete educational platform website with responsive design and modern UI/UX.',
      achievements: ['Completed project ahead of schedule', 'Self owned project from start to finish', 'Enhanced user experience with responsive design', 'Multipage website with multiple sections'],
      projects: [
        {
          name: 'Toads Academy Website',
          tech: 'HTML, CSS, JavaScript, Node.js, MongoDB',
          description: 'Educational platform website with modern design and responsive layout.'
        },
        {
          name: 'BrandWave',
          tech: 'React.js, Node.js, MongoDB, TypeScript',
          description: 'Design and Digital Agency website with modern UI/UX.'
        },
        {
          name: 'Serenity',
          tech: 'React.js, Node.js, MongoDB',
          description: 'Full-stack application with responsive design and modern features.'
        }
      ]
    },
    {
      title: 'Full Stack Software Engineer (Full-Time + Freelance)',
      logo: 'careersurvival.jpeg',
      company: 'Career Survival Japan & Freelance',
      period: 'Jan 2024 – Aug 2025',
      location: 'Remote',
      description: 'Worked as a full-time developer across employment and freelance engagements, delivering production-grade applications for Japanese and Indian clients. Actively involved in client communication, requirement gathering, estimations, and delivery planning. Maintained high code quality standards while working independently and in distributed remote teams.',
      achievements: [
        'Developed and deployed full-stack applications using React.js, Node.js, MongoDB, and TypeScript',
        'Built Asnaro, a machinery rental platform for Japanese users',
        'Implemented responsive UI, API integrations, authentication flows, and performance optimizations',
        'Managed end-to-end development lifecycle including requirement analysis, development, deployment, and post-launch support',
        'Collaborated in Agile environments and consistently delivered projects within committed timelines'
      ],
      projects: [
        {
          name: 'Asnaro',
          tech: 'React.js, Node.js, MongoDB, TypeScript, AWS',
          description: 'Machinery rental platform for Japanese users, handling frontend, backend, and cloud deployment. Implemented responsive UI, API integrations, authentication flows, and performance optimizations.'
        }
      ]
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey and the impact I've made along the way
          </p>
        </div>

        <div className="timeline-container relative">
          {/* Timeline line - hidden on mobile, shown on desktop */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full origin-top hidden lg:block"></div>

          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item opacity-0 transform translate-y-8 transition-all duration-700 ease-out ${
                  // Desktop: alternating layout, Mobile: single side
                  'flex flex-col lg:flex-row lg:items-center ' +
                  (index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse')
                }`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-1/2 lg:px-8">
                  <div className={`${index % 2 === 0 ? 'lg:text-left' : 'lg:text-left'}`}>
                    <div className="inline-block w-full p-6 bg-card border border-border rounded-xl">
                      <div className='flex flex-col items-center lg:items-start mb-4'>
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`} 
                          className="w-20 h-20 mb-4 rounded-full object-cover border-2 border-primary" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <div className="text-sm text-primary mb-1 font-semibold">
                          {exp.period}
                        </div>
                        {exp.location && (
                          <div className="text-xs text-muted-foreground mb-2">
                            {exp.location}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{exp.title}</h3>
                      <div className="text-lg text-primary mb-3 font-semibold">{exp.company}</div>
                      <p className="text-sm mb-4 text-foreground/90 leading-relaxed">{exp.description}</p>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements:</h4>
                          <ul className="text-xs space-y-1.5">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start text-foreground/80">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.projects && exp.projects.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Key Projects:</h4>
                          <div className="space-y-3">
                            {exp.projects.map((project, i) => (
                              <div key={i} className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                                <h5 className="text-sm font-semibold text-primary mb-1">{project.name}</h5>
                                <p className="text-xs text-muted-foreground mb-2">{project.tech}</p>
                                <p className="text-xs text-foreground/70 leading-relaxed">{project.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline dot - only visible on desktop */}
                <div className="hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10"></div>

                {/* Empty space for desktop layout */}
                <div className="hidden lg:block lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;