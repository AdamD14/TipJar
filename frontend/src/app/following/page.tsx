import Link from 'next/link';

export default function FollowingPage() {
  const creators = [{ alias: 'aga_music', name: 'Aga' }];
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Obserwowani</h1>
      <div className="grid gap-3">
        {creators.map((c) => (
          <Link
            key={c.alias}
            href={`/creators/${c.alias}`}
            className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-primary/50"
          >
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm opacity-75">@{c.alias}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
