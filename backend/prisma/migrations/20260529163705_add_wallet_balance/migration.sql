-- CreateTable
CREATE TABLE "WalletBalance" (
    "id" TEXT NOT NULL,
    "circleWalletId" TEXT NOT NULL,
    "totalUsdc" DECIMAL(20,6) NOT NULL DEFAULT 0,
    "rawJson" JSONB,
    "circleUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletBalance_circleWalletId_key" ON "WalletBalance"("circleWalletId");

-- AddForeignKey
ALTER TABLE "WalletBalance" ADD CONSTRAINT "WalletBalance_circleWalletId_fkey" FOREIGN KEY ("circleWalletId") REFERENCES "CircleWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
