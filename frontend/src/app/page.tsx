import FeatureCard from "@/components/FeatureCard";
import TestimonialBlock from "@/components/TestimonialBlock";
import CTASection from "@/components/CTASection";

export default function Page() {
  return (
    <main className="bg-[#2e004f] text-white overflow-hidden">
      <section className="max-w-screen-xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        <FeatureCard title="Instant Tips" description="Receive USDC tips instantly worldwide." />
        <FeatureCard title="1% Fee" description="Keep more of what you earn with low fees." />
        <FeatureCard title="Secure" description="Stable infrastructure powered by USDC." />
      </section>
      <section className="max-w-screen-xl mx-auto px-6 mb-24">
        <TestimonialBlock quote="TipJar+ lets me focus on creating while fans support me in seconds." author="Alex, digital artist" />
      </section>
      <CTASection />
    </main>
  );
}
