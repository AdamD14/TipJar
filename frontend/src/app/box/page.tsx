import GradientCard from 'src/components/ui/forms/GradientCard';
import CreatorIdentityCard from 'src/components/ui/card/CreatorIdentityCard';
import FinancialStatCard from 'src/components/ui/card/FinancialStatCard';
import LiveNotificationCard from 'src/components/ui/card/LiveNotificationCard';
import InteractiveActionCard from 'src/components/ui/card/InteractiveActionCard';
import HighTicketGoalCard from 'src/components/ui/card/High-TicketGoalCard';
import CommunityGatedCard from 'src/components/ui/card/CommunityGatedCard';
import AnalyticsVectorCard from 'src/components/ui/card/AnalyticsVectorCard';
import SmartContractWalletCard from 'src/components/ui/card/SmartContractWalletCard';
import GenerativeAIInsightCard from 'src/components/ui/card/GenerativeAIInsightCard';
import SpatialEventCard from '@/components/ui/card/SpatialEventCard';
import { CreatorPulseCard } from '@/components/ui/card/CreatorPulseCard';
import { TotalVolumeCard } from '@/components/ui/card/TotalVolumeCard';
import { ArtifactFrameCard } from '@/components/ui/card/ArtifactFrameCard';
import { HolographicNodeCard } from 'src/components/ui/card/HolographicNodeCard';

export default function Page() {
  return (
    <div className="flex flex-wrap max-w-full p-16 gap-20">
      <GradientCard className="w-[480px] h-[240px]" />
      <CreatorIdentityCard name="CreatorIdentityCard" role="Content Creator" />
      <div className="w-[480px] h-[240px]">
        <FinancialStatCard value="$1,234" label="FinancialStatCard" trend="+12%" />
      </div>
      <div className="w-[480px] h-[240px]">
        <LiveNotificationCard username="LiveNotificationCard" amount={100} message="New tip received!" />
      </div>
      <div className="w-[480px] h-[240px]">
        <InteractiveActionCard label="InteractiveActionCard" subtitle="Send a tip to this user" />
      </div>
      <div className="w-[480px] h-[240px]">
        <HighTicketGoalCard title="HighTicketGoalCard" percentage={75} />
      </div>
      <div className="w-[480px] h-[240px]">
        <CommunityGatedCard isLocked={true} content="This is some gated content." />
      </div>
      <div className="w-[480px] h-[240px]">
        <AnalyticsVectorCard />
      </div>
      <div className="w-[240px] h-[240px]">
        <SpatialEventCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <SmartContractWalletCard balance={1000} />
      </div>
      <div className="w-[480px] h-[240px]">
        <GenerativeAIInsightCard insight="AI Insight 1" metric={10} label="Performance" />
      </div>
      <div className="w-[480px] h-[240px]">
        <CreatorPulseCard name="CreatorPulseCard" handle="@creatorpulse" isSynced={true} />
      </div>
      <div className="w-[480px] h-[240px]">
        <TotalVolumeCard />
      </div>
      <div className="w-[240px] h-[240px]">
        <ArtifactFrameCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <HolographicNodeCard />
      </div>
    </div>
  );
}