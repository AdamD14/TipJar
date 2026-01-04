import Image from "next/image";

export type ProfileHeroProps = {
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  goal?: { current: number; target: number };
};

export default function ProfileHero({
  name,
  avatarUrl = "",
  bannerUrl = "",
  bio,
  goal,
}: ProfileHeroProps) {
  const pct = goal
    ? Math.min(100, Math.round((goal.current / goal.target) * 100))
    : null;
  return (
    <header className="relative">
      <div
        className="h-48 md:h-56 bg-gradient-to-b from-teal-900/60 to-transparent"
        style={
          bannerUrl
            ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: "cover" }
            : {}
        }
      />
      <div className="max-w-4xl mx-auto px-6 -mt-12 pb-4">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-full ring-2 ring-teal-400 overflow-hidden bg-white/10">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt={name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {name}
            </h1>
            {bio && <p className="text-gray-300 max-w-2xl">{bio}</p>}
          </div>
        </div>
        {pct !== null && (
          <div className="mt-4">
            <div className="h-2 w-full bg-white/10 rounded">
              <div
                className="h-2 bg-teal-500 rounded"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Cel: {goal!.current} / {goal!.target} USDC
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
