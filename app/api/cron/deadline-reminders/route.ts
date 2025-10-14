import { NextRequest, NextResponse } from "next/server";
import { checkAndSendDeadlineReminders } from "@/lib/cron/deadlineReminders";

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "change-this-secret";

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await checkAndSendDeadlineReminders();

    return NextResponse.json({
      success: true,
      remindersSent: result.count || 0,
    });
  } catch (error) {
    console.error("Cron deadline reminders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

