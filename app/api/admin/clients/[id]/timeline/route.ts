import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { notifyTimelineUpdate, notifyMilestoneStarted, notifyMilestoneCompleted } from "@/lib/notifications/send";

const createTimelineSchema = z.object({
  month: z.number().min(1).max(12),
  milestone: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"]),
  dueDate: z.string().optional(),
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

    const timeline = await prisma.timeline.findMany({
      where: { clientId: id },
      orderBy: { month: "asc" },
    });

    return NextResponse.json({ timeline });
  } catch (error) {
    console.error("GET timeline error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const data = createTimelineSchema.parse(body);

    // Get client for notification
    const client = await prisma.client.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    const timeline = await prisma.timeline.create({
      data: {
        clientId: id,
        month: data.month,
        milestone: data.milestone,
        description: data.description || null,
        status: data.status,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    // Send notification
    await notifyTimelineUpdate(client.userId, data.milestone);

    return NextResponse.json({ success: true, timeline }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("POST timeline error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

