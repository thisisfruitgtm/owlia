import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    if (apiKey) {
      posthog.init(apiKey, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: true, // Automatic pageview tracking
        capture_pageleave: true, // Automatic pageleave tracking
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log("PostHog loaded successfully");
          }
        },
      });
    } else {
      console.warn("PostHog API key not found. Analytics disabled.");
    }
  }

  return posthog;
};

export { posthog };

