"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "@/components/ui/forms/Input";

interface TierPerksEditorProps {
  perks: string[];
  onChange: (perks: string[]) => void;
}

/**
 * Generyczna, tekstowa lista benefitów. Celowo BEZ osobnego systemu
 * per-archetyp (patrz decyzja z rozmowy o "6 archetypach") — jeden
 * prosty string per perk, creator wpisuje co chce.
 */
export default function TierPerksEditor({
  perks,
  onChange,
}: TierPerksEditorProps) {
  const [draft, setDraft] = useState("");

  const addPerk = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...perks, trimmed]);
    setDraft("");
  };

  const removePerk = (index: number) => {
    onChange(perks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        Perks
      </label>

      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPerk();
            }
          }}
          placeholder="e.g. Access to exclusive videos"
          className="flex-1"
        />
        <button
          type="button"
          onClick={addPerk}
          className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/60"
          aria-label="Add perk"
        >
          <Plus size={16} />
        </button>
      </div>

      {perks.length > 0 && (
        <ul className="space-y-1.5 mt-2">
          {perks.map((perk, i) => (
            <li
              key={`${perk}-${i}`}
              className="flex items-center gap-2 text-sm text-text-ds-secondary bg-white/5 rounded-lg px-3 py-2"
            >
              <span className="flex-1">{perk}</span>
              <button
                type="button"
                onClick={() => removePerk(i)}
                className="text-white/30 hover:text-red-300 shrink-0"
                aria-label="Remove perk"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}