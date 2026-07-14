import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './KernelViewWidget.module.css';

const BAR_COUNT = 24;

export function KernelViewWidget() {
  const reducedMotion = useReducedMotion();
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: BAR_COUNT }, () => 20));

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(Math.random() * 480 + 20);
        return next;
      });
    }, 600);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className={styles.window} aria-hidden="true">
      <div className={styles.titleBar}>
        <span className={styles.titleText}>KernelView</span>
      </div>
      <div className={styles.chart}>
        {bars.map((height, index) => (
          <div key={index} className={styles.bar} style={{ height: `${Math.min(100, (height / 500) * 100)}%` }} />
        ))}
      </div>
    </div>
  );
}
