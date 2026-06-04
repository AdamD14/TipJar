"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { me } from "@/lib/auth";
import { Monitor, Clapperboard, Users, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

interface DashboardData {
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

const sections = [
  {
    label: "Desktop",
    desc: "Your command center — pulse, activity, goals, all in one place.",
    icon: Monitor,
    href: "desktop",
    span: "md:col-span-2",
  },
  {
    label: "Studio",
    desc: "Customize your page, overlays, alerts, and monetization.",
    icon: Clapperboard,
    href: "studio",
    span: "md:col-span-1",
  },
  {
    label: "Community",
    desc: "Messages, supporters, events — nurture your people.",
    icon: Users,
    href: "community",
    span: "md:col-span-1",
  },
  {
    label: "Growth",
    desc: "Earnings, traffic, conversions & AI-powered insights.",
    icon: TrendingUp,
    href: "growth",
    span: "md:col-span-2",
  },
  {
    label: "Wallet",
    desc: "Balances, payouts, cards, and connected wallets.",
    icon: Wallet,
    href: "wallet",
    span: "md:col-span-2 md:col-start-2",
  },
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
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400" />
      </div>
    );
  }

  const prefix = `/@${cleanUsername}/creator-desktop`;

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="max-w-5xl mx-auto px-4 py-14 md:py-24">
        {/* ── Header ── */}
        <div className="text-center mb-14 md:mb-20">
          <h1 className="font-heading font-bold text-h1 text-text-primary tracking-tight">
            Welcome back{data?.displayName ? `, ${data.displayName}` : ""}
          </h1>
          <p className="mt-3 font-body text-lg text-text-tertiary">
            What would you like to work on today?
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={`${prefix}/${section.href}`}
                className={`card-surface group relative flex flex-col items-center text-center gap-4 min-h-[220px] ${section.span}`}
              >
                <div className="mt-2 w-16 h-16 rounded-xl bg-teal-700 flex items-center justify-center group-hover:bg-gold-400 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold-400 group-hover:text-teal-900 transition-colors duration-300" />
                </div>

                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  {section.label}
                </h3>

                <p className="font-body text-sm text-text-tertiary leading-relaxed px-2">
                  {section.desc}
                </p>

                <div className="mt-auto mb-2 flex items-center gap-1 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-heading font-semibold text-xs uppercase tracking-widest">
                    Open
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}