// PostHog backend client for server-side tracking
import { PostHog } from 'posthog-node';

let posthogBackend: PostHog | null = null;

export function getPostHogBackend(): PostHog {
  if (!posthogBackend) {
    posthogBackend = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        flushAt: 1, // Send events immediately in development
        flushInterval: 10000, // Flush every 10 seconds in production
      }
    );
  }

  return posthogBackend;
}

// Graceful shutdown - important for serverless!
export async function shutdownPostHog() {
  if (posthogBackend) {
    await posthogBackend.shutdown();
  }
}

// Track server-side event
export function trackServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, any>
) {
  const client = getPostHogBackend();
  
  client.capture({
    distinctId,
    event,
    properties: {
      ...properties,
      $server: true, // Mark as server-side event
      timestamp: new Date().toISOString(),
    },
  });
}

// Identify user with properties
export function identifyUser(
  distinctId: string,
  properties: Record<string, any>
) {
  const client = getPostHogBackend();
  
  client.identify({
    distinctId,
    properties,
  });
}

// Create alias (for merging anonymous → identified users)
export function aliasUser(distinctId: string, alias: string) {
  const client = getPostHogBackend();
  
  client.alias({
    distinctId,
    alias,
  });
}

// Track with user identification
export function trackWithUser(
  email: string,
  event: string,
  properties?: Record<string, any>
) {
  trackServerEvent(email, event, properties);
}

