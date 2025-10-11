import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { generateContract } from "@/lib/contracts/generator";
import { sendContractGeneratedEmail } from "@/lib/email/send";

const generateContractSchema = z.object({
  clientId: z.string(),
  contractNumber: z.string().optional(),
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
    const data = generateContractSchema.parse(body);
    
    // Fetch client with package info
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
      include: {
        user: true,
        package: true,
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
        { error: "Client does not have a package assigned" },
        { status: 400 }
      );
    }
    
    // Generate contract number if not provided
    const contractNumber = data.contractNumber || `OWLIA-${Date.now()}`;
    const contractDate = new Date().toLocaleDateString('ro-RO');
    
    // Generate PDF
    const filepath = await generateContract({
      clientId: client.id,
      clientName: client.name,
      clientCIF: 'RO[CUI]', // To be filled by client
      clientAddress: 'Adresa Firmei', // To be filled by client
      clientEmail: client.user.email,
      clientPhone: client.phone || 'N/A',
      packageName: client.package.name,
      packagePrice: client.package.price,
      contractNumber,
      contractDate,
      legalRepName: 'Reprezentant Legal', // To be filled by client
      legalRepRole: 'Director', // To be filled by client
    });
    
    // Save contract to database
    const contract = await prisma.contract.create({
      data: {
        clientId: client.id,
        pdfUrl: filepath,
        data: {
          contractNumber,
          title: `Contract ${client.package.name} - ${contractNumber}`,
          clientName: client.name,
          packageName: client.package.name,
          packagePrice: client.package.price,
          contractDate,
        },
        status: 'DRAFT',
      },
    });
    
    // Send email notification to client
    await sendContractGeneratedEmail(
      client.user.email,
      client.name,
      contractNumber,
      client.package.name
    );
    
    return NextResponse.json({
      success: true,
      contract: {
        id: contract.id,
        contractNumber,
        pdfUrl: contract.pdfUrl,
        createdAt: contract.createdAt,
      },
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Contract generation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    
    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }
    
    const contracts = await prisma.contract.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ contracts });
    
  } catch (error) {
    console.error("Contracts fetch API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

