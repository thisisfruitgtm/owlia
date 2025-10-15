// Helper function to convert a lead to a client
import { prisma } from "@/lib/db/prisma";
import { trackServerEvent } from "@/lib/analytics/posthogBackend";

/**
 * Mark a lead as converted when they become a client
 * This stops all email sequences for this lead
 */
export async function convertLead(leadId: string, clientId: string) {
  try {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        converted: true,
        clientId: clientId,
      },
    });

    // Track conversion in PostHog
    trackServerEvent(lead.email, "lead_converted", {
      lead_id: leadId,
      client_id: clientId,
      source: lead.source,
      industry: lead.industry,
      revenue: lead.revenue,
      days_to_convert: Math.floor(
        (new Date().getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      ),
    });

    console.log(`[LEAD] Converted lead ${leadId} to client ${clientId}`);
    return lead;
  } catch (error) {
    console.error("[LEAD] Error converting lead:", error);
    throw error;
  }
}

/**
 * Find lead by email and mark as converted
 * Use this when creating a new client from a lead
 */
export async function convertLeadByEmail(email: string, clientId: string) {
  try {
    // Find the most recent lead with this email
    const lead = await prisma.lead.findFirst({
      where: { 
        email,
        converted: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!lead) {
      console.log(`[LEAD] No unconverted lead found for email: ${email}`);
      return null;
    }

    return await convertLead(lead.id, clientId);
  } catch (error) {
    console.error("[LEAD] Error converting lead by email:", error);
    throw error;
  }
}

