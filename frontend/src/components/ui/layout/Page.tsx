import type { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-teal-950 p-4">{children}</main>;
}
