import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { logSecurityEvent } from "@/lib/security/logger";

const addLeadSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
  email: z.string().email("Email invalid"),
  phone: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  revenue: z.number().nullable().optional(),
  targetClients: z.number().nullable().optional(),
  source: z.string().default("recomandare"),
  notes: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = addLeadSchema.parse(body);

    // Check if lead with this email already exists
    const existingLead = await prisma.lead.findFirst({
      where: {
        email: data.email,
        converted: false,
      },
    });

    if (existingLead) {
      return NextResponse.json(
        { error: "Un lead cu acest email există deja" },
        { status: 400 }
      );
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        industry: data.industry,
        revenue: data.revenue,
        targetClients: data.targetClients,
        source: data.source,
        recommendedBudget: null,
        recommendedPackage: null,
        packageInterest: null,
        converted: false,
      },
    });

    // Log security event
    await logSecurityEvent({
      eventType: "LEAD_ADDED_MANUAL",
      severity: "INFO",
      userId: session.user.id,
      email: session.user.email,
      description: `Lead manual adăugat: ${data.name} (${data.email}) - Sursă: ${data.source}`,
      metadata: {
        leadId: lead.id,
        leadEmail: data.email,
        leadName: data.name,
        source: data.source,
        notes: data.notes,
      },
    });

    return NextResponse.json(
      {
        success: true,
        lead: {
          id: lead.id,
          email: lead.email,
          name: lead.name,
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

    console.error("Add manual lead error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

