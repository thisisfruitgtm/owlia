import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      include: {
        user: { select: { email: true, createdAt: true } },
        package: { select: { name: true, price: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV
    const headers = [
      "ID",
      "Nume",
      "Email",
      "Telefon",
      "Companie",
      "CUI",
      "Reg. Com.",
      "Adresă",
      "Industrie",
      "Venituri",
      "Clienți Țintă",
      "Pachet",
      "Preț Pachet",
      "Status",
      "Data Creare",
    ];

    const csvRows = [headers.join(",")];

    clients.forEach((client) => {
      const row = [
        client.id,
        `"${client.name}"`,
        client.user.email,
        client.phone || "",
        `"${client.companyName || ""}"`,
        client.cui || "",
        client.regCom || "",
        `"${client.address || ""}"`,
        `"${client.industry}"`,
        client.revenue,
        client.targetClients,
        `"${client.package?.name || ""}"`,
        client.package?.price || "",
        client.status,
        new Date(client.createdAt).toISOString().split("T")[0],
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="clients-export-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export clients error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

