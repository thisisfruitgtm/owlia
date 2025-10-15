/**
 * PostHog Server-Side API
 * Requires POSTHOG_PERSONAL_API_KEY from PostHog Settings → Personal API Keys
 */

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

interface PostHogInsightResponse {
  result?: Array<{
    data: number[];
    labels: string[];
    days: string[];
  }>;
}

export async function getPostHogInsights(query: any) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    console.warn("PostHog API key or project ID not configured for server-side analytics");
    return null;
  }

  try {
    const response = await fetch(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/insights/trend/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${POSTHOG_API_KEY}`,
        },
        body: JSON.stringify(query),
      }
    );

    if (!response.ok) {
      console.error("PostHog API error:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("PostHog API request failed:", error);
    return null;
  }
}

/**
 * Get pageview count for last N days
 */
export async function getPageviews(days = 30) {
  const result = await getPostHogInsights({
    events: [{ id: "$pageview", type: "events" }],
    date_from: `-${days}d`,
    date_to: null,
  });

  if (!result?.result?.[0]?.data) {
    return { total: 0, trend: [] };
  }

  const data = result.result[0].data;
  const total = data.reduce((sum: number, val: number) => sum + val, 0);

  return {
    total,
    trend: data,
    labels: result.result[0].days || [],
  };
}

/**
 * Get top pages by pageviews
 */
export async function getTopPages(limit = 10) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return [];
  }

  try {
    const response = await fetch(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/events/?event=$pageview&limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${POSTHOG_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    // Count pages
    const pageCounts: Record<string, number> = {};
    data.results?.forEach((event: any) => {
      const path = event.properties?.$current_url || event.properties?.$pathname || "Unknown";
      pageCounts[path] = (pageCounts[path] || 0) + 1;
    });

    // Sort and limit
    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([page, count]) => ({ page, count }));
  } catch (error) {
    console.error("Failed to fetch top pages:", error);
    return [];
  }
}

/**
 * Get active users count
 */
export async function getActiveUsers(days = 30) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return 0;
  }

  try {
    const response = await fetch(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/persons/?limit=1`,
      {
        headers: {
          Authorization: `Bearer ${POSTHOG_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error("Failed to fetch active users:", error);
    return 0;
  }
}

/**
 * Get session count for last N days
 */
export async function getSessions(days = 30) {
  const result = await getPostHogInsights({
    events: [{ id: "$pageview", type: "events", math: "unique_session" }],
    date_from: `-${days}d`,
    date_to: null,
  });

  if (!result?.result?.[0]?.data) {
    return { total: 0, trend: [] };
  }

  const data = result.result[0].data;
  const total = data.reduce((sum: number, val: number) => sum + val, 0);

  return {
    total,
    trend: data,
    labels: result.result[0].days || [],
  };
}

/**
 * Get complete traffic analytics
 */
export async function getTrafficAnalytics() {
  const [pageviews, sessions, topPages, activeUsers] = await Promise.all([
    getPageviews(30),
    getSessions(30),
    getTopPages(10),
    getActiveUsers(30),
  ]);

  return {
    pageviews,
    sessions,
    topPages,
    activeUsers,
  };
}

