
import React from "react";

// Refined Section component props to explicitly include children using React.PropsWithChildren, fixing type errors in WhyPage and HowPage.
export default function Section({ title, subtitle, children }: React.PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="text-3xl font-black italic text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-400 font-medium max-w-2xl">{subtitle}</p>}
      <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl">
        {children}
      </div>
    </section>
  );
}
