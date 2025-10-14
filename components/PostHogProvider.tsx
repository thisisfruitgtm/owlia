"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/analytics/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog on mount
    initPostHog();
  }, []);

  return <>{children}</>;
}

