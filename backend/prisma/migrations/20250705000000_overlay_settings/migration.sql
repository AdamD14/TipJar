-- CreateTable
CREATE TABLE "OverlaySettings" (
    "creatorId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "opacity" DOUBLE PRECISION NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "entryAnimation" TEXT NOT NULL,
    "specialEffectThreshold" INTEGER NOT NULL,
    "specialEffectType" TEXT NOT NULL,
    "soundEffectUrl" TEXT,
    CONSTRAINT "OverlaySettings_pkey" PRIMARY KEY ("creatorId")
);

-- AddForeignKey
ALTER TABLE "OverlaySettings" ADD CONSTRAINT "OverlaySettings_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
