import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    if (apiKey) {
      posthog.init(apiKey, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log("PostHog loaded successfully");
          }
        },
      });
    } else {
      // Only log warning in development
      if (process.env.NODE_ENV === "development") {
        console.warn("PostHog API key not found. Analytics disabled.");
      }
    }
  }

  return posthog;
};

export { posthog };

