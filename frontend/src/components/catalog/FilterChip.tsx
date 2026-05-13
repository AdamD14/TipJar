'use client';

type Props = {
  label: string;
  onRemove?: () => void;
};

export default function FilterChip({ label, onRemove }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/10 px-3 py-1.5 text-sm text-gold-400 font-body">
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="rounded-full border border-gold-400/40 px-2 py-0.5 text-xs text-gold-400 hover:bg-gold-400/12 focus-visible:ring-2 focus-visible:ring-gold-400/70 transition-colors duration-150"
        >
          ×
        </button>
      )}
    </span>
  );
}
