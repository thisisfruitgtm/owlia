import { prisma } from "@/lib/db/prisma";

export type SecurityEventType =
  | "FAILED_LOGIN"
  | "SUCCESSFUL_LOGIN"
  | "UNAUTHORIZED_ACCESS"
  | "FILE_UPLOAD"
  | "CONTRACT_GENERATED"
  | "INVOICE_EMITED"
  | "LEAD_ADDED_MANUAL"
  | "PACKAGE_CREATED"
  | "SETTINGS_CHANGED"
  | "PASSWORD_CHANGED"
  | "SUSPICIOUS_ACTIVITY";

export type SecurityEventSeverity = "INFO" | "WARNING" | "CRITICAL";

interface LogSecurityEventParams {
  eventType: SecurityEventType;
  severity?: SecurityEventSeverity;
  userId?: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
  description: string;
  metadata?: any;
}

export async function logSecurityEvent(params: LogSecurityEventParams) {
  try {
    await prisma.securityLog.create({
      data: {
        eventType: params.eventType,
        severity: params.severity || "INFO",
        userId: params.userId,
        email: params.email,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        description: params.description,
        metadata: params.metadata || null,
      },
    });
  } catch (error) {
    console.error("Failed to log security event:", error);
    // Don't throw - logging should never break the app
  }
}

export async function getSecurityLogs(limit = 100) {
  try {
    return await prisma.securityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("Failed to get security logs:", error);
    return [];
  }
}

export async function getSecurityStats() {
  try {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [failedLogins24h, failedLogins7d, criticalEvents, totalEvents] =
      await Promise.all([
        prisma.securityLog.count({
          where: {
            eventType: "FAILED_LOGIN",
            createdAt: { gte: last24h },
          },
        }),
        prisma.securityLog.count({
          where: {
            eventType: "FAILED_LOGIN",
            createdAt: { gte: last7d },
          },
        }),
        prisma.securityLog.count({
          where: { severity: "CRITICAL" },
        }),
        prisma.securityLog.count(),
      ]);

    return {
      failedLogins24h,
      failedLogins7d,
      criticalEvents,
      totalEvents,
    };
  } catch (error) {
    console.error("Failed to get security stats:", error);
    return {
      failedLogins24h: 0,
      failedLogins7d: 0,
      criticalEvents: 0,
      totalEvents: 0,
    };
  }
}

