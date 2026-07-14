import { useCallback, useRef, useState } from 'react';
import type { PointerEvent } from 'react';

export interface Position {
  x: number;
  y: number;
}

export function useDraggable(initial: Position) {
  const [position, setPosition] = useState<Position>(initial);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: position.x,
        originY: position.y,
      };
    },
    [position]
  );

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (!dragState.current) return;
    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    setPosition({ x: dragState.current.originX + dx, y: dragState.current.originY + dy });
  }, []);

  const onPointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    dragState.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  return { position, onPointerDown, onPointerMove, onPointerUp };
}
