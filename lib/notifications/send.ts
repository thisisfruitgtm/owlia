import { prisma } from "@/lib/db/prisma";

interface NotificationData {
  userId: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
}

export async function sendNotification(data: NotificationData) {
  try {
    await prisma.notification.create({
      data,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { success: false, error };
  }
}

// Helper functions for common notifications
export async function notifyContractGenerated(userId: string, contractNumber: string) {
  return sendNotification({
    userId,
    type: "success",
    title: "Contract nou generat",
    message: `Contractul ${contractNumber} a fost generat și este disponibil pentru download în secțiunea Contracte.`,
  });
}

export async function notifyTimelineUpdate(userId: string, milestone: string) {
  return sendNotification({
    userId,
    type: "info",
    title: "Actualizare Timeline",
    message: `Milestone-ul "${milestone}" a fost actualizat. Vezi detalii în secțiunea Timeline.`,
  });
}

export async function notifyFileUploaded(userId: string, fileName: string) {
  return sendNotification({
    userId,
    type: "success",
    title: "Fișier nou",
    message: `Fișierul "${fileName}" a fost încărcat și este disponibil în secțiunea Fișiere.`,
  });
}

export async function notifyMilestoneCompleted(userId: string, milestone: string) {
  return sendNotification({
    userId,
    type: "success",
    title: "Milestone completat",
    message: `Felicitări! Milestone-ul "${milestone}" a fost finalizat cu succes.`,
  });
}

export async function notifyMilestoneStarted(userId: string, milestone: string) {
  return sendNotification({
    userId,
    type: "info",
    title: "Milestone început",
    message: `Echipa OWLIA a început lucrul la "${milestone}". Vei fi notificat când este completat.`,
  });
}

export async function notifyMessage(userId: string, subject: string, message: string) {
  return sendNotification({
    userId,
    type: "info",
    title: subject,
    message,
  });
}

