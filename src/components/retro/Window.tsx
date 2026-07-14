import type { ReactNode, PointerEvent, KeyboardEvent } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import styles from './Window.module.css';

interface WindowProps {
  id: string;
  title: string;
  initialPosition: { x: number; y: number };
  width?: number;
  zIndex: number;
  onFocus: () => void;
  isCloseable?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export function Window({ id, title, initialPosition, width, zIndex, onFocus, isCloseable, onClose, children }: WindowProps) {
  const { position, onPointerDown, onPointerMove, onPointerUp } = useDraggable(initialPosition);

  const handleTitleBarPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onFocus();
    if ((event.target as HTMLElement).closest('[data-window-control]')) {
      return;
    }
    onPointerDown(event);
  };

  return (
    <div
      id={id}
      className={styles.window}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex, width }}
      onMouseDown={onFocus}
    >
      <div
        className={styles.titleBar}
        onPointerDown={handleTitleBarPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span
          className={styles.closeBox}
          data-window-control
          role={isCloseable ? 'button' : undefined}
          tabIndex={isCloseable ? 0 : undefined}
          aria-label={isCloseable ? 'Close window' : undefined}
          aria-hidden={isCloseable ? undefined : true}
          onClick={isCloseable ? onClose : undefined}
          onKeyDown={
            isCloseable
              ? (event: KeyboardEvent<HTMLSpanElement>) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onClose?.();
                  }
                }
              : undefined
          }
        />
        <span className={styles.titleText}>{title}</span>
        <span className={styles.zoomBox} data-window-control aria-hidden="true" />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
