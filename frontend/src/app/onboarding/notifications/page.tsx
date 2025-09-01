import NotificationsStep from "@/components/onboarding/NotificationsStep";

export const metadata = {
  title: "Onboarding — notifications • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/notifications" },
};

export default function Page() {
  return <NotificationsStep />;
}
