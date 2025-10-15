import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/config";
import { 
  getFgoCredentials, 
  calculateFgoHash, 
  formatCuiForFgo 
} from "@/lib/fgo/helpers";
import { 
  emitInvoiceToFgo, 
  type FgoInvoiceItem 
} from "@/lib/fgo/client";
import { logSecurityEvent } from "@/lib/security/logger";

const invoiceItemSchema = z.object({
  name: z.string().min(1, "Numele produsului este obligatoriu"),
  um: z.string().default("BUC"),
  quantity: z.number().min(0.01, "Cantitatea trebuie să fie pozitivă"),
  unitPrice: z.number().min(0, "Prețul trebuie să fie pozitiv"),
  vatRate: z.number().min(0).max(1).default(0.19),
  description: z.string().optional(),
});

const emitInvoiceSchema = z.object({
  clientId: z.string(),
  contractId: z.string().optional(),
  type: z.enum(["FACTURA", "PROFORMA", "AVANS"]).default("FACTURA"),
  items: z.array(invoiceItemSchema).min(1, "Trebuie să adaugi cel puțin un produs/serviciu"),
  dataEmitere: z.string().optional(),
  dataScadenta: z.string().optional(),
  observatii: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = emitInvoiceSchema.parse(body);

    // Get FGO credentials
    const { codUnic, cheiePrívata, serie } = getFgoCredentials();

    // Get client data
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
      include: {
        user: true,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Validate client has required data
    if (!client.companyName || !client.cui) {
      return NextResponse.json(
        { error: "Clientul trebuie să aibă denumirea companiei și CUI completate" },
        { status: 400 }
      );
    }

    // Calculate hash
    const hash = calculateFgoHash(codUnic, cheiePrívata, client.companyName);

    // Format CUI
    const cuiFormatted = formatCuiForFgo(client.cui);

    // Prepare invoice items for FGO
    const fgoItems: FgoInvoiceItem[] = data.items.map((item) => ({
      Nume: item.name,
      UM: item.um,
      CantUnitate: item.quantity,
      PretUnitar: item.unitPrice,
      CotaTva: item.vatRate,
      Descriere: item.description,
    }));

    // Calculate total
    const total = data.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const vat = subtotal * item.vatRate;
      return sum + subtotal + vat;
    }, 0);

    // Prepare FGO request
    const fgoRequest = {
      CodUnic: codUnic,
      Hash: hash,
      Client: {
        Nume: client.companyName,
        CodUnic: cuiFormatted,
        Tara: "RO",
        Judet: client.address?.split(",")[0]?.trim() || "Bucuresti",
        Adresa: client.address || "",
        Email: client.user.email,
        Telefon: client.phone || "",
        RegCom: client.regCom || "",
        IdExtern: client.id,
      },
      Serie: serie,
      DataEmitere: data.dataEmitere,
      DataScadenta: data.dataScadenta,
      TipFactura: data.type,
      Continut: fgoItems,
      Observatii: data.observatii,
      PlatformaUrl: process.env.NEXTAUTH_URL || "https://owlia.ro",
      VerificareDuplicat: false,
      ValideazaCodUnicRo: true,
    };

    // Emit invoice to FGO
    const fgoResponse = await emitInvoiceToFgo(fgoRequest);

    if (!fgoResponse.Success || !fgoResponse.Result) {
      throw new Error(fgoResponse.Message || "Eroare la emiterea facturii");
    }

    // Save invoice to database
    const invoice = await prisma.invoice.create({
      data: {
        clientId: client.id,
        contractId: data.contractId || null,
        fgoSerie: fgoResponse.Result.Serie,
        fgoNumar: fgoResponse.Result.Numar,
        fgoId: fgoResponse.Result.Id,
        fgoLink: fgoResponse.Result.Link,
        type: data.type,
        status: "EMISA",
        total,
        currency: "RON",
        items: data.items,
        fgoResponse: fgoResponse.Result,
        emitedAt: new Date(),
      },
    });

    // Log security event
    await logSecurityEvent({
      eventType: "INVOICE_EMITED",
      severity: "INFO",
      userId: session.user.id,
      email: session.user.email,
      description: `Factură emisă ${fgoResponse.Result.NumarComplet} pentru ${client.companyName} - ${total.toFixed(2)} RON`,
      metadata: {
        invoiceId: invoice.id,
        fgoId: fgoResponse.Result.Id,
        numarComplet: fgoResponse.Result.NumarComplet,
        clientId: client.id,
        total,
      },
    });

    return NextResponse.json(
      {
        success: true,
        invoice: {
          id: invoice.id,
          numarComplet: fgoResponse.Result.NumarComplet,
          serie: fgoResponse.Result.Serie,
          numar: fgoResponse.Result.Numar,
          link: fgoResponse.Result.Link,
          total,
          dataEmitere: fgoResponse.Result.DataEmitere,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("FGO Invoice Emit Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

