import { NextRequest } from 'next/server';
import { rateLimit } from '../../utils/rateLimiter';

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  if (!rateLimit(ip)) {
    return new Response('Too many requests', { status: 429 });
  }

  const config = {
    entryPoint: process.env.NEXT_PUBLIC_ENTRYPOINT_ADDRESS,
    paymaster: process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS,
    usdc: process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS,
    bundlerRpc: process.env.NEXT_PUBLIC_BUNDLER_RPC_URL,
  };

  if (Object.values(config).some((v) => !v)) {
    return new Response('Paymaster config missing', { status: 500 });
  }

  return Response.json(config);
}
