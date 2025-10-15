import crypto from "crypto";

/**
 * Calculate FGO API Hash according to documentation
 * Hash = SHA-1(CodUnicFurnizor + CheiePrívata + DenumireClient) UPPERCASE
 */
export function calculateFgoHash(
  codUnic: string,
  cheiePrívata: string,
  denunireClient: string
): string {
  const dataToHash = `${codUnic}${cheiePrívata}${denunireClient}`;
  return crypto.createHash("sha1").update(dataToHash).digest("hex").toUpperCase();
}

/**
 * Calculate hash for invoice operations (anulare, stornare, print)
 * Hash = SHA-1(CodUnicFurnizor + CheiePrívata + NumarFactura)
 */
export function calculateFgoInvoiceHash(
  codUnic: string,
  cheiePrívata: string,
  numarFactura: string
): string {
  const dataToHash = `${codUnic}${cheiePrívata}${numarFactura}`;
  return crypto.createHash("sha1").update(dataToHash).digest("hex").toUpperCase();
}

/**
 * Get FGO API URL based on environment
 */
export function getFgoApiUrl(): string {
  return process.env.FGO_API_URL || "https://api-testuat.fgo.ro/v1";
}

/**
 * Get FGO credentials from environment
 */
export function getFgoCredentials() {
  const codUnic = process.env.FGO_COD_UNIC;
  const cheiePrívata = process.env.FGO_CHEIE_PRIVATA;
  const serie = process.env.FGO_SERIE_FACTURA || "OWLIA";

  if (!codUnic || !cheiePrívata) {
    throw new Error("FGO credentials not configured. Please set FGO_COD_UNIC and FGO_CHEIE_PRIVATA in environment variables.");
  }

  return {
    codUnic,
    cheiePrívata,
    serie,
  };
}

/**
 * Validate Romanian CUI/CIF format
 */
export function isValidRomanianCUI(cui: string): boolean {
  // Remove RO prefix and spaces
  const cleanCui = cui.replace(/^RO/i, "").replace(/\s/g, "");
  // CUI should be numeric and between 2-10 digits
  return /^\d{2,10}$/.test(cleanCui);
}

/**
 * Format CUI for FGO (without RO prefix)
 */
export function formatCuiForFgo(cui: string): string {
  return cui.replace(/^RO/i, "").trim();
}

