import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { generateGuidePdf } from "@/lib/guide/generatePdf";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filepath = await generateGuidePdf();

    return NextResponse.json({
      success: true,
      filepath,
      message: "Guide PDF generated successfully",
    });
  } catch (error) {
    console.error("Guide PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

