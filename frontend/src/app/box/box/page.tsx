import { Box2 } from "@/components/ui/forms/Box2";

export default function Page() {

return (
    <div className="flex min-h-screen items-center justify-center gap-4 p-6">
      {/* Karta 1: */}
      <Box2 
        variant="base" 
        interactive 
        className="w-[480px] h-[240px]" 
      />
      {/* Karta 2: */}
      <Box2 
        variant="base" 
        className="w-[480px] h-[240px]" 
      
      />
    </div>
  );
 }