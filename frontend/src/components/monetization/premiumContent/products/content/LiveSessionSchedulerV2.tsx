"use client";

import React from "react";
import Input from "@/components/ui/forms/Input";
import type { LiveSessionDetails } from "@/types/premiumContent";

interface LiveSessionSchedulerV2Props {
  value: LiveSessionDetails;
  onChange: (value: LiveSessionDetails) => void;
  isSaving?: boolean;
  error?: string;
}

export default function LiveSessionSchedulerV2({
  value,
  onChange,
  isSaving = false,
  error,
}: LiveSessionSchedulerV2Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1 flex items-center gap-2">
          Date & time
          {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
        </label>
        <Input
          type="datetime-local"
          value={value.scheduledAt}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) =>
            onChange({ ...value, scheduledAt: e.target.value })
          }
          disabled={isSaving}
          aria-label="Session date and time"
          aria-invalid={!value.scheduledAt}
        />
        {!value.scheduledAt && !isSaving && (
          <p className="text-xs text-red-400" role="alert">Date & time is required</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Duration (minutes)
        </label>
        <Input
          type="number"
          inputMode="numeric"
          value={value.durationMinutes}
          min={1}
          max={480}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({
              ...value,
              durationMinutes: isNaN(v) ? 0 : v,
            });
          }}
          className="tnum"
          disabled={isSaving}
          aria-label="Session duration in minutes"
          aria-invalid={!value.durationMinutes || value.durationMinutes <= 0}
        />
        {!value.durationMinutes && !isSaving && (
          <p className="text-xs text-red-400" role="alert">Duration must be positive</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
          Capacity (optional)
        </label>
        <Input
          type="number"
          inputMode="numeric"
          value={value.capacity ?? ""}
          min={1}
          max={10000}
          placeholder="Unlimited"
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange({
              ...value,
              capacity: isNaN(v) ? undefined : v,
            });
          }}
          className="tnum"
          disabled={isSaving}
          aria-label="Session capacity (optional)"
        />
      </div>
    </div>
  );
}