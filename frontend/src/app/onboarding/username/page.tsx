import UsernameStep from "@/components/onboarding/UsernameStep";

export const metadata = {
  title: "Onboarding — username • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/username" },
};

export default function Page() {
  return <UsernameStep />;
}
