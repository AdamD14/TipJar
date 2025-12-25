#!/bin/bash
# Uruchamia Supabase + Edge Proxy
cd "$(dirname "$0")"

echo "🚀 Starting Supabase..."
npx supabase start

echo "🔌 Starting Edge Functions Proxy..."
docker-compose -f docker-compose.edge-proxy.yml up -d

echo ""
echo "✅ Done! Edge Functions available at:"
echo "   - Via Kong (CORS *): http://localhost:54321/functions/v1"
echo "   - Direct (CORS ok):  http://localhost:54399"
