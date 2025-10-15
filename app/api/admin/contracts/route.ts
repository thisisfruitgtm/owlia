import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { generateContract } from "@/lib/contracts/generator";
import { sendContractGeneratedEmail } from "@/lib/email/send";
import { notifyContractGenerated } from "@/lib/notifications/send";
import { logSecurityEvent } from "@/lib/security/logger";

const generateContractSchema = z.object({
  clientId: z.string(),
  contractNumber: z.string().optional(),
  htmlContent: z.string().optional(),
  sendEmail: z.boolean().default(false),
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
    
    // Fetch client with package info and timeline
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
      include: {
        user: true,
        package: true,
        timeline: {
          orderBy: { month: 'asc' },
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
        { error: "Client does not have a package assigned" },
        { status: 400 }
      );
    }
    
    // Generate contract number if not provided (autoincrement starting from 1)
    let contractNumber = data.contractNumber;
    if (!contractNumber) {
      // Get the count of existing contracts to generate sequential number
      const contractCount = await prisma.contract.count();
      const nextNumber = contractCount + 1;
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      contractNumber = `${nextNumber}/${day}.${month}.${year}`;
    }
    const contractDate = new Date().toLocaleDateString('ro-RO');
    
    // Check if timeline exists
    if (client.timeline.length === 0) {
      return NextResponse.json(
        { error: "Te rugăm să generezi mai întâi timeline-ul pentru acest client." },
        { status: 400 }
      );
    }

    // Generate PDF (using custom HTML if provided)
    const filepath = await generateContract({
      clientId: client.id,
      clientName: client.companyName || client.name,
      clientCIF: client.cui || 'RO[CUI]',
      clientRegCom: client.regCom || 'J__/____/____',
      clientAddress: client.address || 'Adresa Firmei',
      clientEmail: client.user.email,
      clientPhone: client.phone || 'N/A',
      packageName: client.package.name,
      packagePrice: client.package.price,
      packageFeatures: (client.package.features as any) || [],
      timeline: client.timeline.map((t: any) => ({
        month: t.month,
        milestone: t.milestone,
        description: t.description || undefined,
      })),
      contractNumber,
      contractDate,
      legalRepName: client.legalRepName || 'Reprezentant Legal',
      legalRepRole: client.legalRepRole || 'Director',
    }, data.htmlContent);
    
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
    
    // Send email notification to client (only if requested)
    if (data.sendEmail) {
      await sendContractGeneratedEmail(
        client.user.email,
        client.name,
        contractNumber,
        client.package.name
      );
    }
    
    // Send in-app notification
    await notifyContractGenerated(client.userId, contractNumber);
    
    // Log contract generation
    await logSecurityEvent({
      eventType: "CONTRACT_GENERATED",
      severity: "INFO",
      userId: session.user.id || undefined,
      email: session.user.email || undefined,
      description: `Contract ${contractNumber} generated for client ${client.name} (${client.package.name})`,
      metadata: {
        contractId: contract.id,
        contractNumber,
        clientId: client.id,
        clientName: client.name,
        packageName: client.package.name,
        emailSent: data.sendEmail,
      },
    });
    
    return NextResponse.json({
      success: true,
      emailSent: data.sendEmail,
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

