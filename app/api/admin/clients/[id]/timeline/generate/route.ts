import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { notifyTimelineUpdate } from "@/lib/notifications/send";

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

    // Get client with package
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        user: true,
        package: true,
        contracts: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    if (!client.package) {
      return NextResponse.json(
        { error: "Client nu are pachet asignat" },
        { status: 400 }
      );
    }

    // Get timeline template from package
    const timelineTemplate = client.package.timeline as any[];

    if (!timelineTemplate || timelineTemplate.length === 0) {
      return NextResponse.json(
        { error: "Pachetul nu are timeline template" },
        { status: 400 }
      );
    }

    // Get start date from contract or use today
    let startDate = new Date();
    if (client.contracts.length > 0 && client.contracts[0].data) {
      const contractData = client.contracts[0].data as any;
      if (contractData.contractDate) {
        // Parse Romanian date format
        const parts = contractData.contractDate.split(".");
        if (parts.length === 3) {
          startDate = new Date(
            parseInt(parts[2]),
            parseInt(parts[1]) - 1,
            parseInt(parts[0])
          );
        }
      }
    }

    // Delete existing timeline
    await prisma.timeline.deleteMany({
      where: { clientId: id },
    });

    // Create timeline items with calculated due dates
    const timelineItems = timelineTemplate.map((item: any, index: number) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + item.month);

      return {
        clientId: id,
        month: item.month,
        milestone: item.milestone,
        description: item.description || null,
        status: index === 0 ? "IN_PROGRESS" : "PENDING",
        dueDate,
      };
    });

    await prisma.timeline.createMany({
      data: timelineItems,
    });

    // Notify client
    await notifyTimelineUpdate(
      client.userId,
      `Timeline generat cu ${timelineItems.length} milestone-uri`
    );

    return NextResponse.json({
      success: true,
      count: timelineItems.length,
    });
  } catch (error) {
    console.error("Generate timeline error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

