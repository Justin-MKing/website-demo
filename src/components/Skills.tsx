import { content } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow="Skills" title="Technical Expertise" />
        </ScrollReveal>

        <div className={styles.grid}>
          {content.skills.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.1}>
              <div className={`glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>{category.title}</h3>
                <ul className={styles.list}>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
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
