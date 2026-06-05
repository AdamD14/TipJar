-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'info';
