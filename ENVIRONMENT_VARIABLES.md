# Environment Variables

## Required Variables

### Database
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### NextAuth (Authentication)
```env
NEXTAUTH_URL="http://localhost:3000"  # Or your production URL
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32
```

### Email (Resend)
```env
RESEND_API_KEY="re_your_api_key_here"
```

### File Upload
```env
# For production (Docker):
UPLOAD_DIR="/app/uploads"

# For local development:
UPLOAD_DIR="./public/uploads"
```

### Puppeteer (PDF Generation)
```env
# For production (Docker):
PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# For local development (leave empty or omit):
# PUPPETEER_EXECUTABLE_PATH=""
```

### PostHog Analytics (EU Region)
```env
# Client-side tracking (required)
NEXT_PUBLIC_POSTHOG_KEY="phc_your_project_api_key"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"

# Server-side analytics API (optional - for admin analytics dashboard)
POSTHOG_PERSONAL_API_KEY="phx_your_personal_api_key"
POSTHOG_PROJECT_ID="12345"
```

## How to Get PostHog Keys

### Project API Key (Client-side)
1. Go to [PostHog](https://eu.posthog.com/signup) (EU region)
2. Create a new project or select existing
3. Go to **Settings** → **Project** → **Project API Key**
4. Copy the key (starts with `phc_`)
5. Add to `.env`:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY="phc_your_key_here"
   NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
   ```

### Personal API Key (Server-side Analytics)
Required only if you want traffic analytics in admin dashboard:

1. Go to your PostHog account
2. Click your profile → **Personal API Keys**
3. Create new Personal API Key
4. Copy the key (starts with `phx_`)
5. Get your Project ID from URL: `https://eu.posthog.com/project/[PROJECT_ID]`
6. Add to `.env`:
   ```env
   POSTHOG_PERSONAL_API_KEY="phx_your_key_here"
   POSTHOG_PROJECT_ID="12345"
   ```

**Note:** Personal API key is optional. Without it, admin analytics will work but won't show traffic data from PostHog.

## Note on NEXT_PUBLIC_ Prefix

Variables with `NEXT_PUBLIC_` prefix are exposed to the browser.
- Use for: API keys that need to work client-side (PostHog, etc.)
- Don't use for: Sensitive secrets (database passwords, auth secrets, etc.)

## Local Development

Create a `.env` file in the project root with all the variables above.

## Production (Coolify)

Set all environment variables in Coolify UI:
1. Open your application in Coolify
2. Go to Environment Variables
3. Add each variable from the list above
4. Save and redeploy

