import { NextRequest, NextResponse } from "next/server";
import { runAllEmailSequences } from "@/lib/email/sequences/sendSequences";

// This endpoint should be called by a cron job (Coolify, Vercel Cron, or external service)
// Run once per day at 9 AM

export async function GET(request: NextRequest) {
  try {
    // Security check - validate cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("[CRON] Starting email sequences job...");

    // Run all email sequences
    await runAllEmailSequences();

    return NextResponse.json({ 
      success: true,
      message: "Email sequences processed successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[CRON] Email sequences error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

