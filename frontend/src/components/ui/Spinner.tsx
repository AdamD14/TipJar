export default function Spinner({ size = 16, className = '' }: { size?: number; className?: string }) {
  const s = `${size}px`;
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-block animate-spin rounded-full border-2 border-current border-r-transparent ${className}`}
      style={{ width: s, height: s }}
    />
  );
}

