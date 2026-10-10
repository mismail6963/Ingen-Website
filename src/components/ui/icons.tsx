/** Small inline icons used across the site. All decorative (aria-hidden). */

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={`rtl:-scale-x-100 ${className ?? ""}`}>
      <path d="M3 9L9 3M4 3h5v5" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={`rtl:-scale-x-100 ${className ?? ""}`}>
      <path d="M1 6h14M9 1l5 5-5 5" />
    </svg>
  );
}

export function Expand() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M8.5 1.5h4v4M12.5 1.5L8 6M5.5 12.5h-4v-4M1.5 12.5L6 8" />
    </svg>
  );
}

export function Close() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  );
}

export function Check({ size = 12, strokeWidth = 2.4 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#FFFFFF" strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}
