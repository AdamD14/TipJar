"use client";
import React from "react";

export default function TipFlowShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-teal-950 p-6 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="font-heading text-xl font-semibold">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
