# Email System (Resend)

## Setup

1. Add your Resend API key to `.env`:
```env
RESEND_API_KEY=re_xxxxx
```

2. Verify domain in Resend dashboard:
   - Domain: `owlia.ro`
   - From email: `updates@owlia.ro`

## Usage

### Send Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/email/send';

await sendWelcomeEmail('user@example.com', 'John Doe');
```

### Send Guide Download Email

```typescript
import { sendGuideDownloadEmail } from '@/lib/email/send';

await sendGuideDownloadEmail(
  'user@example.com',
  'https://owlia.ro/downloads/guide.pdf'
);
```

### Custom Email

```typescript
import { sendEmail } from '@/lib/email/send';

await sendEmail({
  to: 'user@example.com',
  subject: 'Your Subject',
  html: '<p>Your HTML content</p>',
});
```

## Templates

Templates are located in `lib/email/templates/`:
- `welcome.ts` - Welcome email for new users
- `guideDownload.ts` - Email with guide download link

## Testing

Test emails locally:

```typescript
// In your API route or component
const result = await sendWelcomeEmail('test@example.com', 'Test User');

if (result.success) {
  console.log('Email sent:', result.data);
} else {
  console.error('Email failed:', result.error);
}
```

## Email Design Guidelines

- Mobile-first responsive design
- OWLIA brand colors (Navy #00288B, Cream #F5F5F0)
- Clear CTAs with buttons
- Professional footer with copyright
- Maximum width: 600px

## Resend Dashboard

Access your sent emails and analytics:
https://resend.com/emails

