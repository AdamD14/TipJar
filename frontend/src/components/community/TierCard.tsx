"use client";

import clsx from "clsx";
import type { Tier } from "@/lib/types";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";

export default function TierCard({
  t,
  onEdit,
  onArchive,
}: {
  t: Tier;
  onEdit: (t: Tier) => void;
  onArchive: (id: string) => void;
}) {
  return (
    <Card interactive noPadding variant="base" className="text-left p-4 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-heading font-semibold text-text-ds-primary">
            {t.name}
          </div>
          <div className="text-2xl font-heading font-bold text-text-ds-primary mt-1 tnum">
            {(t.price / 100).toFixed(2)}{" "}
            <span className="text-sm font-body font-normal text-text-ds-tertiary">
              USDC/mo
            </span>
          </div>
        </div>
        <span
          className={clsx(
            "text-xs font-body font-medium px-2 py-1 rounded-lg",
            t.active
              ? "bg-success-dark text-success-light"
              : "bg-teal-850 text-text-ds-tertiary",
          )}
        >
          {t.active ? "Active" : "Inactive"}
        </span>
      </div>

      <ul className="mt-3 space-y-1 text-sm font-body text-text-ds-secondary flex-1">
        {t.perks.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onEdit(t)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onArchive(t.id)}>
          Archive
        </Button>
      </div>
    </Card>
  );
}
