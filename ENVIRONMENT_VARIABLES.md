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
NEXT_PUBLIC_POSTHOG_KEY="phc_your_project_api_key"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
```

## How to Get PostHog API Key

1. Go to [PostHog](https://eu.posthog.com/signup) (EU region)
2. Create a new project or select existing
3. Go to Project Settings → Project API Key
4. Copy the key (starts with `phc_`)
5. Add to `.env`:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY="phc_your_key_here"
   NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
   ```

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

