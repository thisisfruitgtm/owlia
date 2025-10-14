import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { logSecurityEvent } from "@/lib/security/logger";

const updateSettingSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.setting.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = updateSettingSchema.parse(body);

    // Update all settings in transaction
    await prisma.$transaction(
      data.settings.map((setting) =>
        prisma.setting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: {
            key: setting.key,
            value: setting.value,
            description: `Setting for ${setting.key}`,
          },
        })
      )
    );

    // Log settings change
    await logSecurityEvent({
      eventType: "SETTINGS_CHANGED",
      severity: "INFO",
      userId: session.user.id || undefined,
      email: session.user.email || undefined,
      description: `Settings updated: ${data.settings.length} setting(s) modified by ${session.user.email || 'admin'}`,
      metadata: {
        settingsChanged: data.settings.map((s) => s.key),
        changedBy: session.user.email || 'admin',
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

    console.error("PATCH settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
