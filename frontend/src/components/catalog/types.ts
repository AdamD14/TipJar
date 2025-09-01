// frontend/src/components/catalog/types.ts
export type Creator = {
  id: string;
  handle: string;
  name: string;
  tagline?: string;
  avatarUrl?: string | null;
  metricLabel?: string;   // e.g. "patrons"
  metricValue?: number;   // e.g. 124
  location?: string;      // e.g. "London, UK"
  verified?: boolean;
  tags?: string[];        // e.g. ["Illustration", "Comics"]
};

export type CreatorCardProps = {
  creator: Creator;
  /** Destination to the public profile (required for accessible CTA). */
  href: string;
  className?: string;
  /** data-analytics-id for CTR tracking */
  analyticsId?: string;
};
