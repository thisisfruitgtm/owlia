# 🚨 FIX URGENT - Site-ul Blocat de Migrație

## Problema Actuală

Migrația `20251015202357_add_package_delivery_conditions` a eșuat în database și blochează deployment-urile.

---

## ✅ SOLUȚIE SIMPLĂ (2 PAȘI)

### **Pasul 1: Așteaptă deployment-ul actual să termine**

Site-ul va fi UP din nou (migrația eșuată a fost ștearsă din cod).

### **Pasul 2: Rulează scriptul de fix în Coolify**

**În Coolify → Select Application → Terminal (sau Exec):**

```bash
# Navighează la directorul aplicației
cd /app

# Rulează scriptul de fix automat
node scripts/fix-migration-db.js
```

**Scriptul va:**
- ✅ Aplica coloanele noi în tabela Package
- ✅ Șterge record-ul migrației eșuate
- ✅ Marca migrația ca aplicată cu succes

**Output așteptat:**
```
🔧 Conectare la baza de date...
📋 Verificare coloane existente...
🔨 Aplicare coloane noi...
✅ deliveryDays adăugat
✅ conditions adăugat
✅ visible adăugat
✅ Valori default setate
✅ visible făcut NOT NULL
📝 Ștergere record migrație eșuată...
✅ Record migrație eșuată șters
✨ Marcare migrație ca aplicată...
✅ Migrație marcată ca aplicată cu succes
🎉 MIGRAȚIE REZOLVATĂ CU SUCCES!
```

---

## 🔄 După Rularea Scriptului

**Reîncearcă un deployment din Coolify:**
- Deploy button → Forță rebuild
- Deployment-ul va merge fără erori P3009
- Site-ul va funcționa normal cu toate funcționalitățile

---

## 🆘 Dacă Nu Ai Acces la Terminal Coolify

**Contactează administratorul serverului pentru a rula:**

```sql
-- 1. Aplică coloanele noi
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "deliveryDays" INTEGER;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "conditions" TEXT;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN;
UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL;
ALTER TABLE "Package" ALTER COLUMN "visible" SET NOT NULL;

-- 2. Șterge migrația eșuată
DELETE FROM "_prisma_migrations" 
WHERE "migration_name" = '20251015202357_add_package_delivery_conditions';

-- 3. Inserează ca aplicată
INSERT INTO "_prisma_migrations" (
  "id", "checksum", "finished_at", "migration_name", 
  "logs", "rolled_back_at", "started_at", "applied_steps_count"
) VALUES (
  gen_random_uuid(),
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  NOW(),
  '20251015202357_add_package_delivery_conditions',
  NULL, NULL, NOW(), 1
);
```

---

## ✅ Verificare După Fix

```bash
# În Coolify terminal:
npx prisma migrate status

# Ar trebui să vezi:
Database schema is up to date!
```

---

## 📋 Summary

**Quick Fix:**
1. Așteaptă deployment-ul să termine (site UP)
2. Rulează `node scripts/fix-migration-db.js` în Coolify terminal
3. Reîncearcă deployment (va merge smooth)

**Timp estimat:** 2-3 minute pentru fix complet

**Site-ul va funcționa normal după acești pași!** 🎉

