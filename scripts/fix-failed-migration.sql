-- Script pentru rezolvarea migrației eșuate în producție
-- Rulează aceste comenzi în ordine în baza de date de producție

-- 1. Verifică dacă coloanele există deja
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'Package' 
AND column_name IN ('deliveryDays', 'conditions', 'visible');

-- 2. Dacă coloanele NU există, aplică-le:
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "deliveryDays" INTEGER;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "conditions" TEXT;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN;

-- 3. Setează valori default pentru rândurile existente
UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL;

-- 4. Fă coloana NOT NULL după ce toate rândurile au valori
ALTER TABLE "Package" ALTER COLUMN "visible" SET NOT NULL;

-- 5. Verifică că toate coloanele au fost create cu succes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'Package' 
AND column_name IN ('deliveryDays', 'conditions', 'visible');

-- 6. După ce SQL-ul a fost aplicat cu succes, marchează migrația ca aplicată:
-- DELETE FROM "_prisma_migrations" WHERE migration_name = '20251015202357_add_package_delivery_conditions';
-- INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
-- VALUES (gen_random_uuid(), 'checksum_here', NOW(), '20251015202357_add_package_delivery_conditions', NULL, NULL, NOW(), 1);

-- SAU rulează în terminal-ul Coolify:
-- npx prisma migrate resolve --applied 20251015202357_add_package_delivery_conditions

