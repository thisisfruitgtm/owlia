import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { logSecurityEvent } from "@/lib/security/logger";

const createPackageSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
  price: z.number().min(0, "Prețul trebuie să fie pozitiv"),
  features: z.array(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  })).min(1, "Pachetul trebuie să aibă cel puțin un serviciu"),
  active: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = createPackageSchema.parse(body);

    // Create package with empty timeline (will be generated later)
    const packageData = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        priceMonthly: null,
        description: `Pachet custom creat pentru client specific`,
        features: data.features,
        timeline: [], // Empty timeline - will be populated later
        active: data.active,
      },
    });

    // Log security event
    await logSecurityEvent({
      eventType: "PACKAGE_CREATED",
      severity: "INFO",
      userId: session.user.id,
      email: session.user.email,
      description: `Pachet custom creat: ${data.name} - ${data.price} RON`,
      metadata: {
        packageId: packageData.id,
        packageName: data.name,
        price: data.price,
        featuresCount: data.features.length,
      },
    });

    return NextResponse.json(
      {
        success: true,
        package: {
          id: packageData.id,
          name: packageData.name,
          price: packageData.price,
          features: packageData.features,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Create custom package error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

