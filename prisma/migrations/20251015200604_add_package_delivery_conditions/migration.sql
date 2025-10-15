-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "deliveryDays" INTEGER,
ADD COLUMN     "conditions" TEXT,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- Update existing packages to be visible by default
UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL;

