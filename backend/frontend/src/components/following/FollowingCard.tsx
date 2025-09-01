export interface FollowingItem {
  handle: string;
  name: string;
  bio?: string;
}

export default function FollowingCard({ item }: { item: FollowingItem }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA] transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 aspect-[4/3] w-full rounded-xl bg-[#003737]/40" />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <span className="rounded-full bg-[#FFD700]/20 px-2 py-1 text-xs text-[#FFD700]">
          Following
        </span>
      </div>
      {item.bio && <p className="mt-2 text-sm text-[#BCC1B6]">{item.bio}</p>}
      <div className="mt-4 flex gap-3">
        <button className="rounded-xl bg-[#FFD700] px-4 py-2 text-sm font-semibold text-[#003737]">Tip</button>
        <button className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/90">Unfollow</button>
      </div>
    </div>
  );
}

