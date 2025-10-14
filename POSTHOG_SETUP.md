# PostHog Analytics Setup Guide

## ✅ Quick Setup

### 1. Get PostHog API Key

1. Go to [PostHog EU](https://eu.posthog.com/signup)
2. Create account / login
3. Create new project (or select existing)
4. Go to **Settings** → **Project** → **Project API Key**
5. Copy the key (starts with `phc_`)

### 2. Add Environment Variables

Add to `.env` (local) or Coolify (production):

```env
NEXT_PUBLIC_POSTHOG_KEY="phc_your_project_api_key_here"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
```

⚠️ **Important:** These must be prefixed with `NEXT_PUBLIC_` to work in the browser.

### 3. Restart Application

```bash
# Local
npm run dev

# Production (Coolify)
Redeploy the application
```

---

## 🧪 Testing

### Check Console (Development)
Open browser console, you should see:
```
PostHog loaded successfully
```

If you see this warning instead:
```
PostHog API key not found. Analytics disabled.
```

→ Environment variables are not set correctly!

### Check PostHog Dashboard

1. Go to your PostHog project dashboard
2. Navigate to **Events** → **Live Events**
3. Visit your website pages
4. You should see `$pageview` and `$pageleave` events appearing in real-time

---

## 📊 What Gets Tracked?

### Automatic Events:
- ✅ **$pageview** - Every page navigation
- ✅ **$pageleave** - When user leaves a page
- ✅ **$autocapture** - Clicks, form submissions (if enabled)

### Custom Events (Manual):
See `lib/analytics/track.ts` for all available events:

```ts
import { analytics } from '@/lib/analytics/track';

// Examples:
analytics.calculatorSubmit({ industry, revenue, budget });
analytics.packageInterest({ packageName, email });
analytics.guideDownload(email);
analytics.login(role);
```

---

## 🔧 Troubleshooting

### No Events Showing Up?

1. **Check Environment Variables:**
   ```bash
   # In browser console:
   console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY)
   console.log(process.env.NEXT_PUBLIC_POSTHOG_HOST)
   ```
   Both should return values (not `undefined`)

2. **Check Network Tab:**
   - Open DevTools → Network
   - Filter by `posthog.com`
   - You should see POST requests to `https://eu.i.posthog.com/e/`
   - Status should be `200 OK`

3. **Check PostHog Status:**
   - [PostHog Status Page](https://status.posthog.com/)
   - Verify EU region is operational

4. **Ad Blockers:**
   - Some ad blockers block PostHog
   - Try disabling or whitelist `posthog.com`

5. **CORS Issues:**
   - PostHog EU should work by default
   - If issues, check PostHog project settings

### Events Not Showing Immediately?

- PostHog can have 1-2 minute delay for events to appear
- Check **Live Events** for real-time view
- Check **Events** → **Recent** for processed events

### Development vs Production

- Development: Events are sent but may be filtered in PostHog
- Production: All events are tracked
- You can filter by environment in PostHog dashboard

---

## 🎯 Best Practices

### 1. User Identification

Identify users after login:
```ts
import { identifyUser } from '@/lib/analytics/track';

// After successful login:
identifyUser(user.id, {
  email: user.email,
  name: user.name,
  role: user.role
});
```

### 2. Reset on Logout

Clear user data on logout:
```ts
import { resetUser } from '@/lib/analytics/track';

// On logout:
resetUser();
```

### 3. Track Important Actions

Track key user actions:
```ts
// Lead generation
analytics.calculatorSubmit({ ... });
analytics.packageInterest({ ... });

// Admin actions
analytics.clientCreated(clientId);
analytics.contractGenerated({ ... });

// Client actions
analytics.contractViewed(contractId);
analytics.fileDownloaded({ ... });
```

---

## 📈 PostHog Features to Enable

### 1. Session Recording
- Go to **Settings** → **Project** → **Recordings**
- Enable session recordings to see user interactions
- Set sampling rate (e.g., 50% for production)

### 2. Feature Flags
- Test new features with specific users
- A/B testing

### 3. Experiments
- Run A/B tests
- Measure impact of changes

### 4. Dashboards
- Create custom dashboards
- Monitor key metrics
- Set up alerts

---

## 🔒 Privacy & GDPR

### EU Compliance
- Using EU region (`eu.i.posthog.com`)
- Data stored in EU
- GDPR compliant by default

### User Consent
If you need cookie consent:
```ts
// Only init after consent
if (userConsent) {
  initPostHog();
}
```

### Opt-out
```ts
import { posthog } from '@/lib/analytics/posthog';

// User opts out:
posthog.opt_out_capturing();

// User opts back in:
posthog.opt_in_capturing();
```

---

## 📚 Resources

- [PostHog Docs](https://posthog.com/docs)
- [PostHog JS SDK](https://posthog.com/docs/libraries/js)
- [Next.js Integration](https://posthog.com/docs/libraries/next-js)
- [PostHog EU](https://eu.posthog.com)

---

## 💡 Need Help?

1. Check PostHog [Community Forum](https://posthog.com/questions)
2. PostHog [Slack Community](https://posthog.com/slack)
3. [PostHog Support](https://posthog.com/support)

