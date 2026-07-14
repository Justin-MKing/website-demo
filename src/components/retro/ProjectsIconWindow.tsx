import { Window } from './Window';
import { PixelIcon } from './icons';
import { content } from '../../data/content';
import styles from './ProjectsIconWindow.module.css';

interface ProjectsIconWindowProps {
  zIndex: number;
  onFocus: () => void;
}

export function ProjectsIconWindow({ zIndex, onFocus }: ProjectsIconWindowProps) {
  return (
    <Window
      id="window-projects"
      title="Projects"
      initialPosition={{ x: 40, y: 760 }}
      width={380}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className={styles.statusBar}>{content.projects.length} items</div>
      <div className={styles.grid}>
        {content.projects.map((project) => (
          <a
            key={project.title}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.iconCell}
          >
            <PixelIcon kind="app" />
            <span className={styles.iconLabel}>{project.title}</span>
          </a>
        ))}
      </div>

      <div className={styles.detailsSection}>
        {content.projects.map((project) => (
          <div key={`${project.title}-details`} className={styles.detailsEntry}>
            <h4 className={styles.detailsHeading}>{project.title}</h4>
            <p className={styles.detailsDescription}>{project.description}</p>
            <p className={styles.detailsTech}>{project.tech.join(' · ')}</p>
          </div>
        ))}
      </div>

      <div className={styles.moreLink}>
        <a href={content.projectsMoreUrl} target="_blank" rel="noreferrer">
          View More on GitHub
        </a>
      </div>
    </Window>
  );
}
