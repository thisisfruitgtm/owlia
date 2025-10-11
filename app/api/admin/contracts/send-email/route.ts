import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { sendContractGeneratedEmail } from "@/lib/email/send";

const sendEmailSchema = z.object({
  contractId: z.string(),
  clientId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const data = sendEmailSchema.parse(body);
    
    // Fetch contract and client
    const contract = await prisma.contract.findUnique({
      where: { id: data.contractId },
      include: {
        client: {
          include: {
            user: true,
            package: true,
          },
        },
      },
    });
    
    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }
    
    const contractData = contract.data as any;
    const contractNumber = contractData.contractNumber || "N/A";
    const packageName = contract.client.package?.name || "Standard";
    
    // Send email
    await sendContractGeneratedEmail(
      contract.client.user.email,
      contract.client.name,
      contractNumber,
      packageName
    );
    
    // Update contract status to SENT
    await prisma.contract.update({
      where: { id: data.contractId },
      data: { status: "SENT" },
    });
    
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Send email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

