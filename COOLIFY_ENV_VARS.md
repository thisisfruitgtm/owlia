# 🔧 Coolify Environment Variables Setup

## 📍 Unde setezi variabilele în Coolify:

### **Pași:**

1. **Deschide Coolify Dashboard**
   - Mergi la aplicația ta

2. **Click pe "Environment Variables"** (tab în partea de sus)

3. **Adaugă variabilele așa:**

```
NEXT_PUBLIC_POSTHOG_KEY=phc_abc123...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

⚠️ **IMPORTANT - Format corect:**
- ✅ `NEXT_PUBLIC_POSTHOG_KEY=phc_abc123...` (fără spații, fără ghilimele)
- ❌ `NEXT_PUBLIC_POSTHOG_KEY = "phc_abc123..."` (GREȘIT - are spații și ghilimele)
- ❌ `POSTHOG_KEY=phc_abc123...` (GREȘIT - lipsește `NEXT_PUBLIC_`)

4. **Click "Save"**

5. **Click "Deploy"** (buton roșu)
   - ⚠️ **OBLIGATORIU** - variabilele nu se aplică automat!
   - Așteaptă să termine build-ul (~3-5 minute)

---

## ✅ Verificare că Funcționează:

### **1. În Browser Console:**

După ce s-a făcut deploy:

1. Deschide website-ul tău
2. Apasă **F12** (sau Right Click → Inspect)
3. Mergi la tab-ul **Console**
4. Scrie și apasă Enter:

```javascript
process.env.NEXT_PUBLIC_POSTHOG_KEY
```

**Rezultat așteptat:**
```
"phc_abc123xyz..."  // ✅ Key-ul tău real
```

**Dacă vezi `undefined`:**
```
undefined  // ❌ Variabilele NU sunt setate corect!
```

→ **Soluție:** Verifică Coolify și fă redeploy!

---

### **2. Verifică în Coolify Logs:**

După deploy, în Coolify:
- Click pe **Logs**
- Caută: `"PostHog loaded successfully"` sau `"PostHog API key not found"`

**Dacă vezi:**
- ✅ `"PostHog loaded successfully"` → Perfect!
- ❌ `"PostHog API key not found"` → Env vars nu sunt setate!

---

## 🔍 Debugging Checklist:

### ❌ **Problema:** "API key not found" sau `undefined` în console

**Verifică în ordine:**

1. **Coolify env vars sunt setate corect?**
   - [ ] `NEXT_PUBLIC_POSTHOG_KEY` (exact așa, cu underscore)
   - [ ] `NEXT_PUBLIC_POSTHOG_HOST` (exact așa, cu underscore)
   - [ ] Fără ghilimele (`""`)
   - [ ] Fără spații în jurul `=`
   - [ ] Key începe cu `phc_`

2. **Ai făcut redeploy după ce ai setat variabilele?**
   - [ ] Click pe "Deploy" în Coolify
   - [ ] Așteaptă să termine build-ul complet
   - [ ] Verifică că build-ul a reușit (fără erori)

3. **Build-ul a reușit?**
   - [ ] Verifică Coolify → Logs
   - [ ] Caută erori de build
   - [ ] Verifică că scrie "Build completed successfully"

4. **Browser cache?**
   - [ ] Hard refresh: Ctrl+Shift+R (sau Cmd+Shift+R pe Mac)
   - [ ] Sau: Clear cache and hard reload

---

## 📝 Template Complet Environment Variables:

**Copy-paste în Coolify (secțiunea Environment Variables):**

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret-here

# Email (Resend)
RESEND_API_KEY=re_your_resend_api_key

# File Upload
UPLOAD_DIR=/app/uploads

# Puppeteer (PDF Generation)
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# PostHog Analytics (EU Region)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

**Notă:** Înlocuiește valorile cu cele reale!

---

## 🎯 De ce `NEXT_PUBLIC_` prefix?

**Next.js expune variabilele către browser DOAR dacă au prefix `NEXT_PUBLIC_`**

- ✅ `NEXT_PUBLIC_POSTHOG_KEY` → Vizibil în browser (pentru PostHog)
- ❌ `POSTHOG_KEY` → NU e vizibil în browser (nu funcționează)

**Regula:**
- Client-side (browser): **TREBUIE** `NEXT_PUBLIC_`
- Server-side: **NU trebuie** `NEXT_PUBLIC_`

---

## 🆘 Încă nu funcționează?

### **Testează cu script-ul nostru:**

După deploy, în Coolify Terminal (sau SSH):

```bash
node scripts/check-env.js
```

**Output așteptat:**
```
✅ NEXT_PUBLIC_POSTHOG_KEY: phc_abc1...xyz4
✅ NEXT_PUBLIC_POSTHOG_HOST: https://eu.i.posthog.com
✅ PostHog configuration looks good!
```

---

## 📞 Support:

Dacă tot nu funcționează după:
1. ✅ Setat variabilele în Coolify
2. ✅ Făcut redeploy
3. ✅ Verificat în browser console
4. ✅ Verificat logs

→ Posibil bug în Coolify - verifică [Coolify Discord](https://coolify.io/discord)

---

## 🎉 Success Indicators:

**Știi că funcționează când:**
1. ✅ Browser console arată key-ul (nu `undefined`)
2. ✅ PostHog dashboard arată evenimente `$pageview`
3. ✅ Network tab arată requests către `eu.i.posthog.com` (status 200)
4. ✅ Logs arată "PostHog loaded successfully"

---

**Last updated:** 2025-01-15

