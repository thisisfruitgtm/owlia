import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

const createPackageSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  priceMonthly: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
  })),
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

    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        priceMonthly: data.priceMonthly,
        description: data.description,
        features: data.features,
        timeline: [], // Empty timeline template
        active: data.active,
      },
    });

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("POST package error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

