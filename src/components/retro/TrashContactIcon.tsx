import { PixelIcon } from './icons';
import styles from './TrashContactIcon.module.css';

interface TrashContactIconProps {
  onOpen: () => void;
}

export function TrashContactIcon({ onOpen }: TrashContactIconProps) {
  return (
    <button type="button" className={styles.trash} onClick={onOpen} aria-label="Open contact information">
      <PixelIcon kind="trash" />
      <span className={styles.label}>Contact</span>
    </button>
  );
}
