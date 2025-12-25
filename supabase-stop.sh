#!/bin/bash
# Zatrzymuje Supabase + Edge Proxy
cd "$(dirname "$0")"

echo "🛑 Stopping Edge Functions Proxy..."
docker-compose -f docker-compose.edge-proxy.yml down

echo "🛑 Stopping Supabase..."
npx supabase stop

echo "✅ All stopped."
