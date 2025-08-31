import { ReactNode } from "react";

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-28 pb-10">
      <h1 className="mb-6 text-3xl font-semibold text-[#DDE0DA]">{title}</h1>
      {children}
    </section>
  );
}

