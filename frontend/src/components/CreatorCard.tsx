import Link from "next/link";

export interface Creator {
  handle: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link
      href={`/creator/${creator.handle}`}
      className="block rounded-2xl border border-white/10 bg-[#140a2a] p-4 hover:bg-white/5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={creator.avatarUrl}
        alt={creator.name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <h3 className="mt-3 font-semibold">{creator.name}</h3>
      <p className="text-sm text-white/70">@{creator.handle}</p>
      <p className="mt-2 text-sm text-white/80">{creator.bio}</p>
    </Link>
  );
}
