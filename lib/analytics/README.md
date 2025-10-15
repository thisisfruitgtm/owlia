# Analytics Library

## Overview

This directory contains analytics utilities for both client-side tracking (PostHog) and server-side data retrieval.

## Files

### `posthog.ts`
Client-side PostHog initialization and configuration.

```ts
import { initPostHog, posthog } from '@/lib/analytics/posthog';

// Initialize PostHog (called automatically in PostHogProvider)
initPostHog();
```

### `track.ts`
Custom event tracking utilities.

```ts
import { analytics } from '@/lib/analytics/track';

// Track custom events
analytics.calculatorSubmit({ industry, revenue, budget });
analytics.packageInterest({ packageName, email });
analytics.guideDownload(email);
```

### `posthogApi.ts` ⭐ NEW
Server-side PostHog API for retrieving analytics data.

**Requirements:**
- `POSTHOG_PERSONAL_API_KEY` - Personal API key from PostHog
- `POSTHOG_PROJECT_ID` - Your PostHog project ID
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (default: `https://eu.i.posthog.com`)

**Functions:**

#### `getPageviews(days = 30)`
Get total pageviews and trend data.

```ts
const result = await getPageviews(30);
// Returns: { total: number, trend: number[], labels: string[] }
```

#### `getSessions(days = 30)`
Get total sessions and trend data.

```ts
const result = await getSessions(30);
// Returns: { total: number, trend: number[], labels: string[] }
```

#### `getTopPages(limit = 10)`
Get most visited pages.

```ts
const result = await getTopPages(10);
// Returns: Array<{ page: string, count: number }>
```

#### `getActiveUsers(days = 30)`
Get count of active users.

```ts
const count = await getActiveUsers(30);
// Returns: number
```

#### `getTrafficAnalytics()`
Get all traffic analytics at once (recommended).

```ts
const analytics = await getTrafficAnalytics();
// Returns: {
//   pageviews: { total, trend, labels },
//   sessions: { total, trend, labels },
//   topPages: Array<{ page, count }>,
//   activeUsers: number
// }
```

## Usage in Admin Dashboard

The admin analytics page automatically fetches and displays traffic data if PostHog API keys are configured:

```tsx
// app/admin/analytics/page.tsx
// Automatically shows traffic section if data is available
{analytics.traffic && (
  <div>
    <h2>Trafic Website</h2>
    <p>Pageviews: {analytics.traffic.pageviews.total}</p>
    <p>Sessions: {analytics.traffic.sessions.total}</p>
  </div>
)}
```

## Setup

### 1. Get PostHog Personal API Key

1. Login to PostHog (https://eu.posthog.com)
2. Click profile → **Personal API Keys**
3. Create new key
4. Copy key (starts with `phx_`)

### 2. Get Project ID

From PostHog URL: `https://eu.posthog.com/project/[PROJECT_ID]`

### 3. Add Environment Variables

```env
POSTHOG_PERSONAL_API_KEY="phx_your_key_here"
POSTHOG_PROJECT_ID="12345"
```

### 4. Restart Application

```bash
npm run dev
```

## Error Handling

All functions gracefully handle missing API keys:
- If keys are not configured, functions return `null` or empty data
- Console warnings are logged in development
- Admin dashboard shows data only if available (no errors shown to user)

## Notes

- PostHog API has rate limits (varies by plan)
- Data may have 1-2 minute delay
- Use EU region for GDPR compliance
- Personal API key is separate from client-side key

## See Also

- [POSTHOG_SETUP.md](../../POSTHOG_SETUP.md) - Complete PostHog setup guide
- [ENVIRONMENT_VARIABLES.md](../../ENVIRONMENT_VARIABLES.md) - All environment variables

