// frontend/src/components/profile/CommunitySection.tsx
"use client";

const TEXT_PRIMARY = "#DDE0DA";
const TEXT_SECONDARY = "#BCC1B6";

type Props = {
  links?: { label: string; href: string }[];
};

export default function CommunitySection({ links = [] }: Props) {
  return (
    <section className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.85)] p-5">
      <h2 className="text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>
        Community
      </h2>
      <p className="mt-1 text-sm" style={{ color: TEXT_SECONDARY }}>
        Join the discussion and connect with other fans.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.length ? (
          links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[12px] border border-[#FFD700CC] px-3 py-1.5 text-sm text-[#FFD700] transition hover:bg-[rgba(255,215,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
            >
              {l.label}
            </a>
          ))
        ) : (
          <span className="text-sm" style={{ color: TEXT_SECONDARY }}>
            No links yet.
          </span>
        )}
      </div>
    </section>
  );
}
