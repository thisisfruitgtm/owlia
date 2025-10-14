import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      include: {
        guideAccess: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV
    const headers = [
      "ID",
      "Email",
      "Nume",
      "Telefon",
      "Industrie",
      "Venituri",
      "Clienți Țintă",
      "Buget Recomandat",
      "Pachet Recomandat",
      "Pachet Interes",
      "Sursă",
      "Convertit",
      "Guide Downloads",
      "Data",
    ];

    const csvRows = [headers.join(",")];

    leads.forEach((lead) => {
      const row = [
        lead.id,
        lead.email,
        `"${lead.name || ""}"`,
        lead.phone || "",
        `"${lead.industry || ""}"`,
        lead.revenue || "",
        lead.targetClients || "",
        `"${lead.recommendedBudget || ""}"`,
        lead.recommendedPackage || "",
        lead.packageInterest || "",
        lead.source || "",
        lead.converted ? "Da" : "Nu",
        lead.guideAccess.length,
        new Date(lead.createdAt).toISOString().split("T")[0],
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-export-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

