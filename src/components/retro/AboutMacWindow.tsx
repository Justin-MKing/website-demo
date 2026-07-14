import { Window } from './Window';
import { MemoryBar } from './MemoryBar';
import { content } from '../../data/content';
import styles from './AboutMacWindow.module.css';

interface AboutMacWindowProps {
  zIndex: number;
  onFocus: () => void;
}

export function AboutMacWindow({ zIndex, onFocus }: AboutMacWindowProps) {
  return (
    <Window
      id="window-about-mac"
      title="About This Macintosh"
      initialPosition={{ x: 40, y: 90 }}
      width={380}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className={styles.body}>
        <h1 className={styles.name}>{content.hero.heading}</h1>
        <p className={styles.subtitle}>{content.hero.subtitle}</p>
        <p className={styles.tagline}>{content.hero.tagline}</p>
        <div className={styles.bars}>
          {content.about.stats.map((stat) => (
            <MemoryBar
              key={stat.label}
              label={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              maxForBar={stat.target * 1.2}
            />
          ))}
        </div>
        <div className={styles.links}>
          <a href={content.hero.ctaPrimary.href}>{content.hero.ctaPrimary.label}</a>
          <a href={content.hero.ctaSecondary.href}>{content.hero.ctaSecondary.label}</a>
        </div>
      </div>
    </Window>
  );
}
