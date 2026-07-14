import type { WindowId } from './types';
import styles from './MenuBar.module.css';

const LINKS: { id: WindowId; label: string }[] = [
  { id: 'about-mac', label: 'Home' },
  { id: 'about-text', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'process-list', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];

interface MenuBarProps {
  onNavigate: (id: WindowId) => void;
}

export function MenuBar({ onNavigate }: MenuBarProps) {
  return (
    <div className={styles.menuBar}>
      <span className={styles.appleMenu} aria-hidden="true">🍎</span>
      <span className={styles.staticMenu}>File</span>
      <span className={styles.staticMenu}>Edit</span>
      <span className={styles.staticMenu}>View</span>
      <nav className={styles.nav} aria-label="Site sections">
        {LINKS.map((link) => (
          <button key={link.id} type="button" className={styles.navLink} onClick={() => onNavigate(link.id)}>
            {link.label}
          </button>
        ))}
      </nav>
      <span className={styles.rightIcon} aria-hidden="true">💾</span>
    </div>
  );
}
