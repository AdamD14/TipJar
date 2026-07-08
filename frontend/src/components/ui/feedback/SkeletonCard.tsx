"use client";

import clsx from "clsx";

interface SkeletonCardProps {
  variant?: "product" | "tier" | "bundle";
  className?: string;
}

export function SkeletonCard({ variant = "product", className }: SkeletonCardProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-black/40 border border-white/10 rounded-2xl p-5",
        className
      )}
      role="status"
      aria-label={`Loading ${variant} card`}
    >
      {variant === "product" && (
        <>
          <div className="h-4 w-1/4 bg-white/10 rounded mb-2" />
          <div className="h-6 w-3/4 bg-white/10 rounded mb-3" />
          <div className="h-3 w-full bg-white/5 rounded" />
          <div className="h-3 w-1/2 bg-white/5 rounded mt-2" />
        </>
      )}
      {variant === "tier" && (
        <>
          <div className="flex items-center justify-between">
            <div className="h-6 w-1/2 bg-white/10 rounded" />
            <div className="h-7 w-20 bg-yellow-500/20 rounded text-yellow-400" />
          </div>
          <div className="h-3 w-3/4 bg-white/5 rounded mt-3" />
          <div className="h-3 w-1/2 bg-white/5 rounded mt-1" />
        </>
      )}
      {variant === "bundle" && (
        <>
          <div className="h-5 w-1/2 bg-white/10 rounded mb-2" />
          <div className="h-3 w-3/4 bg-white/5 rounded mb-1" />
          <div className="h-3 w-1/2 bg-white/5 rounded mb-2" />
          <div className="h-7 w-24 bg-yellow-500/20 rounded text-yellow-400" />
        </>
      )}
    </div>
  );
}

export function SkeletonGrid({ count = 6, variant = "product" }: { count?: number; variant?: "product" | "tier" | "bundle" }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="list"
      aria-label={`Loading ${variant}s`}
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}