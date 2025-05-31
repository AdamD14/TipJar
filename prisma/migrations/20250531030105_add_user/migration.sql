-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentHashedRefreshToken" TEXT,
ADD COLUMN     "emailVerificationToken" TEXT;
