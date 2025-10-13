import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import bcrypt from "bcrypt";

const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  industry: z.string().min(1).optional(),
  revenue: z.number().min(0).optional(),
  targetClients: z.number().min(1).optional(),
  packageId: z.string().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "COMPLETED"]).optional(),
  companyName: z.string().optional(),
  cui: z.string().optional(),
  regCom: z.string().optional(),
  address: z.string().optional(),
  legalRepName: z.string().optional(),
  legalRepRole: z.string().optional(),
  newPassword: z.string().min(6).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { newPassword, ...data } = updateClientSchema.parse(body);

    // Update client
    const client = await prisma.client.update({
      where: { id },
      data,
      include: {
        user: { select: { email: true, id: true } },
        package: { select: { name: true } },
      },
    });

    // Update password if provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id: client.user.id },
        data: { password: hashedPassword },
      });
    }

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Delete client (will cascade delete user due to onDelete: Cascade)
    await prisma.client.delete({
      where: { id },
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

