"use client";

import Input from "@/components/ui/Input";

const KNOWN = [
  { k: "twitch", label: "Twitch" },
  { k: "youtube", label: "YouTube" },
  { k: "x", label: "X" },
  { k: "instagram", label: "Instagram" },
  { k: "website", label: "Website" },
];

export default function SocialLinksForm({
  value,
  onChange,
}: {
  value: { [k: string]: string };
  onChange: (v: any) => void;
}) {
  const set = (k: string, v: string) => onChange({ ...value, [k]: v });

  return (
    <div>
      <div className="font-heading font-semibold text-sm text-text-ds-secondary mb-4">
        Socials
      </div>
      <div className="space-y-3">
        {KNOWN.map(({ k, label }) => (
          <div key={k} className="flex items-center gap-3">
            <span className="w-28 font-body text-sm text-text-ds-tertiary shrink-0">
              {label}
            </span>
            <Input
              value={value?.[k] || ""}
              onChange={(e) => set(k, e.target.value)}
              placeholder="https://..."
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
