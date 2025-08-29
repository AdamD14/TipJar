import FanShell from "@/components/fan/FanShell";
import Link from "next/link";

const FOLLOWING = Array.from({ length: 8 }).map((_, i) => ({
  handle: `creator_${i + 1}`,
  name: `Creator ${i + 1}`,
  lastPost: `${(i % 5) + 1}d ago`,
}));

export default function Page() {
  return (
    <FanShell title="Following">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOLLOWING.map((c) => (
          <div key={c.handle} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 aspect-video w-full rounded-xl bg-[#003737]/40" />
            <div className="flex items-center justify-between">
              <Link href={`/creator/${c.handle}`} className="text-lg font-semibold text-white">
                {c.name}
              </Link>
              <button className="rounded-xl border border-white/15 px-3 py-1 text-sm text-white/80">Unfollow</button>
            </div>
            <p className="mt-1 text-xs text-[#BCC1B6]">Last post: {c.lastPost}</p>
          </div>
        ))}
      </div>
    </FanShell>
  );
}

