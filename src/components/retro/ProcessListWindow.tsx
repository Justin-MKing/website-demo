import { Window } from './Window';
import { content } from '../../data/content';
import styles from './ProcessListWindow.module.css';

interface ProcessListWindowProps {
  zIndex: number;
  onFocus: () => void;
}

export function ProcessListWindow({ zIndex, onFocus }: ProcessListWindowProps) {
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
            <th>Started</th>
            <th>Role</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {content.experience.map((entry) => (
            <tr key={`${entry.company}-${entry.dateRange}`} className={entry.current ? styles.current : undefined}>
              <td>{entry.dateRange}</td>
              <td>
                {entry.role}
                {entry.current ? ' *' : ''}
              </td>
              <td>{entry.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.detailsSection}>
        {content.experience.map((entry) => (
          <div key={`${entry.company}-${entry.dateRange}-details`} className={styles.detailsEntry}>
            <h4 className={styles.detailsHeading}>
              {entry.role} — {entry.company}
            </h4>
            <ul className={styles.bullets}>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Window>
  );
}
