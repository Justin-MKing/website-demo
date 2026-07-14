interface PixelIconProps {
  kind: 'document' | 'app' | 'trash';
}

export function PixelIcon({ kind }: PixelIconProps) {
  if (kind === 'trash') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="9" y="11" width="14" height="16" fill="#dddddd" stroke="#000000" strokeWidth="1" />
        <rect x="7" y="7" width="18" height="4" fill="#dddddd" stroke="#000000" strokeWidth="1" />
        <rect x="12" y="4" width="8" height="3" fill="#dddddd" stroke="#000000" strokeWidth="1" />
        <line x1="13" y1="14" x2="13" y2="24" stroke="#000000" strokeWidth="1" />
        <line x1="16" y1="14" x2="16" y2="24" stroke="#000000" strokeWidth="1" />
        <line x1="19" y1="14" x2="19" y2="24" stroke="#000000" strokeWidth="1" />
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
