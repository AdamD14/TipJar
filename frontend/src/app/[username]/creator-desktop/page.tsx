"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { me } from "@/lib/auth";
import { getBalance } from "@/lib/wallet";
import {
  ArrowUpRight,
  Paintbrush,
  Bell,
  Target,
  DollarSign,
  Zap,
  CreditCard,
  Monitor,
  Share2,
  Clapperboard,
  PlusCircle,
  BarChart3,
  Wallet,
  Users,
  Megaphone,
} from "lucide-react";

const studioChips = [
  { label: "Overlays", icon: Paintbrush },
  { label: "Alerts", icon: Bell },
  { label: "Goals", icon: Target },
];

const communityMetrics = [
  { label: "New messages", value: "12" },
  { label: "Supporters", value: "847" },
];

const monetizationChips = [
  { label: "Subscriptions", icon: Users },
  { label: "Tips", icon: DollarSign },
  { label: "Merch", icon: Megaphone },
];

export default function CreatorDashboard() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const notifications = useNotificationStore((s) => s.notifications);

  const decodedUsername = decodeURIComponent(username || "");
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;

  const isOwner = user?.username === cleanUsername;
  const unreadCount = notifications.filter((n) => !n.read).length;

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

    getBalance()
      .then((data: any) => {
        if (data?.balance !== undefined) {
          setWalletBalance(data.balance);
        }
      })
      .catch(() => {});

    const timer = setTimeout(() => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto [grid-auto-rows:minmax(180px,auto)] md:[grid-auto-flow:dense]">

          {/* ── Desktop — 2-col ── */}
          <Link
            href={`${prefix}/desktop`}
            className="bento-card group relative md:col-span-2 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="w-5 h-5 text-teal-300" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Desktop
                </h3>
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed max-w-[240px]">
                Your command center — pulse, activity, goals, all in one place.
              </p>
            </div>
            <div className="mt-4 flex-1 flex items-end">
              <div className="w-full flex flex-col gap-2">
                {[
                  { label: "Live stream", status: "active", color: "var(--color-gold-400)" },
                  { label: "Last tip received", status: "2m ago", color: "var(--color-teal-300)" },
                  { label: "Today's goal", status: "68%", color: "var(--color-gold-500)" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-teal-800/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
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

          {/* ── Share — 1-col ── */}
          <Link
            href="#"
            className="bento-card group relative flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-5 h-5 text-teal-300" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Share
                </h3>
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed">
                Spread the word — share your page, links & referral codes.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800/60 font-body text-xs text-text-quaternary">
                <Share2 className="w-3.5 h-3.5" />
                Referral link
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800/60 font-body text-xs text-text-quaternary">
                <Megaphone className="w-3.5 h-3.5" />
                Promote
              </span>
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Studio — 1-col ── */}
          <Link
            href={`${prefix}/studio`}
            className="bento-card group relative flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clapperboard className="w-5 h-5 text-teal-300" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Studio
                </h3>
              </div>
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

          {/* ── Add+ — 1-col ── */}
          <Link
            href={`${prefix}/add`}
            className="bento-card group relative flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PlusCircle className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Add+
                </h3>
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed">
                Add new content, tiers, goals & rewards.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400 group-hover:bg-gold-400/20 transition-colors duration-300">
                <PlusCircle className="w-5 h-5" />
              </span>
            </div>
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          {/* ── Monetization — 2-col ── */}
          <Link
            href="#"
            className="bento-card group relative md:col-span-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4 min-h-[200px]"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Monetization
                </h3>
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed max-w-[260px]">
                Subscriptions, tips, merch & more revenue streams.
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
            <div className="flex flex-wrap gap-2">
              {monetizationChips.map((chip) => {
                const ChipIcon = chip.icon;
                return (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-400 font-body text-xs group-hover:bg-gold-400/20 transition-colors duration-300"
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

          {/* ── Growth — 1-col with sparkline ── */}
          <Link
            href={`${prefix}/growth`}
            className="bento-card group relative flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Growth
                </h3>
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed">
                Earnings, traffic, conversions & AI insights.
              </p>
            </div>
            <div className="flex items-end gap-[3px] h-16 mt-auto">
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

          {/* ── Wallet — 1-col, live balance ── */}
          <Link
            href={`${prefix}/wallet`}
            className="bento-card group relative flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Wallet
                </h3>
              </div>
              <span className="font-heading font-semibold text-3xl text-gold-400 tracking-tight tnum">
                {walletBalance !== null
                  ? `$${walletBalance.toFixed(2)}`
                  : "—"}
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

          {/* ── Community — 1-col ── */}
          <Link
            href={`${prefix}/community`}
            className="bento-card group relative flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-teal-300" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Community
                </h3>
              </div>
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

          {/* ── Notifications — 1-col, live unread ── */}
          <Link
            href={`${prefix}/notifications`}
            className="bento-card group relative flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-5 h-5 text-teal-300" />
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-400 text-teal-900 font-heading text-[10px] font-black leading-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <p className="font-body text-sm text-text-tertiary leading-relaxed">
                Tips, payouts & account updates — all in one place.
              </p>
            </div>
            {notifications.length > 0 ? (
              <div className="mt-4 space-y-2">
                {notifications.slice(0, 2).map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${n.read ? "bg-teal-800/30 opacity-60" : "bg-teal-800/60"}`}
                  >
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gold-400" />
                    )}
                    <span className={`font-body truncate ${n.read ? "text-text-quaternary" : "text-text-secondary font-medium"}`}>
                      {n.message}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-800/60 font-body text-xs text-text-quaternary">
                  <Bell className="w-3.5 h-3.5" />
                  All caught up
                </span>
              </div>
            )}
            <span className="bento-arrow" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
