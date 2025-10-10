# Troubleshooting Guide

## Login nu funcționează după deploy

### Problema
Eroare: "Email sau parolă incorectă" chiar folosind credențialele corecte.

### Cauze posibile
1. Seed-ul nu s-a executat în producție
2. Baza de date nu are useri
3. Hash-ul parolei nu se potrivește

### Soluție 1: Rulează seed manual în container

**Din Coolify:**
1. Mergi la container
2. Deschide Terminal/SSH
3. Rulează:
```bash
npx tsx prisma/seed.ts
```

**Sau din CLI:**
```bash
# Găsește container ID
docker ps | grep owlia

# Intră în container
docker exec -it <container-id> sh

# Rulează seed
npx tsx prisma/seed.ts
```

### Soluție 2: Verifică dacă există useri în DB

```bash
# Din container
npx prisma studio
# Apoi accesează în browser la localhost:5555

# SAU folosește psql
docker exec -it <postgres-container> psql -U <db-user> -d <db-name>
SELECT email, role FROM "User";
```

### Soluție 3: Creează admin manual

```bash
# Din container
node -e "
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');
const prisma = new PrismaClient();

(async () => {
  const password = await hash('admin123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'admin@owlia.ro',
      password: password,
      name: 'Admin Owlia',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin created:', user.email);
  await prisma.\$disconnect();
})();
"
```

### Soluție 4: Verifică NEXTAUTH_SECRET

Asigură-te că `NEXTAUTH_SECRET` este setat în Coolify environment variables:
```bash
openssl rand -base64 32
```

### Credențiale Default
După seed, credențialele sunt:
- **Email:** `admin@owlia.ro`
- **Parolă:** `admin123`

⚠️ **SCHIMBĂ PAROLA** după primul login!

## Database Connection Failed

### Check DATABASE_URL
```bash
# Verifică variabila în Coolify
echo $DATABASE_URL

# Format corect:
postgresql://user:password@host:5432/database?schema=public
```

### Test connection
```bash
# Din container
npx prisma db pull
```

## Email nu se trimite

### Verifică RESEND_API_KEY
```bash
# Testează din container
node -e "
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET ✅' : 'NOT SET ❌');
"
```

### Test manual
```bash
# Din container
node -e "
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

(async () => {
  const result = await resend.emails.send({
    from: 'OWLIA <noreply@owlia.ro>',
    to: 'your-email@example.com',
    subject: 'Test Email',
    html: '<p>Test email from Owlia</p>'
  });
  console.log('Result:', result);
})();
"
```

## Migrations Failed

### Reset migrations (⚠️ DESTRUCTIVE)
```bash
# BACKUP first!
npx prisma migrate reset --force

# Then deploy
npx prisma migrate deploy
```

### Check migration status
```bash
npx prisma migrate status
```

## Build Errors

### Clear cache și rebuild
```bash
# În Coolify, trigger un rebuild complet
# Sau local:
rm -rf .next node_modules
npm install
npm run build
```

## Upload Files nu funcționează

### Verifică volume mount
```bash
# Check dacă /app/uploads există
docker exec -it <container-id> ls -la /app/uploads

# Check permissions
docker exec -it <container-id> chmod -R 777 /app/uploads
```

## Environment Variables

### Lista completă necesară:
```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://owlia.ro
NEXTAUTH_SECRET=<random-32-chars>

# Email
RESEND_API_KEY=re_...

# Optional
NODE_ENV=production
```

### Verifică toate vars
```bash
# Din container
printenv | grep -E "(DATABASE|NEXTAUTH|RESEND)"
```

## Performance Issues

### Check logs
```bash
# În Coolify, vezi Logs
# Sau:
docker logs <container-id> -f
```

### Memory usage
```bash
docker stats <container-id>
```

## Contact Support

Dacă problema persistă:
1. Check logs în Coolify
2. Verifică toate environment variables
3. Contactează echipa de suport cu error logs

