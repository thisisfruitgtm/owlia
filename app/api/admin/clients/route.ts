import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { hash } from "bcrypt";
import { sendWelcomeEmail } from "@/lib/email/send";

const createClientSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minimum 2 caractere"),
  email: z.string().email("Email invalid"),
  phone: z.string().optional(),
  industry: z.string().min(1, "Industria este obligatorie"),
  revenue: z.number().min(0, "Venitul trebuie să fie pozitiv"),
  targetClients: z.number().min(1, "Numărul de clienți trebuie să fie pozitiv"),
  packageId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      include: {
        user: { select: { email: true } },
        package: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedClients = clients.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.user.email,
      phone: client.phone,
      industry: client.industry,
      revenue: client.revenue,
      targetClients: client.targetClients,
      status: client.status,
      packageName: client.package?.name || null,
      createdAt: client.createdAt.toISOString(),
    }));

    return NextResponse.json({ clients: formattedClients });
  } catch (error) {
    console.error("GET clients error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = createClientSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email-ul este deja folosit" },
        { status: 400 }
      );
    }

    // Generate random password
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(randomPassword, 12);

    // Create user and client in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "CLIENT",
          name: data.name,
        },
      });

      const client = await tx.client.create({
        data: {
          userId: user.id,
          name: data.name,
          phone: data.phone || null,
          industry: data.industry,
          revenue: data.revenue,
          targetClients: data.targetClients,
          packageId: data.packageId || null,
          status: "PENDING",
        },
        include: {
          package: { select: { name: true } },
        },
      });

      return { user, client, randomPassword };
    });

    // Send welcome email (don't fail if email fails)
    try {
      await sendWelcomeEmail(data.email, data.name);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        client: {
          id: result.client.id,
          name: result.client.name,
          email: result.user.email,
        },
        temporaryPassword: result.randomPassword,
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

    console.error("POST client error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

