import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const trackingSchema = z.object({
  guideAccessId: z.string(),
  section: z.string(),
  timeSpent: z.number().min(0),
  scrollDepth: z.number().min(0).max(100),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = trackingSchema.parse(body);
    
    // Save tracking data
    await prisma.guideTracking.create({
      data: {
        guideAccessId: data.guideAccessId,
        section: data.section,
        timeSpent: data.timeSpent,
        scrollDepth: data.scrollDepth,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Guide tracking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

