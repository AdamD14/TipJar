import React from 'react';

const DEFAULT_METRICS = [
  { title: 'Total Tips', value: '1,247', diff: '+12.5%' },
  { title: 'Active Patrons', value: '384', diff: '+8.3%' },
  { title: 'Monthly Volume', value: '4,892', diff: '+23.1%' }
];

export default function AnalyticsVectorCard() {
  return (
    <div className="group flex flex-col gap-4 w-full">
      {DEFAULT_METRICS.map((stat, i) => (
        <div
          key={i}
          className="relative bg-teal-900/80 backdrop-blur-xl border border-teal-50/10 p-5 rounded-xl shadow-card-rest transition-all duration-300 ease-standard group-hover:not-hover:opacity-30 group-hover:not-hover:scale-95 group-hover:not-hover:blur-[2px]"
        >
          <h3 className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.1em] text-teal-25">
            {stat.title}
          </h3>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-black text-text-primary tnum drop-shadow-[0_2px_4px_rgba(0,17,17,0.8)]">
              {stat.value}
            </p>
            <span className="text-sm font-bold text-gold-400 mb-1">{stat.diff}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
