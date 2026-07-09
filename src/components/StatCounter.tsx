import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import styles from './StatCounter.module.css';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ target, label, suffix = '' }: StatCounterProps) {
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

    const durationMs = 1200;
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

  return (
    <div className={styles.stat} ref={ref}>
      <div className={styles.value}>
        {value}
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
