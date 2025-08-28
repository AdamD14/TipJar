import OnboardingShell from "@/components/onboarding/OnboardingShell";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";
import Link from "next/link";

export const metadata = {
  title: "Onboarding — done • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/done" },
};

export default function Page() {
  return (
    <OnboardingGuard>
      <OnboardingShell title="You're all set!" step={5}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome to tipjar+</h2>
          <p className="mt-2 text-[#BCC1B6]">Możesz już przyjmować napiwki i udostępniać profil.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/fan/wallet" className="rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737]">
              Open wallet
            </Link>
            <Link href="/discover" className="rounded-xl border border-white/15 px-4 py-3 font-semibold text-white/80">
              Discover creators
            </Link>
          </div>
        </div>
      </OnboardingShell>
    </OnboardingGuard>
  );
}
