"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Clapperboard,
  PlusCircle,
  Users,
  BarChart3,
  ChevronDown,
  Activity,
  Zap,
  Radio,
  Target,
  Heart,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Bell,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  Download,
  Upload,
  Repeat,
  Banknote,
  Settings,
  Rss,
  FileText,
  UserPlus,
  UserCheck,
  Crown,
  Calendar,
  Megaphone,
  Mail,
  PieChart,
} from "lucide-react";

interface NavSection {
  label: string;
  icon: React.ElementType;
  href: string;
  sub?: { label: string; icon: React.ElementType; href: string }[];
}

const sections: NavSection[] = [
  {
    label: "Desktop",
    icon: Monitor,
    href: "desktop",
    sub: [
      { label: "Creator Pulse", icon: Activity, href: "desktop/creator-pulse" },
      { label: "Quick Actions", icon: Zap, href: "desktop/quick-actions" },
      { label: "Live Activity", icon: Radio, href: "desktop/live-activity" },
      { label: "Active Goals", icon: Target, href: "desktop/active-goals" },
      { label: "Recent Support", icon: Heart, href: "desktop/recent-support" },
      { label: "Fanwall Preview", icon: MessageCircle, href: "desktop/fanwall-preview" },
      { label: "Recommendations", icon: Lightbulb, href: "desktop/recommendations" },
      { label: "Growth Snapshot", icon: TrendingUp, href: "desktop/growth-snapshot" },
      { label: "Notifications Preview", icon: Bell, href: "desktop/notifications-preview" },
    ],
  },
  {
    label: "Studio",
    icon: Clapperboard,
    href: "studio",
  },
  {
    label: "Add",
    icon: PlusCircle,
    href: "add",
  },
  {
    label: "Community",
    icon: Users,
    href: "community",
    sub: [
      { label: "Feed", icon: Rss, href: "community/feed" },
      { label: "Posts", icon: FileText, href: "community/posts" },
      { label: "Supporters", icon: UserPlus, href: "community/supporters" },
      { label: "Followers", icon: UserCheck, href: "community/followers" },
      { label: "Subscribers", icon: Crown, href: "community/subscribers" },
      { label: "Memberships", icon: Crown, href: "community/memberships" },
      { label: "Events", icon: Calendar, href: "community/events" },
      { label: "Announcements", icon: Megaphone, href: "community/announcements" },
      { label: "Messages", icon: Mail, href: "community/messages" },
      { label: "Audience Segments", icon: PieChart, href: "community/audience-segments" },
    ],
  },
  {
    label: "Growth",
    icon: BarChart3,
    href: "analytics",
  },
  {
    label: "Wallet",
    icon: Wallet,
    href: "wallet",
    sub: [
      { label: "Balance", icon: CreditCard, href: "wallet/balance" },
      { label: "Transactions", icon: ArrowLeftRight, href: "wallet/transactions" },
      { label: "Payouts", icon: Download, href: "wallet/payouts" },
      { label: "Subscriptions", icon: Crown, href: "wallet/subscriptions" },
      { label: "Cards", icon: CreditCard, href: "wallet/cards" },
      { label: "Connected Wallets", icon: Wallet, href: "wallet/connected-wallets" },
      { label: "Deposit", icon: Download, href: "wallet/deposit" },
      { label: "Withdraw", icon: Upload, href: "wallet/withdraw" },
      { label: "Exchange", icon: Repeat, href: "wallet/exchange" },
      { label: "Payment Methods", icon: Banknote, href: "wallet/payment-methods" },
      { label: "Settings", icon: Settings, href: "wallet/settings" },
    ],
  },
];

export default function CreatorSidebar() {
  const pathname = usePathname();
  const params = useParams<{ username: string }>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [manuallyExpanded, setManuallyExpanded] = useState<string | null>(null);

  const username = params.username;
  const prefix = `/@${username}/creator-desktop`;

  const activeSection = sections.find((s) => pathname.startsWith(`${prefix}/${s.href}`));

  const expandedSection = manuallyExpanded ?? activeSection?.href ?? null;

  const toggleSection = (href: string) => {
    setManuallyExpanded((prev) => (prev === href ? null : href === activeSection?.href && prev === null ? null : href));
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-[4.5rem] left-3 z-30 lg:hidden p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors duration-200"
        aria-label="Open sidebar"
      >
        <BarChart3 className="w-5 h-5" />
      </button>

      {/* ── Mobile overlay backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-teal-900/80 backdrop-blur-md z-[60] lg:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-14 left-0 z-[70] lg:z-0 h-[calc(100vh-3.5rem)] w-64 bg-teal-800/90 backdrop-blur-2xl border-r border-border-subtle flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const fullHref = `${prefix}/${section.href}`;
            const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
            const isExpanded = expandedSection === section.href;
            const hasSub = section.sub && section.sub.length > 0;

            return (
              <div key={section.href} className="mb-1">
                <Link
                  href={fullHref}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-surface-elevated text-gold-400 shadow-lg shadow-black/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/70"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="font-heading font-semibold text-sm flex-1">
                    {section.label}
                  </span>
                  {hasSub && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSection(section.href);
                      }}
                      className={`p-0.5 rounded transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      aria-label={`Expand ${section.label}`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-text-quaternary" />
                      </button>
                  )}
                </Link>

                {/* ── Sub-items (animated) ── */}
                <AnimatePresence initial={false}>
                  {hasSub && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-3 border-l border-border-subtle mt-1 mb-2 space-y-0.5">
                        {section.sub!.map((sub) => {
                          const SubIcon = sub.icon;
                          const subHref = `${prefix}/${sub.href}`;
                          const isSubActive = pathname === subHref;

                          return (
                            <Link
                              key={sub.href}
                              href={subHref}
                              onClick={closeMobile}
                              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors duration-200 text-xs font-medium ${
                                isSubActive
                                  ? "text-gold-400 bg-surface-elevated/60"
                                  : "text-text-quaternary hover:text-text-secondary hover:bg-surface-elevated/40"
                              }`}
                            >
                              <SubIcon className="w-3.5 h-3.5 shrink-0" />
                              <span className="font-body">{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
