import CommunityGatedCard from '@/components/ui/card/CommunityGatedCard';
import { ConflictResolutionCard } from '@/components/ui/card/ConflictResolutionCard';
import { ContextualHelpCard } from '@/components/ui/card/ContextualHelpCard';

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-12 w-full max-w-7xl">
        <div className="flex items-center justify-center">
          <CommunityGatedCard isLocked={true} />
        </div>
        <div className="flex items-center justify-center">
          <ConflictResolutionCard />
        </div>
        <div className="flex items-center justify-center">
          <ContextualHelpCard />
        </div>
      </div>
    </main>
  );
 }
