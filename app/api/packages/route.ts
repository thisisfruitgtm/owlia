import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
      },
      orderBy: { price: "asc" },
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("GET packages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

