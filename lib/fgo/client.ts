import { getFgoApiUrl } from "./helpers";

/**
 * FGO Invoice Item
 */
export interface FgoInvoiceItem {
  Nume: string;                    // Denumire produs/serviciu
  UM: string;                       // Unitate masura (BUC, ORA, etc.)
  CantUnitate: number;              // Cantitate
  PretUnitar: number;               // Pret unitar
  CotaTva: number;                  // Cota TVA (0.19 pentru 19%)
  Descriere?: string;               // Descriere optionala
  CodCentruCost?: string;           // Cod centru de cost optional
}

/**
 * FGO Client Data
 */
export interface FgoClientData {
  Nume: string;                     // Denumire client
  CodUnic?: string;                 // CUI/CNP (fara RO)
  Tara: string;                     // Cod tara (RO, US, etc.)
  Judet?: string;                   // Judet (obligatoriu daca Tara=RO)
  Localitate?: string;              // Localitate
  Adresa?: string;                  // Adresa
  Email?: string;                   // Email client
  Telefon?: string;                 // Telefon
  RegCom?: string;                  // Registrul comertului
  IdExtern?: string;                // ID client din sistem propriu
}

/**
 * FGO Invoice Request
 */
export interface FgoEmitereRequest {
  CodUnic: string;                  // CUI furnizor
  Hash: string;                     // SHA-1 hash
  Client: FgoClientData;            // Date client
  Serie: string;                    // Serie factura
  Numar?: string;                   // Numar factura (auto daca lipseste)
  DataEmitere?: string;             // Data emitere (YYYY-MM-DD)
  DataScadenta?: string;            // Data scadenta
  TipFactura?: string;              // Factura, Proforma, Avans
  Continut: FgoInvoiceItem[];       // Articole factura
  Observatii?: string;              // Observatii factura
  PlatformaUrl: string;             // URL platforma
  VerificareDuplicat?: boolean;     // Verificare duplicat
  ValideazaCodUnicRo?: boolean;     // Validare CUI Romania
}

/**
 * FGO Invoice Response
 */
export interface FgoEmitereResponse {
  Success: boolean;
  Message?: string;
  Result?: {
    Id: string;                     // ID factura in FGO
    Link: string;                   // Link PDF factura
    Serie: string;                  // Serie factura
    Numar: string;                  // Numar factura
    NumarComplet: string;           // Serie + Numar
    DataEmitere: string;            // Data emitere
    Total: number;                  // Total factura
  };
}

/**
 * Emit invoice to FGO
 */
export async function emitInvoiceToFgo(
  request: FgoEmitereRequest
): Promise<FgoEmitereResponse> {
  const apiUrl = getFgoApiUrl();
  const endpoint = `${apiUrl}/facturare/emitere`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data: FgoEmitereResponse = await response.json();

    if (!data.Success) {
      throw new Error(data.Message || "Eroare la emiterea facturii in FGO");
    }

    return data;
  } catch (error) {
    console.error("FGO API Error:", error);
    throw error;
  }
}

/**
 * Get invoice PDF link from FGO
 */
export async function getInvoicePdfLink(
  codUnic: string,
  hash: string,
  serie: string,
  numar: string,
  platformaUrl: string
): Promise<string> {
  const apiUrl = getFgoApiUrl();
  const endpoint = `${apiUrl}/facturare/print`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CodUnic: codUnic,
        Hash: hash,
        Serie: serie,
        Numar: numar,
        PlatformaUrl: platformaUrl,
      }),
    });

    const data = await response.json();

    if (!data.Success) {
      throw new Error(data.Message || "Eroare la obtinerea link-ului PDF");
    }

    return data.Result.Link;
  } catch (error) {
    console.error("FGO PDF Link Error:", error);
    throw error;
  }
}

/**
 * Cancel invoice in FGO
 */
export async function cancelInvoiceInFgo(
  codUnic: string,
  hash: string,
  serie: string,
  numar: string,
  platformaUrl: string
): Promise<boolean> {
  const apiUrl = getFgoApiUrl();
  const endpoint = `${apiUrl}/facturare/anulare`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CodUnic: codUnic,
        Hash: hash,
        Serie: serie,
        Numar: numar,
        PlatformaUrl: platformaUrl,
      }),
    });

    const data = await response.json();

    if (!data.Success) {
      throw new Error(data.Message || "Eroare la anularea facturii");
    }

    return true;
  } catch (error) {
    console.error("FGO Cancel Error:", error);
    throw error;
  }
}

