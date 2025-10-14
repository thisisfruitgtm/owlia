import { prisma } from "@/lib/db/prisma";
import { sendEmail } from "@/lib/email/send";

export async function checkAndSendDeadlineReminders() {
  try {
    const today = new Date();
    const in7Days = new Date(today);
    in7Days.setDate(in7Days.getDate() + 7);

    // Find milestones due in 7 days that are not completed
    const upcomingMilestones = await prisma.timeline.findMany({
      where: {
        status: {
          in: ["PENDING", "IN_PROGRESS"],
        },
        dueDate: {
          gte: today,
          lte: in7Days,
        },
      },
      include: {
        client: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log(`Found ${upcomingMilestones.length} upcoming milestones`);

    for (const milestone of upcomingMilestones) {
      const daysUntilDue = Math.ceil(
        (new Date(milestone.dueDate!).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Send email reminder
      await sendEmail({
        to: milestone.client.user.email,
        subject: `Reminder: ${milestone.milestone} - Scadență în ${daysUntilDue} zile`,
        html: deadlineReminderTemplate(
          milestone.client.name,
          milestone.client.id,
          milestone.milestone,
          milestone.description || "",
          daysUntilDue,
          new Date(milestone.dueDate!).toLocaleDateString("ro-RO")
        ),
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId: milestone.client.userId,
          type: "warning",
          title: `Reminder: ${milestone.milestone}`,
          message: `Scadență în ${daysUntilDue} zile (${new Date(milestone.dueDate!).toLocaleDateString("ro-RO")}). ${milestone.description || ""}`,
        },
      });

      console.log(`✅ Sent reminder for ${milestone.milestone} to ${milestone.client.name}`);
    }

    return { success: true, count: upcomingMilestones.length };
  } catch (error) {
    console.error("Deadline reminders error:", error);
    return { success: false, error };
  }
}

function deadlineReminderTemplate(
  clientName: string,
  clientId: string,
  milestone: string,
  description: string,
  daysUntil: number,
  dueDate: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; background-color: #F5F5F0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #0A2540 0%, #1a4d7a 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Reminder Milestone</h1>
    </div>
    
    <div style="padding: 40px 30px;">
      <h2 style="color: #0A2540; margin: 0 0 20px 0;">Bună, ${clientName}!</h2>
      
      <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
        Te informăm că următorul milestone al proiectului tău se apropie de scadență:
      </p>

      <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: #0A2540; margin: 0 0 10px 0; font-size: 20px;">${milestone}</h3>
        ${description ? `<p style="color: #666; margin: 0 0 15px 0;">${description}</p>` : ''}
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div>
            <div style="font-size: 12px; color: #999; text-transform: uppercase;">Scadență</div>
            <div style="font-size: 18px; font-weight: bold; color: #0A2540;">${dueDate}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #999; text-transform: uppercase;">Timp Rămas</div>
            <div style="font-size: 18px; font-weight: bold; color: #F59E0B;">${daysUntil} ${daysUntil === 1 ? 'zi' : 'zile'}</div>
          </div>
        </div>
      </div>

      <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
        Dacă ai întrebări sau ai nevoie de asistență, nu ezita să ne contactezi.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXTAUTH_URL}/client/${clientId}/timeline" 
           style="display: inline-block; background: #0A2540; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold;">
          Vezi Timeline Complet
        </a>
      </div>

      <p style="color: #666; margin-top: 30px;">
        Cu drag,<br>
        <strong style="color: #0A2540;">Echipa OWLIA</strong>
      </p>
    </div>

    <div style="background: #F5F5F0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
      © 2025 OWLIA. Toate drepturile rezervate.
    </div>
  </div>
</body>
</html>
  `.trim();
}

