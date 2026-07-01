-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('DEPOSIT', 'INTERNAL_TRANSFER', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "FeeStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "FeeTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "FeeType" NOT NULL,
    "grossAmount" DECIMAL(20,6) NOT NULL,
    "feeAmount" DECIMAL(20,6) NOT NULL,
    "netAmount" DECIMAL(20,6) NOT NULL,
    "sourceTxHash" TEXT,
    "feeTxHash" TEXT,
    "status" "FeeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeeTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeeTransaction_walletId_idx" ON "FeeTransaction"("walletId");

-- CreateIndex
CREATE INDEX "FeeTransaction_sourceTxHash_idx" ON "FeeTransaction"("sourceTxHash");
