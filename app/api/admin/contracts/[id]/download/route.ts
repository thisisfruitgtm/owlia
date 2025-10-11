import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    const contract = await prisma.contract.findUnique({
      where: { id },
      include: { client: true },
    });
    
    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }
    
    // Check authorization (ADMIN or contract owner)
    if (session.user.role !== "ADMIN" && session.user.clientId !== contract.clientId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }
    
    if (!contract.pdfUrl) {
      return NextResponse.json(
        { error: "Contract PDF not found" },
        { status: 404 }
      );
    }
    
    // Read PDF file
    const pdfBuffer = await readFile(contract.pdfUrl);
    
    const contractData = contract.data as any;
    const filename = contractData.contractNumber || 'contract';
    
    // Convert Buffer to Uint8Array for Response
    const uint8Array = new Uint8Array(pdfBuffer);
    
    // Return PDF with proper headers
    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error("Contract download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

