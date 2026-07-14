import { useState } from 'react';
import type { ReactNode, PointerEvent, KeyboardEvent } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import styles from './Window.module.css';

const ZOOM_SCALE = 1.3;

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
  const [isZoomed, setIsZoomed] = useState(false);

  const handleTitleBarPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onFocus();
    if ((event.target as HTMLElement).closest('[data-window-control]')) {
      return;
    }
    onPointerDown(event);
  };

  const toggleZoom = () => setIsZoomed((zoomed) => !zoomed);

  const handleZoomKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleZoom();
    }
  };

  const scale = isZoomed ? ZOOM_SCALE : 1;

  return (
    <div
      id={id}
      className={styles.window}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        zIndex,
        width,
      }}
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
        <span
          className={styles.zoomBox}
          data-window-control
          role="button"
          tabIndex={0}
          aria-label={isZoomed ? 'Shrink window' : 'Enlarge window and text'}
          aria-pressed={isZoomed}
          onClick={toggleZoom}
          onKeyDown={handleZoomKeyDown}
        />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
