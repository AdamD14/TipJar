import clsx from "clsx";
import type { Subscription } from "@/lib/api/contracts";
import Card from "@/components/ui/forms/Card";

export default function SubscriptionsList({ items }: { items: Subscription[] }) {
  if (!items?.length)
    return (
      <p className="font-body text-sm text-text-ds-tertiary">
        No subscriptions yet.
      </p>
    );

  return (
    <div className="grid gap-2">
      {items.map((s) => (
        <Card
          key={s.id}
          noPadding
          variant="base"
          className="p-3 grid grid-cols-3 sm:grid-cols-5 gap-2"
        >
          <span className="font-body text-sm text-text-ds-primary">
            @{s.fan}
          </span>
          <span className="font-body text-sm text-text-ds-primary">
            {s.amount} USDC / {s.period}
          </span>
          <span className="font-body text-sm text-text-ds-tertiary">
            {new Date(s.startedAt).toLocaleDateString()}
          </span>
          <span
            className={clsx(
              "text-sm font-body font-medium",
              s.active ? "text-success-light" : "text-error-light",
            )}
          >
            {s.active ? "Active" : "Inactive"}
          </span>
          <span className="hidden sm:block text-right font-body text-sm text-text-ds-tertiary">
            ID: {s.id}
          </span>
        </Card>
      ))}
    </div>
  );
}
