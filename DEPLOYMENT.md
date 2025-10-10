# Deployment Guide - Coolify

## 🚀 Initial Setup

### 1. Environment Variables

Add these in **Coolify Dashboard → Application → Environment Variables**:

```env
# Database (provided by Coolify PostgreSQL service)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth (REQUIRED!)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://owlia.ro

# Email (Resend)
RESEND_API_KEY=re_xxxxx

# File Upload
UPLOAD_DIR=/app/uploads

# Node Environment
NODE_ENV=production
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Build Configuration

In Coolify, set build command to:

```bash
npm run deploy
```

This will:
1. Run database migrations (`prisma migrate deploy`)
2. Generate Prisma Client (`prisma generate`)
3. Build Next.js app (`next build`)

### 3. Volume Mount

Create persistent volume for file uploads:
- **Mount Path:** `/app/uploads`
- **Size:** 10GB (adjust as needed)

### 4. Domain Setup

Point your domain to Coolify:
1. Add DNS record: `A` → Coolify server IP
2. In Coolify: **Settings → Domains** → Add `owlia.ro`
3. Enable HTTPS (automatic via Let's Encrypt)

---

## 📦 First Deployment

### Step 1: Push to GitHub

```bash
git push origin main
```

### Step 2: Deploy in Coolify

Coolify will automatically:
1. Pull latest code from GitHub
2. Run `npm run deploy` (migrations + build)
3. Start the application

### Step 3: Verify Deployment

Check logs in Coolify:
```
✓ Prisma migrations applied
✓ Prisma Client generated
✓ Next.js build successful
✓ Server started on port 3000
```

### Step 4: Seed Initial Data (Optional)

Connect to container terminal in Coolify:

```bash
npm run prisma:seed
```

This creates:
- Admin user (`admin@owlia.ro` / `admin123`)
- Default packages (SMART, PREMIUM, PERSONALIZAT)
- Initial settings

---

## 🔄 Subsequent Deployments

Every `git push` triggers automatic deployment via webhook.

**Manual deployment:**
1. Go to Coolify dashboard
2. Click **Deploy** button
3. Wait for build to complete

---

## 🐛 Troubleshooting

### Error: "The table public.Lead does not exist"

**Fix:** Run migrations manually

```bash
# In Coolify terminal
npm run prisma:migrate:deploy
```

### Error: "UntrustedHost"

**Fix:** Already fixed in code (`trustHost: true` in NextAuth config)

Verify environment variables:
```env
NEXTAUTH_URL=https://owlia.ro  # ← Must match your domain
```

### Error: "Can't reach database server"

**Fix:** Check DATABASE_URL

1. Coolify → PostgreSQL service → Copy connection string
2. Update DATABASE_URL in environment variables
3. Redeploy

### Build fails with Prisma errors

**Fix:** Ensure migrations folder is in Git

```bash
git add prisma/migrations/
git commit -m "Add database migrations"
git push origin main
```

---

## 📊 Database Management

### View Database

```bash
# In Coolify terminal
npm run prisma:studio
```

Access Prisma Studio at `http://localhost:5555`

### Backup Database

Coolify provides automatic PostgreSQL backups.

**Manual backup:**
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Reset Database (⚠️ DANGER)

```bash
# Drop all tables and recreate
npx prisma migrate reset --force

# Re-seed data
npm run prisma:seed
```

---

## 🔐 Security Checklist

- ✅ NEXTAUTH_SECRET is strong and unique
- ✅ DATABASE_URL uses secure password
- ✅ RESEND_API_KEY is not exposed in client code
- ✅ HTTPS is enabled (automatic with Coolify)
- ✅ Environment variables are NOT in Git
- ✅ Admin password changed from default

---

## 📈 Monitoring

### Check Logs

Coolify Dashboard → **Logs** → Real-time logs

### Common Log Messages

✅ **Success:**
```
✓ Ready in 205ms
Server started successfully
```

❌ **Error:**
```
[auth][error] UntrustedHost
[prisma] The table does not exist
```

### Health Check

Visit: `https://owlia.ro`

Should show:
- Homepage loads
- Navigation works
- No console errors

---

## 🔄 Rollback

If deployment fails:

1. Go to Coolify → **Deployments**
2. Find previous working deployment
3. Click **Rollback**

---

## 📞 Support

For deployment issues:
- Check Coolify logs first
- Verify environment variables
- Ensure database is running
- Check GitHub repo is up to date

---

## 📝 Notes

- **First deployment:** Takes ~5 minutes (migrations + build)
- **Subsequent deployments:** ~2-3 minutes
- **Database:** Managed by Coolify (PostgreSQL service)
- **Files:** Stored in `/app/uploads` volume (persistent)
- **Logs:** Available in Coolify for 7 days

---

## ✅ Post-Deployment Checklist

After first deployment:

- [ ] Homepage loads correctly
- [ ] Navigation dropdown works
- [ ] Calculator saves leads to database
- [ ] Email sending works (test with real email)
- [ ] Admin login works (`admin@owlia.ro`)
- [ ] File uploads work
- [ ] All service pages load
- [ ] Case studies display correctly
- [ ] Mobile responsive works

---

**Last Updated:** January 10, 2025
**Deployment Target:** Coolify (Docker)
**Production URL:** https://owlia.ro

