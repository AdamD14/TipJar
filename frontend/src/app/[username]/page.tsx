import { notFound } from 'next/navigation';
import apiClient from '@/services/api';
import { CreatorBanner } from '@/components/creator-profile/CreatorBanner';
import { CreatorHeader } from '@/components/creator-profile/CreatorHeader';
import { TipSection } from '@/components/creator-profile/TipSection';
import type { CreatorProfile } from '@/types';

async function getCreatorData(username: string): Promise<CreatorProfile | null> {
  try {
    const response = await apiClient.get(`/creators/username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch creator data:', error);
    return null;
  }
}

export default async function CreatorProfilePage({ params }: { params: { username: string } }) {
  const creator = await getCreatorData(params.username);

  if (!creator) {
    notFound();
  }

  return (
    <div className="bg-tipjar-turquoise-dark min-h-screen">
      <CreatorBanner bannerUrl={creator!.bannerUrl} />
      <div className="container mx-auto max-w-2xl px-4 -mt-24 relative">
        <CreatorHeader displayName={creator!.displayName} username={creator!.username} avatarUrl={creator!.avatarUrl} bio={creator!.bio} />
        <TipSection creator={creator!} />
      </div>
    </div>
  );
}
