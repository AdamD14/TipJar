import { CreatorPulse } from "@/components/creator-desktop/creator-pulse";
import { QuickActions } from "@/components/creator-desktop/quick-actions";
import { LiveActivity } from "@/components/creator-desktop/live-activity";
import { ActiveGoals } from "@/components/creator-desktop/active-goals";
import { RecentSupport } from "@/components/creator-desktop/recent-support";
import { FanwallPreview } from "@/components/creator-desktop/fanwall-preview";
import { Recommendations } from "@/components/creator-desktop/recommendations";
import { GrowthSnapshot } from "@/components/creator-desktop/growth-snapshot";
import { NotificationsPreview } from "@/components/creator-desktop/notifications-preview";

export default function DesktopPage() {
  return (
    <div className="space-y-8 px-2 py-8 display:grid pb-2 grid lg:grid-cols-2 gap-2">
      <CreatorPulse />
      <QuickActions />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <LiveActivity />
        <ActiveGoals />
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-2 gap-6">
        <RecentSupport />
        <FanwallPreview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Recommendations />
        <GrowthSnapshot />
      </div>

      <NotificationsPreview />
    </div>
  );
}