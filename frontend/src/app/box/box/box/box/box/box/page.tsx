"use client";

import { CreatorIdentityCard2 } from '@/components/ui/card/CreatorIdentityCard2';
import { CreatorIdentityHeroCard } from '@/components/ui/card/CreatorIdentityHeroCard';
import { CreatorPulseCard } from '@/components/ui/card/CreatorPulseCard';

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="w-full">
          <CreatorIdentityCard2 />
        </div>
        <div className="w-full">
          <CreatorIdentityHeroCard />
        </div>
        <div className="w-full">
          <CreatorPulseCard />
        </div>
      </div>
    </main>
  );
}
