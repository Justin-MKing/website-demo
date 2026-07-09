import { useEffect, useState } from 'react';

export function useTypewriter(text: string, enabled: boolean, speedMs = 60, pauseMs = 2000) {
  const [display, setDisplay] = useState(enabled ? '' : text);

  useEffect(() => {
    if (!enabled) {
      setDisplay(text);
      return;
    }

    let index = 0;
    let deleting = false;
    let timeoutId: number;

    const tick = () => {
      if (!deleting) {
        index += 1;
        setDisplay(text.slice(0, index));
        if (index === text.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, pauseMs);
          return;
        }
      } else {
        index -= 1;
        setDisplay(text.slice(0, index));
        if (index === 0) {
          deleting = false;
        }
      }
      timeoutId = window.setTimeout(tick, speedMs);
    };

    timeoutId = window.setTimeout(tick, speedMs);
    return () => window.clearTimeout(timeoutId);
  }, [text, enabled, speedMs, pauseMs]);

  return display;
}
