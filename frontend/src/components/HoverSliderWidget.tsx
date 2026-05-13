"use client";

import { useState } from "react";
import clsx from "clsx";
import Popover from "@/components/ui/Popover";
import Button from "@/components/ui/Button";

interface HoverSliderWidgetProps {
  handle: string;
  avatar?: string;
}

export default function HoverSliderWidget({
  handle,
  avatar = "/assets/ja1.jpg",
}: HoverSliderWidgetProps) {
  const [amount, setAmount] = useState(5);

  return (
    <div className="relative inline-flex items-center gap-3">
      <Popover
        content={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt={handle}
                className="w-8 h-8 rounded-full border-2 border-teal-800"
              />
              <span className="font-heading font-semibold text-text-ds-primary">
                @{handle}
              </span>
            </div>
            <p className="font-body text-sm text-text-ds-secondary">
              Tip{" "}
              <span className="font-heading font-bold text-gold-400 tnum">
                {amount} USDC
              </span>
            </p>
            <Button variant="primary" size="sm" fullWidth>
              Tip Now
            </Button>
          </div>
        }
      >
        <button
          className={clsx(
            "w-14 h-14 rounded-full flex items-center justify-center",
            "bg-gold-400 text-teal-900",
            "shadow-1 hover:shadow-2 hover:-translate-y-0.5",
            "active:scale-[0.98] active:translate-y-0 active:shadow-1",
            "font-heading font-semibold text-xl",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D194D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001F1F]",
          )}
          aria-label={`Tip @${handle}`}
        >
          💸
        </button>
      </Popover>

      <input
        type="range"
        min={0}
        max={20}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-40 h-1 bg-teal-700 rounded-full cursor-pointer accent-gold-400"
        aria-label="Tip amount slider"
      />
    </div>
  );
}
