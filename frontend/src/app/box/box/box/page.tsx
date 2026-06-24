import PulseMomentumCard from '@/components/ui/card/PulseMomentumCard';
import FrozenGlassScalingCard from '@/components/ui/card/FrozenGlassScalingCard';
import ZeroFrictionActionCard from '@/components/ui/card/ZeroFrictionActionCard';
import SocialProofGamificationCard from '@/components/ui/card/SocialProofGamificationCard';
import AsynchronousStackedToastCard from '@/components/ui/card/AsynchronousStackedToastCard';
import DlpAutosaveCard from '@/components/ui/card/DlpAutosaveCard';
import PeripheralDriftIllusionCard from '@/components/ui/card/PeripheralDriftIllusionCard';
import Web3EnigmaCard from '@/components/ui/card/Web3EnigmaCard';

export default function Page() {
  return (
    <div className="flex flex-wrap items-center p-16 gap-20">
      <div className="w-[480px] h-[240px]">
        <FrozenGlassScalingCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <PulseMomentumCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <ZeroFrictionActionCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <SocialProofGamificationCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <AsynchronousStackedToastCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <DlpAutosaveCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <PeripheralDriftIllusionCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <Web3EnigmaCard />
      </div>

    </div>
  );
}