import { Mail } from 'lucide-react';
import { Window } from './Window';
import { GithubIcon, LinkedinIcon } from '../icons';
import { content } from '../../data/content';
import styles from './ContactWindow.module.css';

interface ContactWindowProps {
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
}

export function ContactWindow({ zIndex, onFocus, onClose }: ContactWindowProps) {
  return (
    <Window
      id="window-contact"
      title="Contact"
      initialPosition={{ x: 700, y: 500 }}
      width={260}
      zIndex={zIndex}
      onFocus={onFocus}
      isCloseable
      onClose={onClose}
    >
      <div className={styles.body}>
        <p className={styles.name}>{content.footer.name}</p>
        <div className={styles.links}>
          <a href={content.hero.social.github} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> GitHub
          </a>
          <a href={content.hero.social.linkedin} target="_blank" rel="noreferrer">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <a href={content.hero.social.email}>
            <Mail size={16} /> Email
          </a>
        </div>
      </div>
    </Window>
  );
}
