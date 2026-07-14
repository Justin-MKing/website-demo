interface PixelIconProps {
  kind: 'document' | 'app' | 'mail';
}

export function PixelIcon({ kind }: PixelIconProps) {
  if (kind === 'mail') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="8" width="24" height="18" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        <path d="M4 8 L16 19 L28 8" fill="none" stroke="#8877aa" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === 'app') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="5" width="22" height="22" fill="#eeeeee" stroke="#000000" strokeWidth="1" />
        <rect x="9" y="9" width="14" height="3" fill="#8877aa" />
        <rect x="9" y="14" width="14" height="3" fill="#9988bb" />
        <rect x="9" y="19" width="8" height="3" fill="#8877aa" />
      </svg>
    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 4 H19 L23 8 V28 H9 Z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <path d="M19 4 V8 H23 Z" fill="#cccccc" stroke="#000000" strokeWidth="1" />
      <line x1="12" y1="14" x2="20" y2="14" stroke="#888888" strokeWidth="1" />
      <line x1="12" y1="18" x2="20" y2="18" stroke="#888888" strokeWidth="1" />
      <line x1="12" y1="22" x2="18" y2="22" stroke="#888888" strokeWidth="1" />
    </svg>
  );
}
