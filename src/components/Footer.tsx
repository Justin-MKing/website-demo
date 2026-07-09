import { GithubIcon, LinkedinIcon } from './icons';
import { content } from '../data/content';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {content.footer.name} - {content.footer.tagline}. All rights reserved.
        </p>
        <div className={styles.social}>
          <a href={content.hero.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={content.hero.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
