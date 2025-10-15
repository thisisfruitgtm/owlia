# 🚨 FIX pentru Migrația Eșuată în Producție

## Problema

Migrația `20251015202357_add_package_delivery_conditions` a eșuat în producție (error P3009) și blochează deployment-ul.

## Soluție Rapidă (2 opțiuni)

### **OPȚIUNEA 1: Fix Manual în Database (RECOMANDAT)**

**Conectează-te la database-ul de producție și rulează:**

```sql
-- 1. Adaugă coloanele noi (IF NOT EXISTS pentru siguranță)
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "deliveryDays" INTEGER;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "conditions" TEXT;
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN;

-- 2. Setează valori default pentru rândurile existente
UPDATE "Package" SET "visible" = true WHERE "visible" IS NULL;

-- 3. Fă coloana NOT NULL după ce toate rândurile au valori
ALTER TABLE "Package" ALTER COLUMN "visible" SET NOT NULL;
```

**Apoi în Coolify terminal (în container-ul aplicației):**

```bash
npx prisma migrate resolve --applied 20251015202357_add_package_delivery_conditions
```

---

### **OPȚIUNEA 2: Rollback + Redeploy (RAPID)**

**În Coolify terminal:**

```bash
# 1. Marchează migrația ca rolled-back
npx prisma migrate resolve --rolled-back 20251015202357_add_package_delivery_conditions

# 2. Re-aplică toate migrările
npx prisma migrate deploy
```

---

### **OPȚIUNEA 3: Emergency Fix - Ștergere Temporară (DACĂ CELELALTE EȘUEAZĂ)**

Dacă opțiunile de mai sus nu funcționează și site-ul trebuie să fie UP urgent:

**În cod (local):**
```bash
cd /Users/mihailmarincea/Documents/Owlia/website
rm -rf prisma/migrations/20251015202357_add_package_delivery_conditions
git add -A
git commit -m "temp: remove failed migration for emergency deploy"
git push origin main
```

**După ce site-ul funcționează:**
1. Aplică manual SQL-ul în database
2. Re-adaugă migrația
3. Marchează-o ca applied

---

## Verificare După Fix

```bash
# În Coolify terminal:
npx prisma migrate status

# Ar trebui să vezi:
# ✅ All migrations have been applied
```

---

## Prevention pentru Viitor

**Înainte de push migrări în producție:**

1. **Testează local** (dacă ai acces la o copie a bazei de date):
```bash
npm run prisma:migrate deploy
```

2. **Verifică sintaxa SQL** pentru PostgreSQL compatibility

3. **Folosește IF NOT EXISTS** pentru siguranță:
```sql
ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "newColumn" TYPE;
```

4. **Pentru coloane NOT NULL cu date existente:**
   - Adaugă coloana ca nullable
   - Setează valori default
   - Apoi fă-o NOT NULL

---

## 📞 Contact pentru Support

Dacă problema persistă, contactează administratorul de bază de date pentru a aplica manual SQL-ul.

