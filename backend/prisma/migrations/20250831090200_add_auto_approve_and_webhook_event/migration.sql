/*
  Align DB with schema.prisma:
  - Add User.autoApproveTierChanges (BOOLEAN NOT NULL DEFAULT true)
  - Create WebhookEvent table (if not exists)
*/

-- Add missing column on User
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "autoApproveTierChanges" BOOLEAN NOT NULL DEFAULT true;

-- Create WebhookEvent table if absent
CREATE TABLE IF NOT EXISTS "WebhookEvent" (
  "id" TEXT NOT NULL,
  "externalId" TEXT,
  "type" TEXT NOT NULL,
  "signature" TEXT,
  "rawBody" TEXT,
  "rawJson" JSONB,
  "status" TEXT NOT NULL DEFAULT 'received',
  "error" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3),
  CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- Index for query performance
CREATE INDEX IF NOT EXISTS "WebhookEvent_type_status_createdAt_idx"
  ON "WebhookEvent"("type", "status", "createdAt");

