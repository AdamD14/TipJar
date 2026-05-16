"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import Skeleton from "@/components/ui/layout/Skeleton";

export default function CreatorBalance() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await apiClient.get("/creator/wallet/balance");
        setBalance(res.data.balance ?? 0);
      } catch (err) {
        console.error("Error fetching balance", err);
        setBalance(0);
      }
    }
    fetchBalance();
  }, []);

  if (balance === null) {
    return (
      <div className="p-6 bg-teal-800 border border-white/[0.05] rounded-lg">
        <Skeleton variant="text" width="40%" height="14px" />
        <Skeleton variant="text" width="60%" height="28px" className="mt-2" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-teal-800 border border-white/[0.05] rounded-lg shadow-1">
      <p className="text-sm font-body text-text-ds-tertiary mb-1">
        Your balance
      </p>
      <p className="text-2xl font-heading font-bold text-text-ds-primary tnum">
        ${balance.toFixed(2)}
      </p>
    </div>
  );
}
