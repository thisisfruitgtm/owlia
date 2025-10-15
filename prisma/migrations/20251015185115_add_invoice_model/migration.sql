-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'EMISA', 'ANULATA', 'STORNATA');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('FACTURA', 'PROFORMA', 'AVANS');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractId" TEXT,
    "fgoSerie" TEXT,
    "fgoNumar" TEXT,
    "fgoId" TEXT,
    "fgoLink" TEXT,
    "type" "InvoiceType" NOT NULL DEFAULT 'FACTURA',
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "total" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RON',
    "items" JSONB NOT NULL,
    "fgoResponse" JSONB,
    "emitedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

