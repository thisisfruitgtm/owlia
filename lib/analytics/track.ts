import { posthog } from "./posthog";

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture(eventName, properties);
  }
};

// Predefined events
export const analytics = {
  // Lead events
  calculatorSubmit: (data: {
    industry: string;
    revenue: number;
    targetClients: number;
    budget: string;
  }) => {
    trackEvent("calculator_submit", data);
  },

  packageInterest: (data: { packageName: string; email: string }) => {
    trackEvent("package_interest", data);
  },

  guideDownload: (email: string) => {
    trackEvent("guide_download", { email });
  },

  customPackageConfigured: (data: {
    totalPrice: number;
    featuresCount: number;
    features: string[];
  }) => {
    trackEvent("custom_package_configured", data);
  },

  // Auth events
  login: (role: string) => {
    trackEvent("user_login", { role });
  },

  logout: () => {
    trackEvent("user_logout");
  },

  // Admin events
  clientCreated: (clientId: string) => {
    trackEvent("admin_client_created", { clientId });
  },

  contractGenerated: (data: {
    contractId: string;
    clientId: string;
    packageName: string;
  }) => {
    trackEvent("admin_contract_generated", data);
  },

  fileUploaded: (data: { fileName: string; fileSize: number; clientId: string }) => {
    trackEvent("admin_file_uploaded", data);
  },

  timelineGenerated: (clientId: string) => {
    trackEvent("admin_timeline_generated", { clientId });
  },

  leadConverted: (data: { leadId: string; clientId: string }) => {
    trackEvent("admin_lead_converted", data);
  },

  // Client events
  notificationViewed: (notificationId: string) => {
    trackEvent("client_notification_viewed", { notificationId });
  },

  fileDownloaded: (data: { fileId: string; fileName: string }) => {
    trackEvent("client_file_downloaded", data);
  },

  contractViewed: (contractId: string) => {
    trackEvent("client_contract_viewed", { contractId });
  },
};

// Identify user for PostHog
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.identify(userId, traits);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (typeof window !== "undefined" && posthog) {
    posthog.reset();
  }
};

