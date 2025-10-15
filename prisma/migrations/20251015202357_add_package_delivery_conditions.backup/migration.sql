-- AlterTable
ALTER TABLE "Package" ADD COLUMN "deliveryDays" INTEGER;
ALTER TABLE "Package" ADD COLUMN "conditions" TEXT;
ALTER TABLE "Package" ADD COLUMN "visible" BOOLEAN;

-- Set default values for existing rows
UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL;

-- Make the column NOT NULL after setting defaults
ALTER TABLE "Package" ALTER COLUMN "visible" SET NOT NULL;
