import type { Goal } from '@/lib/types';

export default function GoalCard({ g }: { g: Goal }) {
  const pct = Math.min(100, Math.round((g.raised / Math.max(1, g.targetAmount)) * 100));
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{g.title}</div>
        <span className={`text-xs ${g.active ? 'text-emerald-400' : 'text-white/50'}`}>{g.active ? 'Active' : 'Inactive'}</span>
      </div>
      {g.description && <div className="mt-2 text-sm text-white/70">{g.description}</div>}
      <div className="mt-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#FFD700]" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{(g.raised / 100).toFixed(2)} USDC</span>
          <span>Target {(g.targetAmount / 100).toFixed(2)} USDC</span>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1.5 rounded-lg border border-white/15 text-sm">Edit</button>
        {g.active ? (
          <button className="px-3 py-1.5 rounded-lg text-sm bg-white/10">Finish</button>
        ) : (
          <button className="px-3 py-1.5 rounded-lg text-sm bg-white/10">Activate</button>
        )}
      </div>
    </div>
  );
}

