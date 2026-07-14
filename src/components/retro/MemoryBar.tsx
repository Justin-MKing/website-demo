import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './MemoryBar.module.css';

interface MemoryBarProps {
  label: string;
  target: number;
  suffix?: string;
  maxForBar: number;
}

export function MemoryBar({ label, target, suffix = '', maxForBar }: MemoryBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const durationMs = 1000;
    const startTime = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reducedMotion]);

  const fillPercent = Math.min(100, (value / maxForBar) * 100);

  return (
    <div className={styles.row} ref={ref}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${fillPercent}%` }} />
      </div>
      <span className={styles.value}>
        {value}
        {suffix}
      </span>
    </div>
  );
}
