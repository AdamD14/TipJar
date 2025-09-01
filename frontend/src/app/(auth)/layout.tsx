"use client";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-[100svh] bg-[linear-gradient(135deg,hsl(180,100%,7%)_0%,hsl(180,100%,8%)_33%,hsl(195,100%,13%)_60%,hsl(215,100%,11%)_100%)] text-white"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-md items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          {children}
        </div>
      </div>
    </main>
  );
}

