/*
  Warnings:

  - You are about to drop the column `twitterUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'UPLOADING', 'COMPLETED', 'PROCESSED', 'FAILED');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "twitterUrl",
DROP COLUMN "youtubeUrl",
ADD COLUMN     "socials" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "MediaRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slotId" INTEGER NOT NULL DEFAULT 0,
    "storjKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "etag" TEXT,
    "bucket" TEXT NOT NULL DEFAULT 'tipjar-avatar',
    "provider" TEXT NOT NULL DEFAULT 'storj',
    "status" "MediaStatus" NOT NULL DEFAULT 'PENDING',
    "originalUrl" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MediaRecord_userId_idx" ON "MediaRecord"("userId");

-- CreateIndex
CREATE INDEX "MediaRecord_storjKey_idx" ON "MediaRecord"("storjKey");

-- CreateIndex
CREATE UNIQUE INDEX "MediaRecord_userId_slotId_key" ON "MediaRecord"("userId", "slotId");

-- AddForeignKey
ALTER TABLE "MediaRecord" ADD CONSTRAINT "MediaRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
