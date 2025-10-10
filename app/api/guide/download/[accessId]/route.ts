import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { readFile } from "fs/promises";
import path from "path";

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

    // Read the guide HTML file
    const filePath = path.join(process.cwd(), "ghid-buget-marketing-startup-nation.html");
    const fileContent = await readFile(filePath, "utf-8");

    // Return the HTML file
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Guide download error:", error);
    return new NextResponse("Error loading guide", { status: 500 });
  }
}

