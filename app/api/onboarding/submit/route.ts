import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import crypto from "crypto";
import { notifyTimelineUpdate } from "@/lib/notifications/send";

const submitDataSchema = z.object({
  token: z.string().min(1),
  companyName: z.string().min(2, "Denumirea companiei este obligatorie"),
  cui: z.string().min(2, "CUI este obligatoriu"),
  regCom: z.string().min(2, "Reg. Com. este obligatoriu"),
  address: z.string().min(5, "Adresa completă este obligatorie"),
  legalRepName: z.string().min(2, "Numele reprezentantului legal este obligatoriu"),
  legalRepRole: z.string().min(2, "Funcția reprezentantului este obligatorie"),
  phone: z.string().min(10, "Telefonul este obligatoriu"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = submitDataSchema.parse(body);

    // Hash token to match stored value
    const hashedToken = crypto.createHash("sha256").update(data.token).digest("hex");

    // Find client by token
    const client = await prisma.client.findFirst({
      where: {
        onboardingToken: hashedToken,
        onboardingTokenExpires: {
          gte: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Token invalid sau expirat" },
        { status: 404 }
      );
    }

    // Update client with company data
    const updatedClient = await prisma.client.update({
      where: { id: client.id },
      data: {
        companyName: data.companyName,
        cui: data.cui,
        regCom: data.regCom,
        address: data.address,
        legalRepName: data.legalRepName,
        legalRepRole: data.legalRepRole,
        phone: data.phone,
        status: "ACTIVE", // Mark as active now that onboarding is complete
        onboardingToken: null, // Invalidate token after use
        onboardingTokenExpires: null,
      },
    });

    // Send notification
    try {
      await notifyTimelineUpdate(
        client.userId,
        "Date companie completate! Contractul tău va fi generat în curând."
      );
    } catch (error) {
      console.error("Failed to send notification:", error);
    }

    return NextResponse.json(
      {
        success: true,
        client: {
          id: updatedClient.id,
          name: updatedClient.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Submit onboarding data error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

