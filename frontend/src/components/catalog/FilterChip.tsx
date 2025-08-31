'use client';

type Props = {
  label: string;
  onRemove?: () => void;
};

export default function FilterChip({ label, onRemove }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,215,0,0.10)] px-3 py-1.5 text-sm text-[#FFD700]">
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="rounded-full border border-[#FFD70066] px-2 py-0.5 text-xs text-[#FFD700] hover:bg-[rgba(255,215,0,0.12)] focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
        >
          ×
        </button>
      )}
    </span>
  );
}

