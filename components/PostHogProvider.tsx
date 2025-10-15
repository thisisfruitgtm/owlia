"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/analytics/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Delay PostHog initialization until page is fully loaded and idle
    const initAnalytics = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          setTimeout(() => initPostHog(), 2000);
        });
      } else {
        setTimeout(() => initPostHog(), 3000);
      }
    };

    if (document.readyState === "complete") {
      initAnalytics();
    } else {
      window.addEventListener("load", initAnalytics);
      return () => window.removeEventListener("load", initAnalytics);
    }
  }, []);

  return <>{children}</>;
}

