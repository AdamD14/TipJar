"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { me } from "@/lib/auth";
import {
  Monitor,
  Clapperboard,
  Users,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  Paintbrush,
  Bell,
  Target,
  MessageCircle,
  Calendar,
  DollarSign,
  BarChart3,
  Zap,
  CreditCard,
} from "lucide-react";

interface DashboardData {
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

const studioChips = [
  { label: "Overlays", icon: Paintbrush },
  { label: "Alerts", icon: Bell },
  { label: "Goals", icon: Target },
];

const communityMetrics = [
  { label: "New messages", value: "12" },
  { label: "Supporters", value: "847" },
];

export default function CreatorDashboard() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  const decodedUsername = decodeURIComponent(username || "");
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;

  const isOwner = user?.username === cleanUsername;

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      me()
        .then((fetchedUser) => {
          if (fetchedUser) {
            useAuthStore.getState().setUser({
              ...fetchedUser,
              email: fetchedUser.email ?? undefined,
              username: fetchedUser.username ?? undefined,
              avatarUrl: fetchedUser.avatarUrl ?? undefined,
              role: fetchedUser.role === "CREATOR" ? "CREATOR" : "FAN",
            });
          } else {
            router.replace("/login");
          }
        })
        .catch(() => {
          router.replace("/login");
        });
      return;
    }

    if (!isOwner) {
      router.replace(`/@${cleanUsername}`);
      return;
    }

    const timer = setTimeout(() => {
      setData({ displayName: user.displayName, username: cleanUsername });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [hasHydrated, user, isOwner, cleanUsername, router]);

  if (!isOwner) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-400" />
      </div>
    );
  }

  const prefix = `/@${cleanUsername}/creator-desktop`;

  return (
    <div className="min-h-0">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-10">
          <p className="font-heading font-medium text-lg text-text-secondary tracking-tight">
            {data?.displayName ? data.displayName : "Hey"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto [grid-auto-rows:minmax(200px,auto)]">
          {/* ── Desktop — 2-col, dominant panel ── */}
          <Link
            href={`${prefix}/desktop`}
            className="bento-card group relative md:col-span-2 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <h3 className="font-heading font-semibold text-xl text-text-primary mb-1">
                Desktop
              </h3>
              <p className="font-body text-sm text-text-tertiary leading-relaxed max-w-[240px]">
                Your command center — pulse, activity, goals, all in one place.
              </p>
            </div>
            <div className="mt-4 flex-1 flex items-end">
              <div className="w-full flex flex-col gap-2">
                {[
                  { label: "Live stream", status: "active", statusColor: "bg-gold-400" },
                  { label: "Last tip received", status: "2m ago", statusColor: "bg-teal-300" },
                  { label: "Today's goal", status: "68%", statusColor: "bg-gold-500" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-teal-800/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.statusColor === "bg-gold-400" ? "var(--color-gold-400)" : row.statusColor === "bg-teal-300" ? "var(--color-teal-300)" : "var(--color-gold-500)" }} />
                      <span className="font-body text-xs text-text-quaternary">
                        {row.label}
                      </span>
                    </div>
                    <span className="font-heading font-medium text-xs text-text-secondary">
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Studio — 1-col, vertical with chip stack ── */}
          <Link
            href={`${prefix}/studio`}
            className="bento-card group relative flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <h3 className="font-heading font-semibold text-xl text-text-primary mb-1">
                Studio
              </h3>
              <p className="font-body text-sm text-text-tertiary leading-relaxed">
                Customize your page & monetization.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {studioChips.map((chip) => {
                const ChipIcon = chip.icon;
                return (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800/60 text-text-quaternary font-body text-xs group-hover:text-text-secondary transition-colors duration-300"
                  >
                    <ChipIcon className="w-3.5 h-3.5" />
                    {chip.label}
                  </span>
                );
              })}
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Community — 1-col, gold metric + avatar stack ── */}
          <Link
            href={`${prefix}/community`}
            className="bento-card group relative flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                Community
              </h3>
              <div className="space-y-3">
                {communityMetrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-heading font-semibold text-2xl text-gold-400">
                      {m.value}
                    </span>
                    <span className="block font-body text-xs text-text-quaternary mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <div className="flex -space-x-2">
                {["bg-gold-400", "bg-teal-300", "bg-purple-300"].map(
                  (color, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 rounded-full border-2 border-teal-700 ${color}`}
                    />
                  )
                )}
              </div>
              <span className="font-body text-xs text-text-quaternary ml-2">
                Recent supporters
              </span>
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Growth — 2-col, horizontal with sparkline ── */}
          <Link
            href={`${prefix}/growth`}
            className="bento-card group relative md:col-span-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4 min-h-[200px]"
          >
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-xl text-text-primary mb-1">
                Growth
              </h3>
              <p className="font-body text-sm text-text-tertiary leading-relaxed max-w-[260px]">
                Earnings, traffic, conversions & AI-powered insights.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div>
                  <span className="font-heading font-semibold text-xl text-gold-400">
                    $1,247
                  </span>
                  <span className="font-body text-xs text-text-quaternary ml-1.5">
                    this month
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-heading text-xs font-medium text-gold-400">
                    +12%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-[3px] h-16 md:h-20 md:min-w-[180px]">
              {[35, 50, 42, 65, 58, 72, 80, 68, 90, 85, 95, 78].map(
                (h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gold-400/20 group-hover:bg-gold-400/40 transition-colors duration-300"
                    style={{ height: `${h}%` }}
                  />
                )
              )}
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Wallet — 1-col, gold number + chip ── */}
          <Link
            href={`${prefix}/wallet`}
            className="bento-card group relative flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                Wallet
              </h3>
              <span className="font-heading font-semibold text-3xl text-gold-400 tracking-tight">
                $3,842
              </span>
              <span className="font-body text-xs text-text-quaternary ml-2">
                available
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold-400/10 border border-gold-400/20 font-heading text-xs font-medium text-gold-400">
                <CreditCard className="w-3.5 h-3.5" />
                USDC
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800/60 font-body text-xs text-text-quaternary">
                <DollarSign className="w-3.5 h-3.5" />
                Payouts
              </span>
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}