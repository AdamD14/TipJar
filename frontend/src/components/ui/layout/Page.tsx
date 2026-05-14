import type { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[#001F1F] p-4">{children}</main>;
}
