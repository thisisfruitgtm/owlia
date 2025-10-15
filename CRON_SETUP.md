# Email Sequences Cron Job Setup

## Overview
Automated email sequences are sent via a cron job that runs daily at 9:00 AM (server timezone).

## Endpoint
```
GET /api/cron/email-sequences
```

## Authentication
Requires `Authorization: Bearer <CRON_SECRET>` header.

## Environment Variable
Add to Coolify (or .env for local testing):
```bash
CRON_SECRET=your-random-secret-here-min-32-chars
```

Generate secure secret:
```bash
openssl rand -base64 32
```

## Setup Options

### Option 1: Coolify Internal Cron (Recommended)
Add to Coolify service settings:

**Schedule:** `0 9 * * *` (every day at 9:00 AM)
**Command:**
```bash
curl -X GET https://owlia.ro/api/cron/email-sequences \
  -H "Authorization: Bearer ${CRON_SECRET}"
```

### Option 2: External Cron Service
Use **cron-job.org** or **EasyCron**:

1. Create new cron job
2. URL: `https://owlia.ro/api/cron/email-sequences`
3. Method: GET
4. Headers: `Authorization: Bearer YOUR_CRON_SECRET`
5. Schedule: Daily at 9:00 AM
6. Timezone: Europe/Bucharest

### Option 3: GitHub Actions (Free)
Create `.github/workflows/cron-emails.yml`:
```yaml
name: Email Sequences Cron
on:
  schedule:
    - cron: '0 7 * * *' # 9:00 AM Bucharest (UTC+2)
  workflow_dispatch:

jobs:
  trigger-cron:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger email sequences
        run: |
          curl -X GET https://owlia.ro/api/cron/email-sequences \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

Add `CRON_SECRET` to GitHub Secrets.

## Email Sequences

### Guide Downloads
- **Day 3:** Tips & value content + soft CTA
- **Day 7:** Case study (VipBebe) + hard CTA

### Calculator Leads
- **Day 1:** Immediate (calculator results) ✅ Already sent
- **Day 3:** Industry-specific tips + consultation CTA
- **Day 5:** Urgency + social proof + deadline warning
- **Day 7:** Final push with bonus offer (48h expiry)

### Package Interest
- **Day 0:** Immediate confirmation ✅ Already sent
- **Day 2:** Detailed package breakdown + what's included
- **Day 5:** Testimonial (Atelier de Business) + last call

## Testing Locally

1. Start dev server: `npm run dev`
2. Set `CRON_SECRET` in `.env`
3. Test endpoint:
```bash
curl -X GET http://localhost:3000/api/cron/email-sequences \
  -H "Authorization: Bearer YOUR_LOCAL_SECRET"
```

## Monitoring

Check logs in Coolify or server:
```
[CRON] Starting email sequences job...
[CRON] Starting guide sequence emails...
[CRON] Guide sequences: Day 3 sent: 5, Day 7 sent: 2
[CRON] Starting calculator sequence emails...
[CRON] Calculator sequences: Day 3: 8, Day 5: 4, Day 7: 1
[CRON] Starting package sequence emails...
[CRON] Package sequences: Day 2: 3, Day 5: 1
[CRON] All email sequences completed!
```

## PostHog Tracking
All sequence emails are tracked with:
- Event: `sequence_email_sent`
- Properties: `{ sequence, day, lead_id, ... }`

View in PostHog Dashboard → Insights → Filter by `sequence_email_sent`

## Troubleshooting

**No emails sent?**
- Check server timezone matches expected time
- Verify `CRON_SECRET` is set correctly
- Check Resend API key is valid
- Review server logs for errors

**Wrong timing?**
- Adjust cron schedule (use crontab.guru for help)
- Consider server timezone offset

**Emails not tracking in PostHog?**
- Verify `NEXT_PUBLIC_POSTHOG_KEY` is set
- Check PostHog backend client initialization
- Review console logs for tracking errors

## Stopping Sequences When Lead Converts

**Important:** When a lead becomes a client, you MUST mark them as converted to stop email sequences.

### Method 1: Using the helper function (Recommended)

```typescript
import { convertLeadByEmail } from "@/lib/leads/convertLead";

// When creating a new client from a lead
const client = await prisma.client.create({
  data: { /* ... */ },
});

// Mark lead as converted (stops all sequences)
await convertLeadByEmail(email, client.id);
```

### Method 2: Manual update

```typescript
await prisma.lead.update({
  where: { id: leadId },
  data: {
    converted: true,
    clientId: clientId,
  },
});
```

### What happens when converted?
- ✅ All email sequences stop immediately
- ✅ PostHog tracks "lead_converted" event
- ✅ Conversion metrics are recorded (days to convert, source, etc.)
- ✅ Lead is linked to Client record

### Admin Panel Integration
In your admin panel, when creating a new client:
1. Check if there's a lead with the same email
2. If yes, call `convertLeadByEmail(email, clientId)`
3. This prevents duplicate emails and tracks conversion funnel

## Future Enhancements
- [ ] Add email open tracking (webhook from Resend)
- [ ] Add click tracking for links in emails
- [ ] A/B test email subject lines
- [ ] Personalize send times based on user timezone
- [x] Stop sequence if user converts ✅ DONE
- [ ] Re-engagement sequence for cold leads (30+ days)

