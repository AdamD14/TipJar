import { Box2 } from "@/components/ui/forms/Box2";

export default function Page() {

return (
    <div className="flex min-h-screen items-center justify-center gap-4 p-6">
      {/* Karta 1: Domyślna, reaguje na najaz myszką */}
      <Box2 
        variant="base" 
        interactive 
        className="w-[480px] h-[240px]" 
      />
      {/* Karta 2: Wymuszony stan hover (dzięki nowej właściwości forceHover) */}
      <Box2 
        variant="base" 
        hasArc
        className="w-[480px] h-[240px]" 
      
      />
    </div>
  );
 }