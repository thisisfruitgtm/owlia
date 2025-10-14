import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clients analytics
    const [
      totalClients,
      activeClients,
      pendingClients,
      completedClients,
      clientsByPackage,
    ] = await Promise.all([
      prisma.client.count(),
      prisma.client.count({ where: { status: "ACTIVE" } }),
      prisma.client.count({ where: { status: "PENDING" } }),
      prisma.client.count({ where: { status: "COMPLETED" } }),
      prisma.client.groupBy({
        by: ["packageId"],
        _count: true,
      }),
    ]);

    // Get package names
    const packageCounts: Record<string, number> = {};
    for (const item of clientsByPackage) {
      if (item.packageId) {
        const pkg = await prisma.package.findUnique({
          where: { id: item.packageId },
          select: { name: true },
        });
        packageCounts[pkg?.name || "Unknown"] = item._count;
      } else {
        packageCounts["Fără pachet"] = item._count;
      }
    }

    // Leads analytics
    const [totalLeads, convertedLeads, leadsBySource] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { converted: true } }),
      prisma.lead.groupBy({
        by: ["source"],
        _count: true,
      }),
    ]);

    const sourceCount: Record<string, number> = {};
    leadsBySource.forEach((item) => {
      sourceCount[item.source || "unknown"] = item._count;
    });

    // Contracts analytics
    const [totalContracts, draftContracts, sentContracts, signedContracts] =
      await Promise.all([
        prisma.contract.count(),
        prisma.contract.count({ where: { status: "DRAFT" } }),
        prisma.contract.count({ where: { status: "SENT" } }),
        prisma.contract.count({ where: { status: "SIGNED" } }),
      ]);

    // Timeline analytics
    const [totalMilestones, completedMilestones, inProgressMilestones] =
      await Promise.all([
        prisma.timeline.count(),
        prisma.timeline.count({ where: { status: "COMPLETED" } }),
        prisma.timeline.count({ where: { status: "IN_PROGRESS" } }),
      ]);

    // Recent activity
    const recentClients = await prisma.client.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { name: true, createdAt: true },
    });

    const recentContracts = await prisma.contract.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: { select: { name: true } } },
    });

    const recentActivity = [
      ...recentClients.map((c) => ({
        type: "client",
        message: `Client nou: ${c.name}`,
        timestamp: c.createdAt.toISOString(),
      })),
      ...recentContracts.map((c) => ({
        type: "contract",
        message: `Contract generat pentru ${c.client.name}`,
        timestamp: c.createdAt.toISOString(),
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    const analytics = {
      clients: {
        total: totalClients,
        active: activeClients,
        pending: pendingClients,
        completed: completedClients,
        byPackage: packageCounts,
      },
      leads: {
        total: totalLeads,
        converted: convertedLeads,
        conversionRate:
          totalLeads > 0
            ? Math.round((convertedLeads / totalLeads) * 100)
            : 0,
        bySource: sourceCount,
      },
      contracts: {
        total: totalContracts,
        draft: draftContracts,
        sent: sentContracts,
        signed: signedContracts,
      },
      timeline: {
        totalMilestones,
        completed: completedMilestones,
        inProgress: inProgressMilestones,
        completionRate:
          totalMilestones > 0
            ? Math.round((completedMilestones / totalMilestones) * 100)
            : 0,
      },
      recentActivity,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

