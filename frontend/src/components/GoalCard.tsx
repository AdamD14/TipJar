import type { Goal } from "@/lib/types";
import clsx from "clsx";

export default function GoalCard({ g }: { g: Goal }) {
  const pct = Math.min(
    100,
    Math.round((g.raised / Math.max(1, g.targetAmount)) * 100),
  );

  return (
    <div
      className={clsx(
        "rounded-lg",
        "border border-white/[0.05]",
        "bg-teal-800",
        "p-6",
        "shadow-1",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="font-heading font-semibold text-text-ds-primary">
          {g.title}
        </div>
        <span
          className={clsx(
            "text-xs font-body",
            g.active ? "text-success-base" : "text-text-ds-tertiary",
          )}
        >
          {g.active ? "Active" : "Inactive"}
        </span>
      </div>

      {g.description && (
        <p className="mt-2 text-sm font-body text-text-ds-secondary">
          {g.description}
        </p>
      )}

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-teal-850 rounded-full overflow-hidden border border-white/[0.05]">
          <div
            className="h-full bg-gold-400 transition-all duration-700 ease-standard"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-body text-text-ds-tertiary mt-1">
          <span className="tnum">{(g.raised / 100).toFixed(2)} USDC</span>
          <span className="tnum">
            Target {(g.targetAmount / 100).toFixed(2)} USDC
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          className={clsx(
            "px-3 py-1.5",
            "rounded-lg",
            "border border-teal-500/20",
            "text-sm font-body text-text-ds-secondary",
            "hover:bg-teal-700 hover:text-text-ds-primary",
            "transition-colors duration-200",
          )}
        >
          Edit
        </button>
        {g.active ? (
          <button
            className={clsx(
              "px-3 py-1.5",
              "rounded-lg",
              "text-sm font-body text-text-ds-secondary",
              "bg-teal-700",
              "hover:bg-teal-600 hover:text-text-ds-primary",
              "transition-colors duration-200",
            )}
          >
            Finish
          </button>
        ) : (
          <button
            className={clsx(
              "px-3 py-1.5",
              "rounded-lg",
              "text-sm font-body text-text-ds-secondary",
              "bg-teal-700",
              "hover:bg-teal-600 hover:text-text-ds-primary",
              "transition-colors duration-200",
            )}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
}
