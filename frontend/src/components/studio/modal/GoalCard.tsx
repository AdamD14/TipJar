import type { Goal } from "@/lib/types";
import Button from "@/components/ui/buttons/Button";

export default function GoalCard({ g }: { g: Goal }) {
  const pct = Math.min(
    100,
    Math.round((g.raised / Math.max(1, g.targetAmount)) * 100),
  );

  return (
    <div className="rounded-lg border border-teal-700 bg-teal-800 p-6 shadow-1">
      <div className="flex items-center justify-between">
        <div className="font-heading font-semibold text-teal-25">
          {g.title}
        </div>
        <span className={`text-xs font-body ${g.active ? 'text-success-base' : 'text-teal-100'}`}>
          {g.active ? "Active" : "Inactive"}
        </span>
      </div>

      {g.description && (
        <p className="mt-2 text-sm font-body text-teal-50">{g.description}</p>
      )}

      <div className="mt-4">
        <div className="h-2 bg-teal-850 rounded-full overflow-hidden border border-teal-700">
          <div
            className="h-full bg-gold-400 transition-all duration-700 ease-standard"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-body text-teal-100 mt-1">
          <span className="tnum">{(g.raised / 100).toFixed(2)} USDC</span>
          <span className="tnum">Target {(g.targetAmount / 100).toFixed(2)} USDC</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        {g.active ? (
          <Button variant="secondary" size="sm">
            Finish
          </Button>
        ) : (
          <Button variant="secondary" size="sm">
            Activate
          </Button>
        )}
      </div>
    </div>
  );
}
