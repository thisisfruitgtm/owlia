import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { notifyMilestoneCompleted, notifyMilestoneStarted } from "@/lib/notifications/send";

const updateTimelineSchema = z.object({
  month: z.number().min(1).max(12).optional(),
  milestone: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"]).optional(),
  dueDate: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; timelineId: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, timelineId } = await params;
    const body = await request.json();
    const data = updateTimelineSchema.parse(body);

    // Get current timeline item
    const currentTimeline = await prisma.timeline.findUnique({
      where: { id: timelineId },
      include: {
        client: {
          include: { user: true },
        },
      },
    });

    if (!currentTimeline) {
      return NextResponse.json(
        { error: "Timeline not found" },
        { status: 404 }
      );
    }

    // Update timeline
    const timeline = await prisma.timeline.update({
      where: { id: timelineId },
      data: {
        ...(data.month && { month: data.month }),
        ...(data.milestone && { milestone: data.milestone }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.dueDate !== undefined && {
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        }),
        ...(data.status === "COMPLETED" && { completedAt: new Date() }),
      },
    });

    // Send notifications based on status change
    if (data.status && data.status !== currentTimeline.status) {
      if (data.status === "COMPLETED") {
        await notifyMilestoneCompleted(
          currentTimeline.client.userId,
          currentTimeline.milestone
        );
      } else if (data.status === "IN_PROGRESS") {
        await notifyMilestoneStarted(
          currentTimeline.client.userId,
          currentTimeline.milestone
        );
      }
    }

    return NextResponse.json({ success: true, timeline });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("PATCH timeline error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; timelineId: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { timelineId } = await params;

    await prisma.timeline.delete({
      where: { id: timelineId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE timeline error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

