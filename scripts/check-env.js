#!/usr/bin/env node

// Script to check if PostHog env vars are set correctly

console.log('\n🔍 Checking PostHog Environment Variables...\n');

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('');

// Check NEXT_PUBLIC_POSTHOG_KEY
if (key) {
  const masked = key.substring(0, 8) + '...' + key.substring(key.length - 4);
  console.log('✅ NEXT_PUBLIC_POSTHOG_KEY:', masked);
  
  if (!key.startsWith('phc_')) {
    console.log('⚠️  Warning: Key should start with "phc_"');
  }
} else {
  console.log('❌ NEXT_PUBLIC_POSTHOG_KEY: NOT SET');
  console.log('   → Add to .env or Coolify environment variables');
}

console.log('');

// Check NEXT_PUBLIC_POSTHOG_HOST
if (host) {
  console.log('✅ NEXT_PUBLIC_POSTHOG_HOST:', host);
  
  if (host !== 'https://eu.i.posthog.com' && host !== 'https://us.i.posthog.com') {
    console.log('⚠️  Warning: Unusual host URL');
  }
} else {
  console.log('❌ NEXT_PUBLIC_POSTHOG_HOST: NOT SET');
  console.log('   → Should be: https://eu.i.posthog.com');
}

console.log('');

// Final status
if (key && host) {
  console.log('✅ PostHog configuration looks good!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Deploy to Coolify');
  console.log('3. Check browser console for "PostHog loaded successfully"');
} else {
  console.log('❌ PostHog configuration incomplete!');
  console.log('');
  console.log('To fix:');
  console.log('1. Set environment variables in Coolify');
  console.log('2. Redeploy the application');
  console.log('3. Run this script again: node scripts/check-env.js');
}

console.log('');

