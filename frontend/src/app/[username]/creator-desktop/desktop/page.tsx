"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CreatorPulse } from "@/components/creator-desktop/creator-pulse";
import { QuickActions } from "@/components/creator-desktop/quick-actions";
import { LiveActivity } from "@/components/creator-desktop/live-activity";
import { ActiveGoals } from "@/components/creator-desktop/active-goals";
import { RecentSupport } from "@/components/creator-desktop/recent-support";
import { FanwallPreview } from "@/components/creator-desktop/fanwall-preview";
import { Recommendations } from "@/components/creator-desktop/recommendations";
import { GrowthSnapshot } from "@/components/creator-desktop/growth-snapshot";
import { NotificationsPreview } from "@/components/creator-desktop/notifications-preview";

function WidgetShell({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="relative group/card-surface card-surface">
      {children}
      <Link
        href={href}
        className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-text-quaternary opacity-0 group-hover/card-surface:opacity-100 hover:!bg-gold-400/10 hover:!text-gold-400 transition-all duration-200"
        aria-label="View full page"
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function DesktopPage() {
  const { username } = useParams<{ username: string }>();
  const prefix = `/@${username}/creator-desktop/desktop`;

  return (
    <div className="space-y-6 px-2 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetShell href={`${prefix}/creator-pulse`}>
          <CreatorPulse />
        </WidgetShell>
        <WidgetShell href={`${prefix}/quick-actions`}>
          <QuickActions />
        </WidgetShell>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetShell href={`${prefix}/live-activity`}>
          <LiveActivity />
        </WidgetShell>
        <WidgetShell href={`${prefix}/active-goals`}>
          <ActiveGoals />
        </WidgetShell>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetShell href={`${prefix}/recent-support`}>
          <RecentSupport />
        </WidgetShell>
        <WidgetShell href={`${prefix}/fanwall-preview`}>
          <FanwallPreview />
        </WidgetShell>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetShell href={`${prefix}/recommendations`}>
          <Recommendations />
        </WidgetShell>
        <WidgetShell href={`${prefix}/growth-snapshot`}>
          <GrowthSnapshot />
        </WidgetShell>
      </div>

      <WidgetShell href={`${prefix}/notifications-preview`}>
        <NotificationsPreview />
      </WidgetShell>
    </div>
  );
}
