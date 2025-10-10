import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendPackageInterestEmail } from "@/lib/email/send";

const packageLeadSchema = z.object({
  leadId: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  packageName: z.string(),
  packagePrice: z.string(),
  gdprConsent: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = packageLeadSchema.parse(body);
    
    if (!data.gdprConsent) {
      return NextResponse.json(
        { error: "GDPR consent is required" },
        { status: 400 }
      );
    }
    
    // Update existing lead or create new one
    if (data.leadId) {
      await prisma.lead.update({
        where: { id: data.leadId },
        data: {
          phone: data.phone,
          packageInterest: data.packageName,
          source: "package-modal",
        },
      });
    } else {
      await prisma.lead.create({
        data: {
          email: data.email,
          phone: data.phone,
          packageInterest: data.packageName,
          source: "package-modal",
        },
      });
    }
    
    // Send email to user
    await sendPackageInterestEmail(
      data.email,
      data.packageName,
      data.packagePrice,
      data.phone
    );
    
    // Generate WhatsApp URL
    const phoneNumber = "40123456789"; // Replace with actual number
    const message = `Bună! Sunt interesat de ${data.packageName} (${data.packagePrice} lei).\n\nEmail: ${data.email}${data.phone ? `\nTelefon: ${data.phone}` : ''}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    return NextResponse.json({ success: true, whatsappUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Package lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

