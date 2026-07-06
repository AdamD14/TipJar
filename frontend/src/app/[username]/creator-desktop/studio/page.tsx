"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, UserCircle, Coins, Share2, Radio } from "lucide-react";

interface StudioCard {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
  accent: "gold" | "purple" | "teal" | "coral";
}

function StudioCardShell({
  card,
}: {
  card: StudioCard;
}) {
  const { label, href, description, icon: Icon, accent } = card;

  const accentStyles: Record<StudioCard["accent"], string> = {
    gold: "hover:!border-gold-400/40 hover:!shadow-gold-400/10",
    purple: "hover:!border-purple-300/40 hover:!shadow-purple-300/10",
    teal: "hover:!border-teal-400/40 hover:!shadow-teal-400/10",
    coral: "hover:!border-rose-300/40 hover:!shadow-rose-300/10",
  };

  const iconWrapStyles: Record<StudioCard["accent"], string> = {
    gold: "bg-gold-400/10 text-gold-400",
    purple: "bg-purple-300/10 text-purple-300",
    teal: "bg-teal-400/10 text-teal-300",
    coral: "bg-rose-300/10 text-rose-300",
  };

  return (
    <Link
      href={href}
      className={`card-surface group relative flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-0.5 ${accentStyles[accent]}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${iconWrapStyles[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-text-quaternary opacity-0 group-hover:opacity-100 hover:!bg-gold-400/10 hover:!text-gold-400 transition-all duration-200">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          {label}
        </h3>
        <p className="font-body text-sm text-text-quaternary leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function StudioPage() {
  const { username } = useParams<{ username: string }>();
  const decodedUsername = decodeURIComponent(username || "");
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;
  const prefix = `/@${cleanUsername}/creator-desktop/studio`;

  const cards: StudioCard[] = [
    {
      label: "Profil Studio",
      href: `${prefix}/profil`,
      description:
        "Edit your public profile, bio, avatar and links that fans see first.",
      icon: UserCircle,
      accent: "teal",
    },
    {
      label: "Monetization",
      href: `${prefix}/monetization`,
      description:
        "Premium content, tiers, bundles and pricing — turn fans into patrons.",
      icon: Coins,
      accent: "gold",
    },
    {
      label: "Share Studio",
      href: `${prefix}/share`,
      description:
        "Distribute your content, embed widgets and grow across platforms.",
      icon: Share2,
      accent: "purple",
    },
    {
      label: "Live Studio",
      href: `${prefix}/live`,
      description:
        "Schedule, launch and monitor live sessions with real-time support.",
      icon: Radio,
      accent: "coral",
    },
  ];

  return (
    <div className="space-y-6 px-2 py-8 pt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <StudioCardShell key={card.href} card={card} />
        ))}
      </div>
    </div>
  );
}
