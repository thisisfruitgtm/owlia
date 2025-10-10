import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const createLeadSchema = z.object({
  email: z.string().email(),
  industry: z.string().optional(),
  revenue: z.number().optional(),
  targetClients: z.number().optional(),
  recommendedBudget: z.string().optional(),
});

const updateLeadSchema = z.object({
  leadId: z.string(),
  recommendedPackage: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createLeadSchema.parse(body);
    
    // Create lead
    const lead = await prisma.lead.create({
      data: {
        email: data.email,
        industry: data.industry,
        revenue: data.revenue,
        targetClients: data.targetClients,
        recommendedBudget: data.recommendedBudget,
        source: "calculator",
      },
    });
    
    return NextResponse.json({ leadId: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Calculator lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const data = updateLeadSchema.parse(body);
    
    // Update lead with recommended package
    await prisma.lead.update({
      where: { id: data.leadId },
      data: {
        recommendedPackage: data.recommendedPackage,
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
    
    console.error("Update lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

