// frontend/src/components/profile/SupportTierCard.tsx
'use client';

import clsx from 'clsx';

type Tier = {
  id: string;
  name: string;           // e.g., "Silver"
  priceMonthly: number;   // e.g., 5
  perks: string[];        // bullet list
  recommended?: boolean;
};

type Props = {
  tier: Tier;
  onSelect?: (tierId: string) => void;
};

const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';
const GOLD = '#FFD700';

export default function SupportTierCard({ tier, onSelect }: Props) {
  const { id, name, priceMonthly, perks, recommended } = tier;

  return (
    <div
      className={clsx(
        'relative flex h-full flex-col justify-between rounded-2xl border p-5',
        'border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.85)] backdrop-blur-sm',
        recommended && 'ring-1 ring-[rgba(255,215,0,0.35)]'
      )}
      aria-label={`${name} tier`}
    >
      {recommended && (
        <span
          className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ background: 'rgba(255,215,0,0.12)', color: GOLD }}
        >
          Recommended
        </span>
      )}

      <div>
        <h3 className="text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>{name}</h3>
        <p className="mt-1 text-sm" style={{ color: TEXT_SECONDARY }}>
          ${priceMonthly}/mo
        </p>

        <ul className="mt-4 space-y-2">
          {perks.map((p) => (
            <li key={p} className="text-sm" style={{ color: TEXT_PRIMARY }}>
              • {p}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => onSelect?.(id)}
        className="mt-5 inline-flex items-center justify-center rounded-[12px] border border-[#FFD700CC] px-4 py-2 text-sm font-medium text-[#FFD700] transition hover:bg-[rgba(255,215,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
        aria-label={`Choose ${name} at $${priceMonthly} per month`}
      >
        Become a Member
      </button>
    </div>
  );
}
