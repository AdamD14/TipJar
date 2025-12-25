#!/bin/bash
# Uruchamia Edge Functions standalone przez Deno (bez Supabase)
cd "$(dirname "$0")/supabase/functions"

export JWT_SECRET="${JWT_SECRET:-your-super-secret-jwt-token-with-at-least-32-characters-long}"
export STORJ_ENDPOINT="${STORJ_ENDPOINT}"
export STORJ_ACCESS_KEY="${STORJ_ACCESS_KEY}"
export STORJ_SECRET_KEY="${STORJ_SECRET_KEY}"
export STORJ_PUBLIC_URL_PREFIX="${STORJ_PUBLIC_URL_PREFIX}"
export STORJ_BUCKET="${STORJ_BUCKET}"
export NESTJS_INTERNAL_URL="${NESTJS_INTERNAL_URL:-http://localhost:3001}"
export NESTJS_SECRET_KEY="${NESTJS_SECRET_KEY}"

echo "🚀 Starting Edge Functions on http://localhost:54399"
echo "   Available functions:"
echo "   - POST http://localhost:54399/storj-presigned"
echo "   - POST http://localhost:54399/storj-upload-confirm"

deno run --allow-net --allow-env --allow-read \
  --import-map=./import_map.json \
  ./server.ts
