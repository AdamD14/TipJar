import { NextResponse } from 'next/server';

const API = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const { creator, tierId } = await req.json();
    if (!creator || !tierId) {
      return NextResponse.json({ message: 'creator and tierId are required' }, { status: 400 });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL as string;
    if (!site || !API) {
      return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
    }
    const successUrl = `${site}/sub/success?u=${encodeURIComponent(creator)}&tier=${encodeURIComponent(tierId)}`;
    const cancelUrl  = `${site}/sub/cancel?u=${encodeURIComponent(creator)}&tier=${encodeURIComponent(tierId)}`;

    const res = await fetch(`${API}/api/v1/subscriptions/checkout-hosted`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ creator, tierId, successUrl, cancelUrl, source: 'web' }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ message: text || 'Upstream error' }, { status: 502 });
    }
    const data = await res.json();
    if (!data.checkoutUrl) {
      return NextResponse.json({ message:'checkoutUrl missing' }, { status: 500 });
    }
    return NextResponse.json({ checkoutUrl: data.checkoutUrl });
  } catch (e:any) {
    return NextResponse.json({ message: e?.message || 'Unknown error' }, { status: 500 });
  }
}

