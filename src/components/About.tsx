import { content } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeading } from './SectionHeading';
import { StatCounter } from './StatCounter';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow="About" title={content.about.heading} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className={styles.description}>{content.about.description}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={`glass ${styles.statsGrid}`}>
            {content.about.stats.map((stat) => (
              <StatCounter
                key={stat.label}
                target={stat.target}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
