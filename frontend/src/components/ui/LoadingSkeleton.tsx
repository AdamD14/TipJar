import Skeleton from "@/components/ui/layout/Skeleton";

/**
 * LoadingSkeleton — convenience wrapper for multi-line text skeletons.
 *
 * @param lines  number of skeleton rows (default 3)
 * @param heights CSS values for each row (cycled if fewer items than lines)
 */
interface LoadingSkeletonProps {
  lines?: number;
  heights?: string[];
  gap?: string;
}

export default function LoadingSkeleton({
  lines = 3,
  heights = ["16px", "16px", "12px"],
  gap = "12px",
}: LoadingSkeletonProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={heights[i % heights.length]}
          /* Vary widths to look more natural */
          width={i === lines - 1 ? "65%" : "100%"}
        />
      ))}
    </div>
  );
}
