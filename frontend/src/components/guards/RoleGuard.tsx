"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me } from "@/lib/auth";

export function RoleGuard({ required, children }: { required: "FAN" | "CREATOR"; children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const u = await me();
        if (!alive) return;
        if (!u || !u.role) {
          router.replace("/login");
          return;
        }
        if (u.role !== required) {
          router.replace("/");
          return;
        }
        setOk(true);
      } catch {
        router.replace("/login");
      }
    })();
    return () => {
      alive = false;
    };
  }, [required, router]);

  if (ok === null) return <div className="p-6 text-white/80">Checking access…</div>;
  if (!ok) return null;
  return <>{children}</>;
}

