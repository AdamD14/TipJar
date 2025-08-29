"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API } from "@/lib/api-routes";

export default function Page() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [msg, setMsg] = useState("Verifying…");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${API.AUTH.VERIFY.replace(":token", String(token))}`, { credentials: "include" });
        if (!alive) return;
        if (res.ok) setMsg("Email verified ✓"); else setMsg("Verification failed");
      } catch {
        setMsg("Verification error");
      }
      setTimeout(() => router.replace("/login"), 1200);
    })();
    return () => { alive = false; };
  }, [token, router]);

  return (
    <main className="grid min-h-[60vh] place-items-center bg-[#001F1F] p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">{msg}</div>
    </main>
  );
}
