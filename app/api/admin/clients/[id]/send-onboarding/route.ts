import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get client
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Generate unique token (valid for 7 days)
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Update client with token
    await prisma.client.update({
      where: { id },
      data: {
        onboardingToken: hashedToken,
        onboardingTokenExpires: expiresAt,
      },
    });

    // Generate onboarding link
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const onboardingUrl = `${baseUrl}/onboarding/${token}`;

    // Send email
    await resend.emails.send({
      from: "OWLIA <noreply@owlia.ro>",
      to: client.user.email,
      subject: "Completează datele companiei tale - OWLIA",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F5F0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #00288B; font-size: 32px; margin: 0;">OWLIA</h1>
      <p style="color: #666666; margin: 10px 0 0 0;">Branding & Marketing Digital</p>
    </div>

    <!-- Main Content -->
    <div style="background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #00288B; font-size: 24px; margin: 0 0 20px 0;">Bună, ${client.name}!</h2>
      
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Bine ai venit în echipa OWLIA! 🎉
      </p>

      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Pentru a continua colaborarea și a genera contractul tău, avem nevoie de câteva informații despre compania ta.
      </p>

      <div style="background-color: #F5F5F0; border-radius: 12px; padding: 20px; margin: 30px 0;">
        <p style="color: #00288B; font-weight: bold; margin: 0 0 10px 0;">Informații necesare:</p>
        <ul style="color: #666666; margin: 0; padding-left: 20px;">
          <li>Denumire companie completă</li>
          <li>CUI și Reg. Com.</li>
          <li>Adresa sediului social</li>
          <li>Date reprezentant legal</li>
          <li>Telefon de contact</li>
        </ul>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${onboardingUrl}" style="display: inline-block; background-color: #00288B; color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: bold; font-size: 16px;">
          Completează Datele
        </a>
      </div>

      <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
        Acest link este valabil 7 zile. Dacă ai întrebări, răspunde la acest email sau contactează-ne la 
        <a href="mailto:contact@owlia.ro" style="color: #00288B;">contact@owlia.ro</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px;">
      <p style="color: #999999; font-size: 12px; margin: 0;">
        © 2025 OWLIA - Echipa ta de Marketing
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email de onboarding trimis cu succes",
        expiresAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send onboarding email error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

