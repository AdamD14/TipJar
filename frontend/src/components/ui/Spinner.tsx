/**
 * Spinner — TipJar+ Design System (design.md §3.5.1)
 *
 * SVG spinner with gold→purple gradient track.
 * Gradient: linear-gradient(135deg, --gold-400 0%, --purple-300 100%)
 * i.e. #FFD700 → #4D194D
 *
 * Animation: rotate + dash (1.5–2s)
 *
 * Sizes:
 * sm — 24px, stroke 4.5px (buttons, inputs)
 * md — 48px, stroke 3.5px (cards, modals) [default]
 * lg — 72px, stroke 3.0px (full-screen)
 */

const SIZES = {
  sm: { size: 24, stroke: 4.5 },
  md: { size: 48, stroke: 3.5 },
  lg: { size: 72, stroke: 3.0 },
} as const;

type SpinnerSize = keyof typeof SIZES;

interface SpinnerProps {
  size?: SpinnerSize | number;
  className?: string;
  label?: string;
}

const GRADIENT_ID_PREFIX = "tj-spinner-grad";

export default function Spinner({
  size = "md",
  className = "",
  label = "Ładowanie…",
}: SpinnerProps) {
  const config =
    typeof size === "number"
      ? { size, stroke: 3.5 }
      : SIZES[size];

  const { size: px, stroke } = config;
  const r = (px - stroke) / 2;
  const cx = px / 2;
  const circumference = 2 * Math.PI * r;
  const gradId = `${GRADIENT_ID_PREFIX}-${px}`;

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        aria-hidden="true"
        className="animate-[spin_1.5s_linear_infinite]"
      >
        <defs>
          {/* Gold → Purple gradient — design.md §5.1: --gold-400 → --purple-300 */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#4D194D" />
          </linearGradient>
        </defs>

        <circle
          cx={cx}
          cy={cx}
          r={r}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />

        <circle
          cx={cx}
          cy={cx}
          r={r}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.6} ${circumference * 0.4}`}
          strokeDashoffset={0}
          style={{
            transformOrigin: `${cx}px ${cx}px`,
          }}
        />
      </svg>
    </span>
  );
}
