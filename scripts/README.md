# PostHog Setup Automation

Automated script to configure PostHog analytics with Actions, Funnels, Insights, and Dashboards.

## Prerequisites

1. **Python 3.7+** installed
2. **PostHog Personal API Key** - Get it from [PostHog Settings](https://eu.i.posthog.com/settings/user-api-keys)

## Installation

```bash
# Create virtual environment (recommended for macOS)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r scripts/requirements.txt
```

## Configuration

1. Get your **Personal API Key** from PostHog:
   - Go to: https://eu.i.posthog.com/settings/user-api-keys
   - Click "Create Personal API Key"
   - Copy the key

2. Add to your `.env` file:
```bash
POSTHOG_PERSONAL_API_KEY=phx_your_personal_api_key_here
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key_here  # Already exists
```

## Usage

```bash
# Activate virtual environment (if not already active)
source venv/bin/activate

# Run the setup script
python scripts/setup-posthog.py

# When done, deactivate virtual environment
deactivate
```

## What Gets Created

### 1. Actions (6 total)
- ✅ Calculator Completed
- ✅ Package Interest Submitted
- ✅ Guide Download Started
- ✅ CTA Clicked
- ✅ Lead Created (Server)
- ✅ Lead Converted

### 2. Funnels (2 total)
- 🔀 **Lead Generation Funnel**
  - Step 1: Pageview `/start-up-nation`
  - Step 2: Calculator Completed
  - Step 3: Package Interest Submitted
  - Window: 7 days

- 🔀 **Guide to Customer Funnel**
  - Step 1: Pageview `/ghid`
  - Step 2: Guide Download Started
  - Step 3: Package Interest Submitted
  - Window: 14 days

### 3. Trend Insights (3 total)
- 📈 **Daily Conversions** - Line graph of all conversion events
- 📊 **Top Performing Industries** - Bar chart breakdown by industry
- 💰 **Revenue by Lead Source** - Sum of revenue by industry

### 4. Dashboard
- 📊 **Conversion Goals - Owlia** - Main dashboard (pinned)

## Troubleshooting

### Error: "POSTHOG_PERSONAL_API_KEY not found"
- Make sure you added the key to `.env`
- Load environment: `source .env` or restart terminal

### Error: "401 Unauthorized"
- Check that your Personal API Key is valid
- Regenerate key in PostHog if needed

### Error: "Already exists"
- Script is idempotent - safe to run multiple times
- Existing items will show warning but won't break

## Manual Verification

After running the script, verify in PostHog:

1. **Actions**: https://eu.i.posthog.com/data-management/actions
2. **Insights**: https://eu.i.posthog.com/insights
3. **Dashboards**: https://eu.i.posthog.com/dashboard

## Advanced: Customize the Script

Edit `scripts/setup-posthog.py` to:
- Add more actions
- Create custom funnels
- Add retention cohorts
- Setup alerts (requires additional API calls)

## API Documentation

- PostHog API Docs: https://posthog.com/docs/api
- Actions API: https://posthog.com/docs/api/actions
- Insights API: https://posthog.com/docs/api/insights
- Dashboards API: https://posthog.com/docs/api/dashboards

