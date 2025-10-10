import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { headers } from "next/headers";

const guideAccessSchema = z.object({
  email: z.string().email(),
  gdprConsent: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = guideAccessSchema.parse(body);
    
    if (!data.gdprConsent) {
      return NextResponse.json(
        { error: "GDPR consent is required" },
        { status: 400 }
      );
    }
    
    // Get user info
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Find or create lead
    let lead = await prisma.lead.findFirst({
      where: { email: data.email },
    });
    
    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          email: data.email,
          source: "guide",
        },
      });
    }
    
    // Create guide access record
    const guideAccess = await prisma.guideAccess.create({
      data: {
        leadId: lead.id,
        email: data.email,
        gdprConsent: data.gdprConsent,
        ipAddress,
        userAgent,
      },
    });
    
    // TODO: Send email with PDF using Resend
    // This will be implemented in the next step
    
    return NextResponse.json({ 
      success: true,
      guideAccessId: guideAccess.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Guide access API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

