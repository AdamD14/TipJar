import AppHeader from "@/components/app/AppHeader";
import Section from "@/components/app/Section";
import SettingsTabs from "@/components/settings/SettingsTabs";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#001F1F] pb-20">
      <AppHeader />
      <Section title="Settings">
        <SettingsTabs />
      </Section>
    </main>
  );
}

