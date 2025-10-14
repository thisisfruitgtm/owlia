import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { hash } from "bcrypt";
import { sendWelcomeEmail } from "@/lib/email/send";

const convertLeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().nullable().optional(),
  industry: z.string().min(1),
  revenue: z.number().min(0),
  targetClients: z.number().min(1),
});

export async function POST(
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
    const data = convertLeadSchema.parse(body);

    // Get lead
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (lead.converted) {
      return NextResponse.json(
        { error: "Lead-ul este deja convertit" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: lead.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email-ul este deja folosit de un alt utilizator" },
        { status: 400 }
      );
    }

    // Generate random password
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase();
    const hashedPassword = await hash(randomPassword, 12);

    // Create user and client in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: lead.email,
          password: hashedPassword,
          role: "CLIENT",
          name: data.name,
        },
      });

      const client = await tx.client.create({
        data: {
          userId: user.id,
          name: data.name,
          phone: data.phone,
          industry: data.industry,
          revenue: data.revenue,
          targetClients: data.targetClients,
          status: "PENDING",
        },
      });

      // Mark lead as converted
      await tx.lead.update({
        where: { id },
        data: {
          converted: true,
          clientId: client.id,
        },
      });

      return { user, client, randomPassword };
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(lead.email, data.name, result.client.id);
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

    console.error("Convert lead error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

