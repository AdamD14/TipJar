import GradientCard from "@/components/ui/forms/GradientCard";

export default function CardPage() {
  return (
    <div className="min-h-screen bg-gradient-main py-12 px-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="font-heading text-4xl font-bold text-teal-25 mb-8 text-center">
          GradientCard Preview
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GradientCard 1 */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Card 1
            </h2>
            <GradientCard className="min-w-[480px] min-h-[280px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  GradientCard
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  Chromatic prism<br />
                  Radial glow on focus<br />
                  Shimmer gradient
                </span>
              </div>
            </GradientCard>
          </div>
          
          {/* GradientCard 2 */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Card 2
            </h2>
            <GradientCard className="min-w-[480px] min-h-[280px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  GradientCard
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  Focus-within glow<br />
                  SVG filter<br />
                  Smooth transition
                </span>
              </div>
            </GradientCard>
          </div>
          
          {/* GradientCard 3 */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Card 3
            </h2>
            <GradientCard className="min-w-[480px] min-h-[280px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  GradientCard
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  Hover prism<br />
                  Purple radial<br />
                  Native SVG
                </span>
              </div>
            </GradientCard>
          </div>
          
        </div>
      </div>
    </div>
  );
}
     
        