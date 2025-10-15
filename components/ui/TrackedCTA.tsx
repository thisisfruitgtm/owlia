"use client";

import Link from "next/link";
import { posthog } from "@/lib/analytics/posthog";
import { ReactNode } from "react";

interface TrackedCTAProps {
  href: string;
  children: ReactNode;
  className?: string;
  eventName?: string;
  eventProperties?: Record<string, any>;
  external?: boolean;
}

export default function TrackedCTA({
  href,
  children,
  className = "",
  eventName = "cta_clicked",
  eventProperties = {},
  external = false,
}: TrackedCTAProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture(eventName, {
        cta_location: window.location.pathname,
        cta_destination: href,
        ...eventProperties,
      });
    }
  };

  if (external) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

