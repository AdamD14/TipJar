"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { me } from "@/lib/auth";
import { getBalance } from "@/lib/wallet";

type Gate = "checking" | "ok" | "redir";

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [gate, setGate] = useState<Gate>("checking");
  const step = path?.includes("/onboarding/username")
    ? 1
    : path?.includes("/onboarding/wallet")
    ? 2
    : path?.includes("/onboarding/profile")
    ? 3
    : path?.includes("/onboarding/notifications")
    ? 4
    : path?.includes("/onboarding/done")
    ? 5
    : 0;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // 1) Require auth
        const u = await me();
        if (!alive) return;
        if (!u || !(u.id || u.email)) {
          setGate("redir");
          router.replace("/login");
          return;
        }
        // 2) Auto-skip Username if already has handle
        const hasHandle = Boolean(u.username || u.handle);
        if (step === 1 && hasHandle) {
          setGate("redir");
          router.replace("/onboarding/wallet");
          return;
        }
        // 3) Enforce order: if no handle, force username step
        if (step > 1 && !hasHandle) {
          setGate("redir");
          router.replace("/onboarding/username");
          return;
        }
        // 4) Soft-detect ready wallet and skip to profile
        if (step === 2) {
          try {
            const b = await getBalance().catch(() => null);
            const walletReady = b != null;
            if (walletReady) {
              setGate("redir");
              router.replace("/onboarding/profile");
              return;
            }
          } catch {
            // ignore
          }
        }
        setGate("ok");
      } catch {
        setGate("redir");
        router.replace("/login");
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (gate === "checking") {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm text-white/70">Checking…</div>
    );
  }
  if (gate === "redir") return null;
  return <>{children}</>;
}

