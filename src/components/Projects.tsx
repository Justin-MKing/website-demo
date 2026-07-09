import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import { content } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow="Projects" title="Featured Work" />
        </ScrollReveal>

        <div className={styles.grid}>
          {content.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div className={`glass ${styles.card}`}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <GithubIcon size={16} /> Code
                  </a>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className={styles.moreWrapper}>
            <a href={content.projectsMoreUrl} target="_blank" rel="noreferrer" className={styles.moreButton}>
              View More on GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
