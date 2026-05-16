"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import Skeleton from "@/components/ui/layout/Skeleton";
import Card from "@/components/ui/forms/Card";

export default function CreatorBalance() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await apiClient.get("/creator/wallet/balance");
        setBalance(res.data.balance ?? 0);
      } catch (err: unknown) {
        console.error("Error fetching balance", err);
        setBalance(0);
      }
    }
    fetchBalance();
  }, []);

  if (balance === null) {
    return (
      <Card>
        <Skeleton variant="text" width="40%" height="14px" />
        <Skeleton variant="text" width="60%" height="28px" className="mt-2" />
      </Card>
    );
  }

  return (
    <Card>
      <p className="text-sm font-body text-text-ds-tertiary mb-1">
        Your balance
      </p>
      <p className="text-2xl font-heading font-bold text-text-ds-primary tnum">
        ${balance.toFixed(2)}
      </p>
    </Card>
  );
}
