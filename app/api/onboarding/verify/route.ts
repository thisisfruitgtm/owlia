import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token lipsește" },
        { status: 400 }
      );
    }

    // Hash token to match stored value
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find client by token
    const client = await prisma.client.findFirst({
      where: {
        onboardingToken: hashedToken,
        onboardingTokenExpires: {
          gte: new Date(), // Token not expired
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Token invalid sau expirat. Te rugăm să contactezi echipa OWLIA." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        email: client.user.email,
        companyName: client.companyName,
        cui: client.cui,
        regCom: client.regCom,
        address: client.address,
        legalRepName: client.legalRepName,
        legalRepRole: client.legalRepRole,
        phone: client.phone,
      },
    });
  } catch (error) {
    console.error("Verify onboarding token error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

