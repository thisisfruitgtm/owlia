import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { getSecurityLogs, getSecurityStats } from "@/lib/security/logger";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent security logs
    const recentLogs = await getSecurityLogs(20);

    // Get security statistics
    const stats = await getSecurityStats();

    // Check environment variables
    const envChecks = {
      nextauthSecret: !!process.env.NEXTAUTH_SECRET,
      nextauthUrl: !!process.env.NEXTAUTH_URL,
      databaseUrl: !!process.env.DATABASE_URL,
      resendApiKey: !!process.env.RESEND_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    };

    // Check security headers (from request)
    const securityHeaders = {
      https: request.url.startsWith("https://"),
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    return NextResponse.json({
      stats,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        eventType: log.eventType,
        severity: log.severity,
        email: log.email,
        description: log.description,
        createdAt: log.createdAt,
      })),
      checks: {
        env: envChecks,
        security: securityHeaders,
      },
    });
  } catch (error) {
    console.error("GET security audit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

