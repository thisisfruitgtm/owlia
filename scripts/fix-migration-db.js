#!/usr/bin/env node
/**
 * Script pentru rezolvarea migrației eșuate în producție
 * Rulează: node scripts/fix-migration-db.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixFailedMigration() {
  try {
    console.log('🔧 Conectare la baza de date...');
    
    // 1. Verifică dacă coloanele există deja
    console.log('\n📋 Verificare coloane existente...');
    const checkColumns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Package' 
      AND column_name IN ('deliveryDays', 'conditions', 'visible')
    `;
    
    console.log(`Găsite ${checkColumns.length} coloane din 3 necesare`);
    
    // 2. Aplică coloanele dacă nu există
    if (checkColumns.length < 3) {
      console.log('\n🔨 Aplicare coloane noi...');
      
      await prisma.$executeRaw`
        ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "deliveryDays" INTEGER
      `;
      console.log('✅ deliveryDays adăugat');
      
      await prisma.$executeRaw`
        ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "conditions" TEXT
      `;
      console.log('✅ conditions adăugat');
      
      await prisma.$executeRaw`
        ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN
      `;
      console.log('✅ visible adăugat (nullable)');
      
      // Setează valori default
      await prisma.$executeRaw`
        UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL
      `;
      console.log('✅ Valori default setate');
      
      // Fă coloana NOT NULL
      await prisma.$executeRaw`
        ALTER TABLE "Package" ALTER COLUMN "visible" SET NOT NULL
      `;
      console.log('✅ visible făcut NOT NULL');
    } else {
      console.log('✅ Toate coloanele există deja');
    }
    
    // 3. Marchează migrația ca aplicată (rolled back first, then applied)
    console.log('\n📝 Ștergere record migrație eșuată...');
    await prisma.$executeRaw`
      DELETE FROM "_prisma_migrations" 
      WHERE "migration_name" = '20251015202357_add_package_delivery_conditions'
    `;
    console.log('✅ Record migrație eșuată șters');
    
    // 4. Inserează record nou ca migrație aplicată cu succes
    console.log('\n✨ Marcare migrație ca aplicată...');
    await prisma.$executeRaw`
      INSERT INTO "_prisma_migrations" (
        "id", 
        "checksum", 
        "finished_at", 
        "migration_name", 
        "logs", 
        "rolled_back_at", 
        "started_at", 
        "applied_steps_count"
      ) VALUES (
        gen_random_uuid(),
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        NOW(),
        '20251015202357_add_package_delivery_conditions',
        NULL,
        NULL,
        NOW(),
        1
      )
    `;
    console.log('✅ Migrație marcată ca aplicată cu succes');
    
    console.log('\n🎉 MIGRAȚIE REZOLVATĂ CU SUCCES!');
    console.log('\n📊 Verificare finală...');
    
    // Verificare finală
    const finalCheck = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Package' 
      AND column_name IN ('deliveryDays', 'conditions', 'visible')
      ORDER BY column_name
    `;
    
    console.log('\nColoane în tabela Package:');
    console.table(finalCheck);
    
  } catch (error) {
    console.error('\n❌ EROARE:', error.message);
    console.error('\nDetalii:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixFailedMigration()
  .then(() => {
    console.log('\n✅ Script finalizat cu succes!');
    console.log('🔄 Reîncearcă deployment-ul în Coolify.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script eșuat:', error);
    process.exit(1);
  });

