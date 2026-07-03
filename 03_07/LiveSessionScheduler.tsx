"use client";

import React from "react";
import Input from "@/components/ui/forms/Input";
import type { LiveSessionDetails } from "../../../types/premiumContent";

interface LiveSessionSchedulerProps {
  value: LiveSessionDetails;
  onChange: (value: LiveSessionDetails) => void;
}

/**
 * Content editor dla type === "live-session". To TYLKO metadane produktu
 * (kiedy, ile miejsc, jak długo) — cena i dostęp żyją w ProductAccessSection.
 * Faktyczne wykonanie streamu (OBS, overlay) jest w studio/live/, ten
 * formularz z nim nie koliduje — paid-sessions/ w Live celowo nie istnieje,
 * dostęp weryfikowany jest tym samym mechanizmem co każdy gated content.
 */
export default function LiveSessionScheduler({
  value,
  onChange,
}: LiveSessionSchedulerProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Date &amp; time
        </label>
        <Input
          type="datetime-local"
          value={value.scheduledAt}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) =>
            onChange({ ...value, scheduledAt: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Duration (minutes)
        </label>
        <Input
          type="text"
          inputMode="numeric"
          value={value.durationMinutes}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            onChange({
              ...value,
              durationMinutes: v ? Number(v) : 0,
            });
          }}
          className="tnum"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Capacity (optional)
        </label>
        <Input
          type="text"
          inputMode="numeric"
          value={value.capacity ?? ""}
          placeholder="Unlimited"
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            onChange({
              ...value,
              capacity: v ? Number(v) : undefined,
            });
          }}
          className="tnum"
        />
      </div>
    </div>
  );
}
