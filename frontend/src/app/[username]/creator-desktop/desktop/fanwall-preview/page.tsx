"use client";

import { FanwallPreview } from "@/components/creator-desktop/fanwall-preview";
import { MessageSquare } from "lucide-react";

export default function FanwallPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-main text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="border-b border-teal-500/10 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-gold-400" />
            <h1 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent">
              Fanwall Preview
            </h1>
          </div>
          <p className="text-sm text-text-tertiary leading-relaxed">
            A window into your community's soul — see what your fans see.
            Quick moderation: hide entries with one click.
          </p>
        </div>
        <FanwallPreview />
      </div>
    </div>
  );
}
