import Link from 'next/link';

export type CreatorCardProps = {
  name: string;
  alias: string;
  avatarUrl?: string;
  category?: string;
  stats?: { tips?: number };
};

export default function CreatorCard({ name, alias, avatarUrl, category, stats }: CreatorCardProps) {
  return (
    <Link
      href={`/creators/${alias}`}
      className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-teal-400/50"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full bg-white/10"
          style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover' } : {}}
        />
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-xs text-gray-400">
            @{alias}
            {category ? ` • ${category}` : ''}
          </div>
        </div>
      </div>
      {typeof stats?.tips === 'number' && (
        <div className="mt-3 text-sm text-gray-300">Suma napiwków: {stats.tips} USDC</div>
      )}
    </Link>
  );
}

