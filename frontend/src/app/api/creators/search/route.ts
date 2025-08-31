import { NextResponse } from 'next/server';
import seed from '@/data/creators.seed.json';

// Types mirrored from UI types for consistency
type Creator = {
  id: string;
  handle: string;
  name: string;
  tagline?: string;
  avatarUrl?: string | null;
  metricLabel?: string;
  metricValue?: number;
  location?: string;
  verified?: boolean;
  tags?: string[];
  category?: string;
  monetization?: string[];
  activity?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  const arr = (key: string) =>
    (searchParams.get(key)?.split(',').filter(Boolean).map((x) => x.toLowerCase()) ?? []);

  const category = arr('category');
  const monetization = arr('monetization');
  const activity = arr('activity');

  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const pageSize = Math.min(60, Math.max(1, Number(searchParams.get('pageSize') || '24')));

  const filtered = (seed as Creator[]).filter((c) => {
    const text = `${c.name} ${c.handle} ${c.tagline ?? ''} ${c.location ?? ''} ${(c.tags ?? []).join(' ')}`.toLowerCase();

    if (q && !text.includes(q)) return false;
    if (category.length && (!c.category || !category.includes(c.category.toLowerCase()))) return false;
    if (monetization.length && (!c.monetization || !c.monetization.some((m) => monetization.includes(m.toLowerCase()))))
      return false;
    if (activity.length && (!c.activity || !activity.includes(c.activity.toLowerCase()))) return false;
    return true;
  });

  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data,
    total: filtered.length,
    page,
    pageSize,
  });
}

