import SkeletonLoaderCard from '@/components/ui/card/SkeletonLoaderCard';
import TacticalHudCard from '@/components/ui/card/TacticalHudCard';
import CreatorIdentityHeroCard from '@/components/ui/card/CreatorIdentityHeroCard';
import UsdcFinancialSummaryCard from '@/components/ui/card/UsdcFinancialSummaryCard';
import LiveEventStreamCard from '@/components/ui/card/LiveEventStreamCard';
import SmartContractActionCard from '@/components/ui/card/SmartContractActionCard';
import AsyncInputValidationCard from '@/components/ui/card/AsyncInputValidationCard';



export default function Page() {
  return (
   <main id="main-content">
  <div className="flex flex-wrap items-center justify-between p-16 gap-20">
      <div className="w-[480px] h-[240px]">
        <TacticalHudCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <SkeletonLoaderCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <CreatorIdentityHeroCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <UsdcFinancialSummaryCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <LiveEventStreamCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <SmartContractActionCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <AsyncInputValidationCard />
      </div>
      
    </div>
 </main>
);
}