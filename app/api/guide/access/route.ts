import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendGuideDownloadEmail } from "@/lib/email/send";
import { headers } from "next/headers";
import { trackServerEvent, identifyUser } from "@/lib/analytics/posthogBackend";

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
      
      // Identify new user
      identifyUser(data.email, {
        email: data.email,
        lead_source: "guide",
        lead_id: lead.id,
      });
      
      // Track new lead from guide
      trackServerEvent(data.email, "lead_created_server", {
        lead_id: lead.id,
        source: "guide",
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
    
    // Track guide access
    trackServerEvent(data.email, "guide_access_granted", {
      lead_id: lead.id,
      access_id: guideAccess.id,
      ip_address: ipAddress,
    });
    
    // Generate download URL
    const downloadUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/guide/download/${guideAccess.id}`;
    
    // Send email with download link
    try {
      await sendGuideDownloadEmail(data.email, downloadUrl);
      
      // Mark email as sent
      await prisma.guideAccess.update({
        where: { id: guideAccess.id },
        data: { emailSent: true },
      });
      
      // Track email sent
      trackServerEvent(data.email, "guide_email_sent", {
        lead_id: lead.id,
        access_id: guideAccess.id,
      });
    } catch (emailError) {
      console.error("Failed to send guide email:", emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ 
      success: true,
      guideAccessId: guideAccess.id,
      downloadUrl,
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

