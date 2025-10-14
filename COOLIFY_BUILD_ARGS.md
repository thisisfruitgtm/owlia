# 🐳 Coolify Build Arguments for PostHog

## ⚠️ IMPORTANT: PostHog Needs Build-Time Variables!

PostHog requires `NEXT_PUBLIC_*` environment variables **at build time**, not just runtime.

---

## 🔧 How to Set Build Arguments in Coolify

### **Step 1: Go to Your Application**
Navigate to your application in Coolify dashboard.

### **Step 2: Set Environment Variables**
Go to **Environment Variables** section.

For each PostHog variable, you need to set it in **TWO places**:

#### **As Environment Variable (Runtime):**
```
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Make sure these checkboxes are **CHECKED**:
- ☑️ **Available at Buildtime**
- ☑️ **Available at Runtime**

#### **As Build Argument (if separate section exists):**
Some Coolify versions have a separate "Build Arguments" section.

If it exists, add there too:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

---

## 🎯 Why Both?

1. **Buildtime** = Docker `ARG` → Used during `npm run build`
2. **Runtime** = Docker `ENV` → Used when app is running

Next.js **injects** `NEXT_PUBLIC_*` variables into the JavaScript bundle during build.
If they're not available at build time, they'll be `undefined` in the browser!

---

## ✅ Verification After Deploy

### **1. Check Browser Console**

Open your site and look for these messages:

**Success:**
```
[PostHog Debug] Initializing...
[PostHog Debug] API Key present: true
[PostHog Debug] API Key length: 43
[PostHog Debug] Host: https://eu.i.posthog.com
[PostHog Debug] Starting init with key: phc_voRo...
✅ PostHog loaded successfully!
```

**Failure:**
```
[PostHog Debug] Initializing...
[PostHog Debug] API Key present: false
[PostHog Debug] API Key length: 0
❌ PostHog API key not found. Analytics disabled.
```

### **2. Check Network Tab**

- Open DevTools → Network
- Filter: `posthog` or `eu.i.posthog.com`
- Should see POST requests to `https://eu.i.posthog.com/e/`

---

## 🐛 Troubleshooting

### Problem: "API Key present: false" after deploy

**Causes:**
1. ❌ "Available at Buildtime" checkbox not checked
2. ❌ Variables not set as build arguments
3. ❌ Didn't redeploy after setting variables

**Solution:**
1. ✅ Check BOTH boxes (Buildtime + Runtime)
2. ✅ Save variables
3. ✅ **Redeploy** (important!)
4. ✅ Wait for build to complete
5. ✅ Check console logs

---

## 📋 Quick Checklist

Before deploying:
- [ ] Environment variables set in Coolify
- [ ] "Available at Buildtime" ☑️ checked
- [ ] "Available at Runtime" ☑️ checked
- [ ] Variables saved
- [ ] Redeploy triggered
- [ ] Build completed successfully
- [ ] Browser console shows "API Key present: true"
- [ ] PostHog dashboard shows events

---

## 🔗 References

- Dockerfile: See lines 23-29 (ARG + ENV declarations)
- Next.js docs: [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- PostHog docs: [Next.js Integration](https://posthog.com/docs/libraries/next-js)

---

**Last updated:** 2025-01-15

