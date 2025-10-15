import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendCalculatorResultEmail } from "@/lib/email/send";
import { trackServerEvent, identifyUser } from "@/lib/analytics/posthogBackend";

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
  packageName: z.string().optional(),
  packageInfo: z.string().optional(),
  minBudget: z.number().optional(),
  maxBudget: z.number().optional(),
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
    
    // Track lead creation in PostHog (server-side)
    identifyUser(data.email, {
      email: data.email,
      industry: data.industry,
      revenue: data.revenue,
      target_clients: data.targetClients,
      lead_source: "calculator",
      lead_id: lead.id,
      created_at: new Date().toISOString(),
    });
    
    trackServerEvent(data.email, "lead_created_server", {
      lead_id: lead.id,
      source: "calculator",
      industry: data.industry,
      revenue: data.revenue,
      target_clients: data.targetClients,
      recommended_budget: data.recommendedBudget,
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
    const lead = await prisma.lead.update({
      where: { id: data.leadId },
      data: {
        recommendedPackage: data.recommendedPackage,
      },
    });
    
    // Send email with calculator result
    if (data.packageName && data.packageInfo && data.minBudget && data.maxBudget && lead.industry && lead.revenue) {
      await sendCalculatorResultEmail(
        lead.email,
        data.minBudget,
        data.maxBudget,
        data.packageName,
        data.packageInfo,
        lead.industry,
        lead.revenue
      );
      
      // Track email sent
      trackServerEvent(lead.email, "calculator_email_sent", {
        lead_id: lead.id,
        package_name: data.packageName,
        budget_min: data.minBudget,
        budget_max: data.maxBudget,
      });
    }
    
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

