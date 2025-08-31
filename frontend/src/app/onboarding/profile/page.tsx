import ProfileStep from "@/components/onboarding/ProfileStep";

export const metadata = {
  title: "Onboarding — profile • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/profile" },
};

export default function Page() {
  return <ProfileStep />;
}
