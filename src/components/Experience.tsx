import { content } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow="Experience" title="Where I've Worked" />
        </ScrollReveal>

        <div className={styles.timeline}>
          {content.experience.map((entry, index) => (
            <ScrollReveal key={`${entry.company}-${entry.dateRange}`} delay={index * 0.08}>
              <div className={`glass ${styles.entry}`}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.role}>{entry.role}</h3>
                    <p className={styles.company}>
                      {entry.company}
                      {entry.location ? ` · ${entry.location}` : ''}
                    </p>
                  </div>
                  <span className={entry.current ? styles.badgeCurrent : styles.badge}>
                    {entry.dateRange}
                  </span>
                </div>
                <ul className={styles.bullets}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
