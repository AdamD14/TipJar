"use client";
import { useEffect, useState } from "react";
import { me } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"loading"|"ok"|"redir">("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const u = await me();
        if (!alive) return;
        if (u && (u.id || u.email)) setState("ok"); else { setState("redir"); router.replace("/login"); }
      } catch {
        setState("redir");
        router.replace("/login");
      }
    })();
    return () => { alive = false; };
  }, [router]);

  if (state === "loading") return <div className="grid min-h-[40vh] place-items-center text-sm text-white/70">Checking session…</div>;
  if (state === "redir") return null;
  return <>{children}</>;
}
