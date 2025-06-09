
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {project_detail} from '../data/project-details'
import WorkInProgress from './WorkInProgress';

const ProjectDetail = () => {
  const { id } = useParams();

  // Mock project data - in a real app, this would come from an API

const project = project_detail.find(p => p.id === Number(id));
  console.log(project_detail,project, id);



if (!project) {
  return (
    <div className="pt-20 min-h-screen flex justify-center items-center text-red-500">
      <h2>Project not found</h2>
    </div>
  );
}

if (project.status === 'In Development') {
  return (
   
<WorkInProgress />
 
  );
}



  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/#projects"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            
            <div className="text-sm text-primary mb-4">{project.category}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Site
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Code
              </motion.a>
            </div>
            
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
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
              <div className="space-y-4">
                {Object.entries(project.technologies as Record<string, string[]>).map(([category, techs]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-primary mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-card border border-border rounded-lg text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Challenges & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="border-l-4 border-primary pl-4">
                    <strong className="text-primary">Solution:</strong>
                    <p className="mt-1">{challenge.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </section>

      {/* create a a div to show themme, typocropht and also create  a div to show all images iof website pages  with name of page */}
<section className="py-12 bg-secondary/30">
  <div className="max-w-6xl mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Website Pages</h2>

      {/* Masonry grid using columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        { project.projectImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid overflow-hidden rounded-lg shadow-lg bg-card border border-border"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg text-center font-semibold">
                {image.alt}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
</section>


    </div>
  );
};

export default ProjectDetail;
