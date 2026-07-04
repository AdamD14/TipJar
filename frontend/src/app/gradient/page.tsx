import GradientCard from "@/components/ui/forms/GradientCard";

export default function CardPage() {
  return (
    <div className="min-h-screen bg-gradient-main py-12 px-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="font-heading text-4xl font-bold text-teal-25 mb-8 text-center">
          GradientCard — 3 Color Variants
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Variant 1: oklch(0.34 0.085 205) */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Variant 1
            </h2>
            <p className="text-xs text-text-ds-tertiary text-center">
              oklch(0.37 0.08 204)
            </p>
            <GradientCard 
              variant={1}
              className="min-w-[480px] min-h-[280px]"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  Variant 11111
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  L: 0.37, C: 0.08<br />
                  H: 204 (blue)<br />
                  Hover: prism<br />
                  Focus: purple glow
                </span>
              </div>
            </GradientCard>
          </div>
          
          {/* Variant 2: oklch(0.39 0.08 204) */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Variant 2
            </h2>
            <p className="text-xs text-text-ds-tertiary text-center">
              oklch(0.37 0.075 204)
            </p>
            <GradientCard 
              variant={2}
              className="min-w-[480px] min-h-[280px]"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  Variant 2
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  L: 0.37, C: 0.075<br />
                  H: 204 (blue)<br />
                  Hover: prism<br />
                  Focus: purple glow
                </span>
              </div>
            </GradientCard>
          </div>
          
          {/* Variant 3: oklch(0.38 0.08 204) */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-gold-400 text-center">
              Variant 3
            </h2>
            <p className="text-xs text-text-ds-tertiary text-center">
              oklch(0.36 0.075 204)
            </p>
            <GradientCard 
              variant={3}
              className="min-w-[480px] min-h-[280px]"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <span className="font-heading text-2xl font-bold text-teal-25">
                  Variant 3
                </span>
                <span className="text-sm text-text-ds-secondary mt-3">
                  L: 0.36, C: 0.075<br />
                  H: 204 (blue)<br />
                  Hover: prism<br />
                  Focus: purple glow
                </span>
              </div>
            </GradientCard>
          </div>
          
        </div>
      </div>
    </div>
  );
}
     
        