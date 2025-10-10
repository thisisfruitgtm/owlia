# 🚀 Coolify Deployment Guide - Owlia Platform

## Prerequisites

✅ Domeniu conectat: `owlia.ro`  
✅ Coolify instance running  
✅ PostgreSQL database disponibil în Coolify  
✅ GitHub repo: `https://github.com/thisisfruitgtm/owlia.git`

---

## Step 1: Create PostgreSQL Database

1. În Coolify dashboard → **Databases**
2. Click **Add New Database** → PostgreSQL
3. Setări:
   - **Name:** `owlia-db`
   - **Version:** Latest (15+)
   - **Port:** Default (5432)
4. Click **Create**
5. **Salvează credențialele** (vei avea nevoie de `DATABASE_URL`)

---

## Step 2: Create New Application

1. În Coolify dashboard → **Applications**
2. Click **Add New Application**
3. Selectează:
   - **Type:** Public Repository
   - **Git Source:** GitHub
   - **Repository URL:** `https://github.com/thisisfruitgtm/owlia.git`
   - **Branch:** `main`
4. **Build Pack:** Nixpacks (auto-detect Next.js)
5. Click **Save**

---

## Step 3: Configure Application Settings

### 3.1 General Settings

- **Application Name:** `owlia-platform`
- **Domain:** `owlia.ro` (sau subdomain dacă preferi `app.owlia.ro`)
- **Port:** `3000`
- **Build Command:** (auto-detect, dar verifică să fie `npm run build`)
- **Start Command:** (auto-detect, dar verifică să fie `npm run start`)

### 3.2 Environment Variables

Click **Environment Variables** și adaugă:

```env
# Database
DATABASE_URL=postgresql://username:password@owlia-db:5432/owlia
# ☝️ IMPORTANT: Folosește internal connection string din Coolify DB

# NextAuth
NEXTAUTH_SECRET=<genereaza-cu-openssl-rand-base64-32>
NEXTAUTH_URL=https://owlia.ro
# ☝️ Sau https://app.owlia.ro dacă folosești subdomain

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
# ☝️ Obține de pe https://resend.com/api-keys

# File Storage
UPLOAD_DIR=/app/uploads

# App
NODE_ENV=production
```

**Cum să generezi NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 4: Create Persistent Volume

1. În aplicație → **Volumes**
2. Click **Add Volume**
3. Setări:
   - **Name:** `owlia-uploads`
   - **Mount Path:** `/app/uploads`
   - **Size:** `10GB` (sau mai mult dacă ai multe fișiere)
4. Click **Save**

---

## Step 5: Build Settings (Optional)

Dacă vrei să optimizezi build-ul:

1. **Build Command:**
   ```bash
   npm ci && npm run build
   ```

2. **Install Command:**
   ```bash
   npm ci
   ```

---

## Step 6: Deploy

1. Click **Deploy** (butonul mare)
2. Așteaptă build-ul (3-5 min prima dată)
3. Verifică logs pentru erori

---

## Step 7: Post-Deploy - Database Setup

**IMPORTANT:** După primul deploy reușit, trebuie să rulezi migrations și seed.

### Opțiune A: Prin Coolify Terminal

1. În aplicație → **Terminal**
2. Rulează:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Opțiune B: Local cu DATABASE_URL

1. Local, actualizează `.env` cu `DATABASE_URL` de pe Coolify
2. Rulează:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

**Seed-ul va crea:**
- Admin user: `admin@owlia.ro` / `admin123`
- Pachete: SMART (42k), PREMIUM (55k)
- Settings: toate modulele activate

---

## Step 8: Verificare

1. Deschide `https://owlia.ro`
2. Testează:
   - ✅ Landing page se încarcă
   - ✅ `/auth/login` funcționează
   - ✅ Login cu `admin@owlia.ro` / `admin123`
   - ✅ Redirect la dashboard (va veni în faza următoare)

---

## 🔧 Troubleshooting

### Build Failed - Prisma

**Eroare:** `Prisma Client is not generated`

**Soluție:**
```bash
# Adaugă în package.json > scripts > build:
"build": "prisma generate && next build --turbopack"
```

### Database Connection Error

**Eroare:** `Can't reach database server`

**Soluție:**
- Verifică că folosești **internal connection string** din Coolify
- Format: `postgresql://user:pass@service-name:5432/dbname`
- NU folosi external connection (cu IP)

### File Upload Errors

**Eroare:** `EACCES: permission denied`

**Soluție:**
- Verifică că volume-ul este mount la `/app/uploads`
- Verifică permissions în Dockerfile (user nextjs:nodejs)

### NextAuth Session Error

**Eroare:** `[next-auth][error][SESSION_ERROR]`

**Soluție:**
- Regenerează `NEXTAUTH_SECRET`
- Verifică că `NEXTAUTH_URL` este corect (cu HTTPS)

---

## 🔄 Update & Redeploy

Când faci push pe GitHub:

1. Coolify auto-detectează (dacă ai activat webhook)
2. SAU manual: click **Redeploy** în Coolify

**Migrations noi:**
```bash
# În Coolify Terminal după deploy
npx prisma migrate deploy
```

---

## 📊 Monitoring

### Logs

- **Build Logs:** Vezi în Coolify pe durata build-ului
- **Runtime Logs:** Click pe **Logs** în aplicație
- Caută erori: filtrează după `ERROR` sau `FATAL`

### Database

- **Prisma Studio:** Rulează local cu `DATABASE_URL` de pe Coolify:
  ```bash
  npm run prisma:studio
  ```

### Backup Database

În Coolify → Database → **Backups**:
- Activează automatic backups
- Frecvență recomandată: **Daily**
- Retention: **7 zile** (sau mai mult)

---

## 🔐 Security Checklist

- [ ] `NEXTAUTH_SECRET` generat random (32+ caractere)
- [ ] `DATABASE_URL` folosește credențiale strong
- [ ] SSL/TLS activat pe domeniu (Coolify auto)
- [ ] Schimbă parola admin-ului după primul login
- [ ] Volume permissions corecte (`700`)
- [ ] Environment variables nu sunt în git (în `.env`)

---

## 📞 Next Steps

După ce totul funcționează:

1. **Schimbă parola admin**
2. **Testează înregistrare client nou**
3. **Continuă dezvoltarea** (Phase 2: Landing Page complet)
4. **Setup Resend** pentru email-uri
5. **Monitorizează logs** primele zile

---

## 🆘 Support

Dacă ai probleme:
1. Check logs în Coolify
2. Verifică environment variables
3. Testează database connection
4. Contactează: admin@owlia.ro

---

**Succes cu deployment-ul! 🎉**

