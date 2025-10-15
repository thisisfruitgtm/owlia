// Automated email sequence sender
import { prisma } from "@/lib/db/prisma";
import { resend } from "@/lib/email/resend";
import { guideDay3Template, guideDay7Template } from "./guideSequence";
import { calculatorDay3Template, calculatorDay5Template, calculatorDay7Template } from "./calculatorSequence";
import { packageDay2Template, packageDay5Template } from "./packageSequence";
import { trackServerEvent } from "@/lib/analytics/posthogBackend";

// Helper to check if email should be sent based on days since creation
function shouldSendEmail(createdAt: Date, daysToWait: number): boolean {
  const now = new Date();
  const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceCreation === daysToWait;
}

// Send guide sequence emails
export async function sendGuideSequenceEmails() {
  console.log("[CRON] Starting guide sequence emails...");
  
  try {
    // Find all guide accesses where lead hasn't converted
    const guideAccesses = await prisma.guideAccess.findMany({
      where: {
        emailSent: true, // Only for those who received initial email
        lead: {
          converted: false, // Only send to non-converted leads
        },
      },
      include: {
        lead: true,
      },
    });

    let day3Sent = 0;
    let day7Sent = 0;

    for (const access of guideAccesses) {
      const createdAt = access.createdAt;
      const email = access.email;
      const firstName = access.lead?.email.split('@')[0] || "";

      // Day 3 email
      if (shouldSendEmail(createdAt, 3)) {
        const template = guideDay3Template(firstName);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "guide",
          day: 3,
          access_id: access.id,
        });

        day3Sent++;
      }

      // Day 7 email
      if (shouldSendEmail(createdAt, 7)) {
        const template = guideDay7Template(firstName);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "guide",
          day: 7,
          access_id: access.id,
        });

        day7Sent++;
      }
    }

    console.log(`[CRON] Guide sequences: Day 3 sent: ${day3Sent}, Day 7 sent: ${day7Sent}`);
  } catch (error) {
    console.error("[CRON] Error sending guide sequence emails:", error);
  }
}

// Send calculator sequence emails
export async function sendCalculatorSequenceEmails() {
  console.log("[CRON] Starting calculator sequence emails...");
  
  try {
    // Find all calculator leads who haven't converted
    const leads = await prisma.lead.findMany({
      where: {
        source: "calculator",
        industry: { not: null },
        converted: false, // Only send to non-converted leads
      },
    });

    let day3Sent = 0;
    let day5Sent = 0;
    let day7Sent = 0;

    for (const lead of leads) {
      const createdAt = lead.createdAt;
      const email = lead.email;
      const firstName = email.split('@')[0];
      const industry = lead.industry || "default";
      const revenue = lead.revenue || 0;

      // Day 3 email (industry tips)
      if (shouldSendEmail(createdAt, 3)) {
        const template = calculatorDay3Template(firstName, industry);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "calculator",
          day: 3,
          lead_id: lead.id,
          industry,
        });

        day3Sent++;
      }

      // Day 5 email (urgency + social proof)
      if (shouldSendEmail(createdAt, 5)) {
        const template = calculatorDay5Template(firstName, revenue);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "calculator",
          day: 5,
          lead_id: lead.id,
        });

        day5Sent++;
      }

      // Day 7 email (final push with bonus)
      if (shouldSendEmail(createdAt, 7)) {
        const template = calculatorDay7Template(firstName);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "calculator",
          day: 7,
          lead_id: lead.id,
        });

        day7Sent++;
      }
    }

    console.log(`[CRON] Calculator sequences: Day 3: ${day3Sent}, Day 5: ${day5Sent}, Day 7: ${day7Sent}`);
  } catch (error) {
    console.error("[CRON] Error sending calculator sequence emails:", error);
  }
}

// Send package interest sequence emails
export async function sendPackageSequenceEmails() {
  console.log("[CRON] Starting package sequence emails...");
  
  try {
    // Find all package interest leads who haven't converted
    const leads = await prisma.lead.findMany({
      where: {
        packageInterest: { not: null },
        source: "package-modal",
        converted: false, // Only send to non-converted leads
      },
    });

    let day2Sent = 0;
    let day5Sent = 0;

    for (const lead of leads) {
      const createdAt = lead.createdAt;
      const email = lead.email;
      const firstName = email.split('@')[0];
      const packageName = lead.packageInterest || "Pachet Complet";
      const packagePrice = lead.recommendedBudget || "60,000";

      // Day 2 email (more details)
      if (shouldSendEmail(createdAt, 2)) {
        const template = packageDay2Template(firstName, packageName, packagePrice);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "package",
          day: 2,
          lead_id: lead.id,
          package_name: packageName,
        });

        day2Sent++;
      }

      // Day 5 email (testimonial + final push)
      if (shouldSendEmail(createdAt, 5)) {
        const template = packageDay5Template(firstName, packageName);
        
        await resend.emails.send({
          from: "OWLIA <noreply@owlia.ro>",
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });

        trackServerEvent(email, "sequence_email_sent", {
          sequence: "package",
          day: 5,
          lead_id: lead.id,
          package_name: packageName,
        });

        day5Sent++;
      }
    }

    console.log(`[CRON] Package sequences: Day 2: ${day2Sent}, Day 5: ${day5Sent}`);
  } catch (error) {
    console.error("[CRON] Error sending package sequence emails:", error);
  }
}

// Main function to run all sequences
export async function runAllEmailSequences() {
  console.log("[CRON] Starting all email sequences...");
  
  await sendGuideSequenceEmails();
  await sendCalculatorSequenceEmails();
  await sendPackageSequenceEmails();
  
  console.log("[CRON] All email sequences completed!");
}

