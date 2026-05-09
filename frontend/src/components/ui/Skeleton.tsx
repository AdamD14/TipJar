/**
 * Skeleton — TipJar+ Design System (system.md §5.2)
 *
 * Shimmer animation: teal-800 → teal-700 → teal-800
 * Uses `.skeleton-shimmer` utility from globals.css.
 *
 * Border radius variants:
 *  text    — 4px
 *  card    — 8px  (default)
 *  avatar  — 50%
 *  full    — 9999px
 */

type SkeletonVariant = "text" | "card" | "avatar" | "full";

interface SkeletonProps {
  /** Width — CSS value e.g. "100%", "120px" */
  width?: string;
  /** Height — CSS value e.g. "16px", "48px" */
  height?: string;
  /** Visual shape / border-radius */
  variant?: SkeletonVariant;
  className?: string;
}

const RADIUS: Record<SkeletonVariant, string> = {
  text:   "4px",
  card:   "8px",
  avatar: "50%",
  full:   "9999px",
};

export default function Skeleton({
  width = "100%",
  height = "16px",
  variant = "card",
  className = "",
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius: RADIUS[variant],
        flexShrink: 0,
      }}
    />
  );
}
