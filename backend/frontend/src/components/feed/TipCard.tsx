import { Heart } from "lucide-react";

export interface TipItem {
  id: string;
  creator: { name: string; handle: string; avatar?: string };
  fan: { name: string; avatar?: string };
  amount: number; // USD
  message?: string;
  time: string;
}

export default function TipCard({ item }: { item: TipItem }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA] shadow-md">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-[#FFD700]/40" />
        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-2 text-sm text-[#BCC1B6]">
            <span>
              <strong className="text-white">{item.fan.name}</strong> tipped
              <strong className="text-[#FFD700]"> ${item.amount.toFixed(2)}</strong> to
              <strong className="text-white"> {item.creator.name}</strong>
            </span>
            <span className="opacity-60">• {item.time}</span>
          </header>
          {item.message && (
            <p className="mt-2 text-sm text-[#DDE0DA] opacity-90">“{item.message}”</p>
          )}
          <footer className="mt-4 flex items-center justify-between">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/90" aria-label="Like">
              <Heart className="h-4 w-4" /> Like
            </button>
            <div className="text-xs text-white/50">#{item.creator.handle}</div>
          </footer>
        </div>
      </div>
    </article>
  );
}

