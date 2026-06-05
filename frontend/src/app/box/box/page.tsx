import { Box2 } from "@/components/ui/forms/Box2";

export default function Page() {

return (
    <div className="flex min-h-screen items-center justify-center">
      <Box2 
        variant="base" 
        interactive 
        className="w-[480px] h-[240px]" 
      />
    </div>
  );
 }