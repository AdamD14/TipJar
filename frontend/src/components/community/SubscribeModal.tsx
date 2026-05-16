"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/buttons/Button";

export type TierPub = {
  id: string;
  name: string;
  price: number;
  perks: string[];
  active: boolean;
};

export default function SubscribeModal({
  username,
  open,
  onClose,
  tiers,
}: {
  username: string;
  open: boolean;
  onClose: () => void;
  tiers: TierPub[];
}) {
  const [tierId, setTierId] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setBusy(false);
      setTierId(tiers?.[0]?.id || "");
    }
  }, [open, tiers]);

  const go = async () => {
    try {
      setBusy(true);
      const res = await fetch("/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: username, tierId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error");
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      alert(e.message || "Checkout init failed");
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="form" title={`Subscribe @${username}`}>
      <div className="grid sm:grid-cols-2 gap-3 mt-2">
        {tiers.map((t) => (
          <button
            key={t.id}
            onClick={() => setTierId(t.id)}
            className={clsx(
              "text-left rounded-xl border p-4 transition-all duration-200",
              tierId === t.id
                ? "border-gold-400 bg-gold-400/10"
                : "border-white/[0.05] bg-teal-850 hover:border-teal-600",
            )}
          >
            <div className="font-heading font-semibold text-text-ds-primary">
              {t.name}
            </div>
            <div className="text-xl font-heading font-bold text-text-ds-primary mt-1 tnum">
              {(t.price / 100).toFixed(2)}{" "}
              <span className="text-sm font-body font-normal text-text-ds-tertiary">
                USDC/mo
              </span>
            </div>
            <ul className="mt-2 text-sm font-body text-text-ds-secondary space-y-1">
              {t.perks.slice(0, 4).map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="mt-4 font-body text-xs text-text-ds-tertiary">
        Billed monthly in USDC via Circle. Cancel anytime in your account.
      </div>

      <div className="mt-5 flex gap-2 justify-end">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={!tierId || busy}
          loading={busy}
          onClick={go}
        >
          Continue to Checkout
        </Button>
      </div>
    </Modal>
  );
}
