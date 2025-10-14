import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { getGuidePdfPath } from "@/lib/guide/generatePdf";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ accessId: string }> }
) {
  try {
    const { accessId } = await params;

    // Verify guide access exists
    const guideAccess = await prisma.guideAccess.findUnique({
      where: { id: accessId },
    });

    if (!guideAccess) {
      return new NextResponse("Invalid access link", { status: 404 });
    }

    // Mark as downloaded if first time
    if (!guideAccess.downloaded) {
      await prisma.guideAccess.update({
        where: { id: accessId },
        data: { downloaded: true },
      });
    }

    // Get PDF path
    const pdfPath = getGuidePdfPath();

    // Check if PDF exists
    if (!existsSync(pdfPath)) {
      return NextResponse.json(
        { error: "Guide PDF not found. Please contact support." },
        { status: 404 }
      );
    }

    // Read PDF file
    const pdfBuffer = await readFile(pdfPath);

    // Return PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Ghid-Buget-Marketing-StartUp-Nation.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Guide download error:", error);
    return new NextResponse("Error loading guide", { status: 500 });
  }
}

