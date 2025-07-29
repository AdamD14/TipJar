-- AlterTable
ALTER TABLE "User" ADD COLUMN     "consents" JSONB,
ADD COLUMN     "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false;
