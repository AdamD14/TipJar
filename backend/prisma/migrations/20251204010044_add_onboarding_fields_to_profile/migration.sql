-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USDC',
ADD COLUMN     "goalLabel" TEXT,
ADD COLUMN     "goalTarget" INTEGER,
ADD COLUMN     "industry" TEXT;

-- CreateTable
CREATE TABLE "UserRoleMap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRoleMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserRoleMap_role_createdAt_idx" ON "UserRoleMap"("role", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleMap_userId_role_key" ON "UserRoleMap"("userId", "role");

-- AddForeignKey
ALTER TABLE "UserRoleMap" ADD CONSTRAINT "UserRoleMap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
