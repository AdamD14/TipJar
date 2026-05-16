"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { normalize } from "@/lib/api/errors";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/buttons/Button";

export default function WithdrawFundsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    setError(null);
    setLoading(true);
    try {
      await apiClient.post("/creator/payout", {
        amount,
        destinationAddress: address,
      });
      setAmount("");
      setAddress("");
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const { msg } = normalize(err as any);
      setError(msg || "Withdrawal failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="form" title="Withdraw funds">
      <div className="space-y-4">
        <div>
          <label className="block font-body text-sm text-text-ds-secondary mb-1">
            Amount (USDC)
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tnum"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-text-ds-secondary mb-1">
            Destination address
          </label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
          />
        </div>

        {error && (
          <p className="text-sm text-error-light" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleWithdraw}
            disabled={loading || !amount || !address}
            loading={loading}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </Modal>
  );
}
