/*
  Adds missing onboarding/publish fields to User and creates OnboardingEvent table
  to align database with current prisma/schema.prisma.
*/

-- AlterTable: add onboarding/publish fields to User
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "published" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "onboardingCompletedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "lastOnboardingEmailAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "paymentConnected" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable: OnboardingEvent
CREATE TABLE IF NOT EXISTS "OnboardingEvent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "step" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OnboardingEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'OnboardingEvent_userId_fkey'
  ) THEN
    ALTER TABLE "OnboardingEvent" ADD CONSTRAINT "OnboardingEvent_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "OnboardingEvent_userId_step_action_createdAt_idx"
  ON "OnboardingEvent"("userId", "step", "action", "createdAt");

