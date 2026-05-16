"use client";

import React, { useState } from "react";
import clsx from "clsx";
import apiClient from "@/lib/apiClient";
import { normalize } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/store/authStore";
import Input from "@/components/ui/forms/Input";
import Textarea from "@/components/ui/forms/Textarea";
import Button from "@/components/ui/buttons/Button";
import Checkbox from "@/components/ui/forms/Checkbox";

interface TipPayload {
  amount: string;
  creatorId: string;
  message?: string;
  isAnonymous: boolean;
}

interface TipFormProps {
  creatorId: string;
  onComplete?: () => void;
}

const TipForm: React.FC<TipFormProps> = ({ creatorId, onComplete }) => {
  const user = useAuthStore((state) => state.user);

  const [selectedAmount, setSelectedAmount] = useState<string>("5");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const quickAmounts = ["2", "5", "10", "20"];

  const getFinalAmount = (): string => {
    const amt = customAmount || selectedAmount;
    const parsed = parseFloat(amt);
    return parsed.toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const amountToSend = getFinalAmount();
    if (
      !amountToSend ||
      isNaN(parseFloat(amountToSend)) ||
      parseFloat(amountToSend) <= 0
    ) {
      setError("Please enter a valid tip amount.");
      return;
    }
    try {
      setLoading(true);
      const payload: TipPayload = {
        amount: amountToSend,
        creatorId,
        message: message || undefined,
        isAnonymous,
      };
      if (user) {
        await apiClient.post("/tips", payload);
      } else {
        await apiClient.post("/tips/guest", {
          ...payload,
          paymentGatewayToken: "demo_token_guest_payment",
        });
      }
      if (onComplete) onComplete();
      setSelectedAmount("5");
      setCustomAmount("");
      setMessage("");
      setIsAnonymous(false);
    } catch (err: unknown) {
      const { msg } = normalize(err);
      setError(msg || "Failed to send tip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => {
              setSelectedAmount(amt);
              setCustomAmount("");
            }}
            className={clsx(
              "px-3 py-2 rounded-lg border text-sm font-heading font-semibold transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app",
              selectedAmount === amt && !customAmount
                ? "bg-gold-400 text-teal-900 border-gold-400"
                : "bg-teal-850 border-white/[0.05] text-text-ds-secondary hover:border-teal-600",
            )}
          >
            {amt} USDC
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor="customAmount"
          className="block font-body text-sm text-text-ds-secondary mb-1"
        >
          Custom amount
        </label>
        <Input
          id="customAmount"
          type="number"
          step="0.01"
          min="0"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="e.g. 3.75"
          className="tnum"
        />
      </div>

      <div>
        <label
          htmlFor="tipMessage"
          className="block font-body text-sm text-text-ds-secondary mb-1"
        >
          Message for the creator (optional)
        </label>
        <Textarea
          id="tipMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Thanks for the great content!"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        <span className="font-body text-sm text-text-ds-secondary">
          Send as anonymous
        </span>
      </label>

      {error && (
        <p className="text-sm text-error-light" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          Send tip
        </Button>
      </div>
    </form>
  );
};

export default TipForm;
