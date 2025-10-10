import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  industry: z.string().min(1).optional(),
  revenue: z.number().min(0).optional(),
  targetClients: z.number().min(1).optional(),
  packageId: z.string().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "COMPLETED"]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, email: true, name: true, createdAt: true } },
        package: true,
        timeline: { orderBy: { month: "asc" } },
        contracts: { orderBy: { createdAt: "desc" } },
        files: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error("GET client error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = updateClientSchema.parse(body);

    const client = await prisma.client.update({
      where: { id: params.id },
      data,
      include: {
        user: { select: { email: true } },
        package: { select: { name: true } },
      },
    });

    return NextResponse.json({ success: true, client });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("PATCH client error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete client (will cascade delete user due to onDelete: Cascade)
    await prisma.client.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE client error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

