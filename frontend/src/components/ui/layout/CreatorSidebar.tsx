"use client";

import { useState, useCallback } from "react";
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
  UserCircle,
  Share2,
  Coins,
  Gem,
} from "lucide-react";

interface NavSection {
  label: string;
  icon: React.ElementType;
  href: string;
  sub?: NavSubItem[];
}

interface NavSubItem {
  label: string;
  icon: React.ElementType;
  href: string;
  sub?: NavSubItem[];
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
    sub: [
      { label: "Profil", icon: UserCircle, href: "studio/profil" },
      {
        label: "Monetization",
        icon: Coins,
        href: "studio/monetization",
        sub: [
          { label: "Tips", icon: Coins, href: "studio/monetization/tips" },
          { label: "Goals", icon: Target, href: "studio/monetization/goals" },
          {
            label: "Premium Content",
            icon: Gem,
            href: "studio/monetization/premiumContent",
            sub: [
              { label: "Products", icon: Gem, href: "studio/monetization/premiumContent/products" },
              { label: "Tiers", icon: Crown, href: "studio/monetization/premiumContent/tiers" },
              { label: "Bundles", icon: Repeat, href: "studio/monetization/premiumContent/bundles" },
              { label: "Access Settings", icon: Settings, href: "studio/monetization/premiumContent/access-settings" },
              { label: "Billing", icon: CreditCard, href: "studio/monetization/premiumContent/billing" },
            ],
          },
        ],
      },
      { label: "Share", icon: Share2, href: "studio/share" },
      { label: "Live", icon: Radio, href: "studio/live" },
    ],
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
    href: "growth",
  },
  {
    label: "Analytics",
    icon: PieChart,
    href: "analytics",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "notifications",
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
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});

  const rawUsername = params.username || "";
  const decodedUsername = decodeURIComponent(rawUsername).replace(/^@/, "");
  const prefix = `/@${decodedUsername}/creator-desktop`;

  const isPathActive = useCallback((href: string) => {
    const fullHref = `${prefix}/${href}`;
    return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
  }, [pathname, prefix]);

  const isSectionExpanded = (href: string) => {
    if (expandedStates[href] !== undefined) {
      return expandedStates[href];
    }
    return isPathActive(href);
  };

  const toggleSection = (href: string) => {
    setExpandedStates((prev) => ({
      ...prev,
      [href]: !isSectionExpanded(href),
    }));
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
        className={`fixed lg:sticky top-14 left-0 z-[70] lg:z-0 h-[calc(100vh-3.5rem)] w-64 bg-linear-gradient(135deg in oklch, oklch(0.31 0.062 204) 0%, oklch(0.35 0.072 202) 50%, oklch(0.31 0.062 204) 100%), backdrop-blur-2xl border-r border-border-subtle flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const fullHref = `${prefix}/${section.href}`;
            const isActive = isPathActive(section.href);
            const isExpanded = isSectionExpanded(section.href);
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
                          const hasNestedSub = sub.sub && sub.sub.length > 0;
                          const isNestedExpanded = isSectionExpanded(sub.href);
                          const isNestedActive = hasNestedSub && isPathActive(sub.href);

                          return (
                            <div key={sub.href}>
                              {hasNestedSub ? (
                                <>
                                  <Link
                                    href={subHref}
                                    onClick={() => {
                                      closeMobile();
                                      if (!isNestedExpanded) {
                                        setExpandedStates((prev) => ({ ...prev, [sub.href]: true }));
                                      }
                                    }}
                                    className={`flex w-full items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors duration-200 text-xs font-medium group ${
                                      isNestedActive
                                        ? "text-gold-400 bg-surface-elevated/60"
                                        : "text-text-quaternary hover:text-text-secondary hover:bg-surface-elevated/40"
                                    }`}
                                  >
                                    <SubIcon className="w-3.5 h-3.5 shrink-0" />
                                    <span className="font-body flex-1 text-left">
                                      {sub.label}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleSection(sub.href);
                                      }}
                                      className={`p-0.5 rounded transition-transform duration-200 ${
                                        isNestedExpanded ? "rotate-180" : ""
                                      }`}
                                    >
                                      <ChevronDown className="w-3.5 h-3.5 text-text-quaternary" />
                                    </button>
                                  </Link>

                                  <AnimatePresence initial={false}>
                                    {isNestedExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                          duration: 0.2,
                                          ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="overflow-hidden"
                                      >
                                        <div className="ml-4 pl-3 border-l border-border-subtle mt-0.5 mb-1 space-y-0.5">
                                          {sub.sub!.map((nested) => {
                                            const NestedIcon = nested.icon;
                                            const nestedHref = `${prefix}/${nested.href}`;
                                            const isNestedSubActive = isPathActive(nested.href);
                                            const hasDeepSub = nested.sub && nested.sub.length > 0;
                                            const isDeepExpanded = isSectionExpanded(nested.href);

                                            return (
                                              <div key={nested.href}>
                                                {hasDeepSub ? (
                                                  <>
                                                    <Link
                                                      href={nestedHref}
                                                      onClick={() => {
                                                        closeMobile();
                                                        if (!isDeepExpanded) {
                                                          setExpandedStates((prev) => ({ ...prev, [nested.href]: true }));
                                                        }
                                                      }}
                                                      className={`flex w-full items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors duration-200 text-xs font-medium group ${
                                                        isNestedSubActive
                                                          ? "text-gold-400 bg-surface-elevated/60"
                                                          : "text-text-quaternary hover:text-text-secondary hover:bg-surface-elevated/40"
                                                      }`}
                                                    >
                                                      <NestedIcon className="w-3.5 h-3.5 shrink-0" />
                                                      <span className="font-body flex-1 text-left">
                                                        {nested.label}
                                                      </span>
                                                      <button
                                                        onClick={(e) => {
                                                          e.preventDefault();
                                                          e.stopPropagation();
                                                          toggleSection(nested.href);
                                                        }}
                                                        className={`p-0.5 rounded transition-transform duration-200 ${
                                                          isDeepExpanded ? "rotate-180" : ""
                                                        }`}
                                                      >
                                                        <ChevronDown className="w-3 h-3 text-text-quaternary" />
                                                      </button>
                                                    </Link>

                                                    <AnimatePresence initial={false}>
                                                      {isDeepExpanded && (
                                                        <motion.div
                                                          initial={{ height: 0, opacity: 0 }}
                                                          animate={{ height: "auto", opacity: 1 }}
                                                          exit={{ height: 0, opacity: 0 }}
                                                          transition={{
                                                            duration: 0.2,
                                                            ease: [0.4, 0, 0.2, 1],
                                                          }}
                                                          className="overflow-hidden"
                                                        >
                                                          <div className="ml-4 pl-3 border-l border-border-subtle mt-0.5 mb-1 space-y-0.5">
                                                            {nested.sub!.map((deep) => {
                                                              const DeepIcon = deep.icon;
                                                              const deepHref = `${prefix}/${deep.href}`;
                                                              const isDeepActive = pathname === deepHref;

                                                              return (
                                                                <Link
                                                                  key={deep.href}
                                                                  href={deepHref}
                                                                  onClick={closeMobile}
                                                                  className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-200 text-xs font-medium ${
                                                                    isDeepActive
                                                                      ? "text-gold-400 bg-surface-elevated/60"
                                                                      : "text-text-quaternary hover:text-text-secondary hover:bg-surface-elevated/40"
                                                                  }`}
                                                                >
                                                                  <DeepIcon className="w-3.5 h-3.5 shrink-0" />
                                                                  <span className="font-body">
                                                                    {deep.label}
                                                                  </span>
                                                                </Link>
                                                              );
                                                            })}
                                                          </div>
                                                        </motion.div>
                                                      )}
                                                    </AnimatePresence>
                                                  </>
                                                ) : (
                                                  <Link
                                                    href={nestedHref}
                                                    onClick={closeMobile}
                                                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors duration-200 text-xs font-medium ${
                                                      isNestedSubActive
                                                        ? "text-gold-400 bg-surface-elevated/60"
                                                        : "text-text-quaternary hover:text-text-secondary hover:bg-surface-elevated/40"
                                                    }`}
                                                  >
                                                    <NestedIcon className="w-3.5 h-3.5 shrink-0" />
                                                    <span className="font-body">
                                                      {nested.label}
                                                    </span>
                                                  </Link>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              ) : (
                                <Link
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
                              )}
                            </div>
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
