import Web3SkeletonShimmerCard from '@/components/ui/card/Web3SkeletonShimmerCard';
import WideRefractiveChartCard from '@/components/ui/card/WideRefractiveChartCard';
import DestructiveRollbackCard from '@/components/ui/card/DestructiveRollbackCard';
import TopLayerWebAuthnModalOverlay from '@/components/ui/card/TopLayerWebAuthnModalOverlay';

export default function Page() {
  return (
   <main id="main-content">
  <div className="flex flex-wrap items-center justify-between p-16 gap-20">
      <div className="w-[480px] h-[240px]">
        <WideRefractiveChartCard />
      </div>
        <div className="w-[480px] h-[240px]">
            <Web3SkeletonShimmerCard />
        </div>
        <div className="w-[480px] h-[240px]">
            <DestructiveRollbackCard />
        </div>
        <div className="w-[480px] h-[240px]">
            <TopLayerWebAuthnModalOverlay />
        </div>
    
    </div>
 </main>
);
}