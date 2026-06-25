"use client";

import { Web3EnigmaCard } from '@/components/ui/card/Web3EnigmaCard';
import { Web3SkeletonShimmerCard } from '@/components/ui/card/Web3SkeletonShimmerCard';
import { ZeroFrictionActionCard } from '@/components/ui/card/ZeroFrictionActionCard';

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="w-full">
          <Web3EnigmaCard />
        </div>
        <div className="w-full">
          <Web3SkeletonShimmerCard />
        </div>
        <div className="w-full">
          <ZeroFrictionActionCard />
        </div>
      </div>
    </main>
  );
}
