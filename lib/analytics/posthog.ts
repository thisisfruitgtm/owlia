import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    // Debug logging
    console.log("[PostHog Debug] Initializing...");
    console.log("[PostHog Debug] API Key present:", !!apiKey);
    console.log("[PostHog Debug] API Key length:", apiKey?.length || 0);
    console.log("[PostHog Debug] Host:", host);

    if (apiKey) {
      console.log("[PostHog Debug] Starting init with key:", apiKey.substring(0, 8) + "...");
      posthog.init(apiKey, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: true, // Automatic pageview tracking
        capture_pageleave: true, // Automatic pageleave tracking
        loaded: (posthog) => {
          console.log("✅ PostHog loaded successfully!");
        },
      });
    } else {
      console.warn("❌ PostHog API key not found. Analytics disabled.");
      console.warn("[PostHog Debug] Make sure NEXT_PUBLIC_POSTHOG_KEY is set as a build argument in Dockerfile/Coolify");
    }
  }

  return posthog;
};

export { posthog };

