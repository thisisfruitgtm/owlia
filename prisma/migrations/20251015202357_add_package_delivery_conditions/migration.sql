-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "deliveryDays" INTEGER,
ADD COLUMN     "conditions" TEXT,
ADD COLUMN     "visible" BOOLEAN DEFAULT true NOT NULL;
