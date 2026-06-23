import { Box2 } from "@/components/ui/forms/Box2";
import { AuthorizeContractCard } from "@/components/ui/card/AuthorizeContractCard";
import { PremiumSubscriptionCard } from "@/components/ui/card/PremiumSubscriptionCard";
import { FrozenGlassErrorCard } from "@/components/ui/card/FrozenGlassErrorCard";
import { MassTransferToggleCard } from "@/components/ui/card/MassTransferToggleCard";
import { TacticalOverrideCard } from "@/components/ui/card/TacticalOverrideCard";
import CreatorCard from "@/components/ui/card/CreatorCard";

export default function Page() {

return (
    <div className="flex flex-wrap items justify-align gap-14 p-10">
      {/* Karta 1: */}
      <Box2 
        variant="base" 
        interactive 
        className="w-[480px] h-[240px]" 
      />
      {/* Karta 2: */}
      <Box2 
        variant="premium" 
        interactive
        className="w-[480px] h-[240px]" 
      />
      <div className="w-[480px] h-[240px]">
              <AuthorizeContractCard />
            </div>
            <div className="w-[480px] h-[240px]">
              <PremiumSubscriptionCard />
            </div>
      <div className="w-[480px] h-[240px]">
        <FrozenGlassErrorCard />
      </div>
      <div className="w-[480px] h-[120px]">
        <CreatorCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <TacticalOverrideCard />
      </div>
      <div className="w-[480px] h-[240px]">
        <MassTransferToggleCard 
          title="MassTransferToggleCard" 
          description="Sponsor network transaction fees for your fans." 
          defaultChecked={true} 
        />
        
      </div>

    </div>
  );
}


  
 