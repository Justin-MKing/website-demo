import { Window } from './Window';
import { content } from '../../data/content';
import styles from './AboutTextWindow.module.css';

interface AboutTextWindowProps {
  zIndex: number;
  onFocus: () => void;
}

export function AboutTextWindow({ zIndex, onFocus }: AboutTextWindowProps) {
  return (
    <Window
      id="window-about-text"
      title="About Justin — Get Info"
      initialPosition={{ x: 460, y: 90 }}
      width={320}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className={styles.body}>
        <h2 className={styles.heading}>{content.about.heading}</h2>
        <p className={styles.description}>{content.about.description}</p>
      </div>
    </Window>
  );
}
