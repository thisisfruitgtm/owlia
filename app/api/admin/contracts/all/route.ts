import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const contracts = await prisma.contract.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ contracts });
    
  } catch (error) {
    console.error("Contracts fetch API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

