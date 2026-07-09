import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { content } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './Hero.module.css';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const typedHeading = useTypewriter(content.hero.heading, !reducedMotion);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h1 className={styles.heading}>
          {typedHeading}
          <span className={styles.cursor} aria-hidden="true">
            |
          </span>
        </h1>
        <p className={`gradientText ${styles.subtitle}`}>{content.hero.subtitle}</p>
        <p className={styles.tagline}>{content.hero.tagline}</p>

        <div className={styles.actions}>
          <a href={content.hero.ctaPrimary.href} className={styles.primaryButton}>
            {content.hero.ctaPrimary.label}
          </a>
          <a href={content.hero.ctaSecondary.href} className={styles.secondaryButton}>
            {content.hero.ctaSecondary.label}
          </a>
        </div>

        <div className={styles.social}>
          <a href={content.hero.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href={content.hero.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={20} />
          </a>
          <a href={content.hero.social.email} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
