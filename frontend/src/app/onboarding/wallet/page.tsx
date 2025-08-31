import WalletStep from "@/components/onboarding/WalletStep";

export const metadata = {
  title: "Onboarding — wallet • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/wallet" },
};

export default function Page() {
  return <WalletStep />;
}
