import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // This is a trigger endpoint - in production, backups should be configured in Coolify
    // This endpoint logs the backup request for monitoring purposes
    console.log("Manual backup triggered by:", session.user.email);
    console.log("Timestamp:", new Date().toISOString());

    // In a real scenario with pg_dump access, you could do:
    // const databaseUrl = process.env.DATABASE_URL;
    // await execAsync(`pg_dump ${databaseUrl} > backup-${Date.now()}.sql`);

    // For now, we just return success and recommend Coolify configuration
    return NextResponse.json({
      success: true,
      message:
        "Backup trigger logged. Configure automated backups in Coolify for production use.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Backup trigger error:", error);
    return NextResponse.json(
      { error: "Failed to trigger backup" },
      { status: 500 }
    );
  }
}

