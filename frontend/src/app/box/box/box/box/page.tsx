import StatisticsDashboardCard from '@/components/ui/card/StatisticsDashboardCard';
import ConflictResolutionCard from '@/components/ui/card/ConflictResolutionCard';
import CreatorIdentityCard2 from '@/components/ui/card/CreatorIdentityCard2';
import PrismaticContentCard from '@/components/ui/card/PrismaticContentCard';
import { LiveToastMomentum } from '@/components/ui/card/LiveToastMomentum';
import SecurityGatewayCard from '@/components/ui/card/SecurityGatewayCard';
import GoalFundingCard from '@/components/ui/card/GoalFundingCard';
import ContextualHelpCard from '@/components/ui/card/ContextualHelpCard';

export default function Page() {
  return (
    <div className="flex flex-wrap justify-content p-16 gap-20">
       <div className="w-[480px] h-[240px]">
        <ConflictResolutionCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <CreatorIdentityCard2 />
      </div>
      <div className="w-[480px] h-[240px]">
        <PrismaticContentCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <StatisticsDashboardCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <LiveToastMomentum />
      </div>
      <div className="w-[480px] h-[240px]">
        <SecurityGatewayCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <GoalFundingCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <ContextualHelpCard />
      </div>
    </div>
  );
}