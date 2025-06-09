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
      title: 'Freelancer Frontend Developer - Short-term Contract',
      logo: 'toads.jpeg',
      company: 'Toads Academy',
      period: '2025 - Present',
      description: 'Designed and Developed the Toad\'s Academy website using HTML, CSS, JavaScript, Bootstrap and Node.js.',
      achievements: ['Completed project ahead of schedule', 'Self owned project from start to finish', 'Enhanced user experience with responsive design']
    },
    {
      title: 'Frontend Developer',
      logo: 'careersurvival.jpeg',
      company: 'Career Survival',
      period: 'Jan-2024 - Nov-2024',
      description: 'Led Full-Stack Projects Spearheaded the Asnaro project, a full-stack React application for a Japanese rental machinery platform, deployed on Vercel with seamless API integration and reusable, responsive components. Worked on the AI-powered PDF Chat project, utilizing LLM models and Langchain to enable advanced PDF reading and summarization, showcasing expertise in merging AI technologies with web development.',
      achievements: ['Built website for japanese client', 'Reduced load times by 40%', 'Mentored junior developers', 'Enhancing team skills']
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
                        />
                        <div className="text-sm text-primary mb-2">
                          {exp.period}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                      <div className="text-lg text-muted-foreground mb-3">{exp.company}</div>
                      <p className="text-sm mb-4">{exp.description}</p>
                      <ul className="text-xs space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
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