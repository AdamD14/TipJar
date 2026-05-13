"use client";
import { useEffect, useState } from "react";
import { me } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();
  const [state, setState] = useState<"loading" | "ok" | "redir">("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const u = await me();
        if (!alive) return;
        if (u && (u.id || u.email)) setState("ok");
        else {
          setState("redir");
          const returnTo = encodeURIComponent(path || "/");
          router.replace(`/login?returnTo=${returnTo}`);
        }
      } catch {
        setState("redir");
        const returnTo = encodeURIComponent(path || "/");
        router.replace(`/login?returnTo=${returnTo}`);
      }
    })();
    return () => {
      alive = false;
    };
  }, [router]);

  if (state === "loading")
    return (
      <div className="grid min-h-[40vh] place-items-center gap-3">
        <Spinner size="md" />
        <span className="font-body text-sm text-teal-25">
          Checking session…
        </span>
      </div>
    );
  if (state === "redir") return null;
  return <>{children}</>;
}
