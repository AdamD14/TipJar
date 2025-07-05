import { Metadata } from 'next';
import { getCreatorProfile } from '@/lib/api';

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const profile = await getCreatorProfile(params.handle);
  return {
    title: `Support @${params.handle} on TipJar+`,
    description: profile.goal || 'Send tips in USDC to support this creator directly.',
    openGraph: {
      title: `Support @${params.handle} on TipJar+`,
      images: [`https://tipjar.plus/api/og?handle=${params.handle}&goal=${encodeURIComponent(profile.goal || '')}`],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`https://tipjar.plus/api/og?handle=${params.handle}&goal=${encodeURIComponent(profile.goal || '')}`],
    },
  };
}

export default async function CreatorPage({ params }: { params: { handle: string } }) {
  const profile = await getCreatorProfile(params.handle);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 text-white">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.avatarUrl || '/fallback-jar.svg'}
          alt={`@${params.handle}`}
          className="w-24 h-24 rounded-full border-4 border-[#FFD700] shadow-md shadow-yellow-400"
          onError={(e) => (e.currentTarget.src = '/fallback-jar.svg')}
        />
        <div>
          <h1 className="text-3xl font-bold">@{params.handle}</h1>
          {profile.goal && <p className="text-lg text-gold mt-1">🎯 {profile.goal}</p>}
        </div>
      </div>
    </main>
  );
}
