import { Window } from './Window';
import { PixelIcon } from './icons';
import { content } from '../../data/content';
import styles from './SkillsIconWindow.module.css';

interface SkillsIconWindowProps {
  zIndex: number;
  onFocus: () => void;
}

export function SkillsIconWindow({ zIndex, onFocus }: SkillsIconWindowProps) {
  const totalItems = content.skills.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <Window
      id="window-skills"
      title="Skills"
      initialPosition={{ x: 40, y: 420 }}
      width={360}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className={styles.statusBar}>{totalItems} items</div>
      <div className={styles.body}>
        {content.skills.map((category) => (
          <div key={category.title} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.grid}>
              {category.items.map((item) => (
                <div key={item} className={styles.iconCell}>
                  <PixelIcon kind="document" />
                  <span className={styles.iconLabel}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}
