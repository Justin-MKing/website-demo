import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Window } from './Window';
import { content } from '../../data/content';
import styles from './ProcessListWindow.module.css';

interface ProcessListWindowProps {
  zIndex: number;
  onFocus: () => void;
}

function entryKey(entry: { company: string; dateRange: string }) {
  return `${entry.company}-${entry.dateRange}`;
}

export function ProcessListWindow({ zIndex, onFocus }: ProcessListWindowProps) {
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const highlightTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(highlightTimeout.current);
  }, []);

  const jumpToDetails = (key: string) => {
    document.getElementById(`details-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlightedKey(key);
    window.clearTimeout(highlightTimeout.current);
    highlightTimeout.current = window.setTimeout(() => setHighlightedKey(null), 1500);
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, key: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      jumpToDetails(key);
    }
  };

  return (
    <Window
      id="window-process-list"
      title="Process List"
      initialPosition={{ x: 460, y: 320 }}
      width={420}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Started</th>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          {content.experience.map((entry) => {
            const key = entryKey(entry);
            return (
              <tr
                key={key}
                className={entry.current ? styles.current : undefined}
                role="button"
                tabIndex={0}
                aria-label={`Jump to details for ${entry.role} at ${entry.company}`}
                onClick={() => jumpToDetails(key)}
                onKeyDown={(event) => handleRowKeyDown(event, key)}
              >
                <td>{entry.dateRange}</td>
                <td>
                  {entry.role}
                  {entry.current ? ' *' : ''}
                </td>
                <td>{entry.company}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.detailsSection}>
        {content.experience.map((entry) => {
          const key = entryKey(entry);
          return (
            <div
              key={`${key}-details`}
              id={`details-${key}`}
              className={`${styles.detailsEntry} ${highlightedKey === key ? styles.highlighted : ''}`}
            >
              <h4 className={styles.detailsHeading}>
                {entry.role} — {entry.company}
              </h4>
              <ul className={styles.bullets}>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Window>
  );
}
