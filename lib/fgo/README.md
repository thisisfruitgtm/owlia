# FGO Integration - Facturare Electronică

Modul de integrare cu [FGO.ro](https://www.fgo.ro) pentru emiterea automată de facturi.

## 📋 Configurare

### 1. Variabile de Mediu

Adaugă în `.env`:

```bash
# FGO API Configuration
FGO_API_URL="https://api-testuat.fgo.ro/v1"  # Test environment
FGO_COD_UNIC="12345678"                      # CUI-ul companiei
FGO_CHEIE_PRIVATA="your-private-key"         # Cheia privată din FGO
FGO_SERIE_FACTURA="OWLIA"                    # Serie facturi
```

### 2. Obținere Credențiale FGO

1. Creează cont pe [FGO.ro](https://www.fgo.ro)
2. Mergi la **Setări → API**
3. Copiază **Cheia Privată**
4. Setează **Serie Facturi** în contul FGO

### 3. Medii Disponibile

- **Test**: `https://api-testuat.fgo.ro/v1`
- **Production**: `https://api.fgo.ro/v1`

## 🚀 Utilizare

### Emitere Factură

```typescript
import { emitInvoiceToFgo, type FgoInvoiceItem } from "@/lib/fgo/client";
import { getFgoCredentials, calculateFgoHash } from "@/lib/fgo/helpers";

// 1. Pregătire date
const { codUnic, cheiePrívata, serie } = getFgoCredentials();
const hash = calculateFgoHash(codUnic, cheiePrívata, "Nume Client SRL");

// 2. Articole factura
const items: FgoInvoiceItem[] = [
  {
    Nume: "Pachet Marketing Digital",
    UM: "BUC",
    CantUnitate: 1,
    PretUnitar: 5000,
    CotaTva: 0.19,
  },
];

// 3. Emitere
const response = await emitInvoiceToFgo({
  CodUnic: codUnic,
  Hash: hash,
  Client: {
    Nume: "Client SRL",
    CodUnic: "12345678",
    Tara: "RO",
    Judet: "Bucuresti",
    Adresa: "Str. Exemplu Nr. 1",
    Email: "client@email.ro",
  },
  Serie: serie,
  TipFactura: "FACTURA",
  Continut: items,
  PlatformaUrl: "https://owlia.ro",
});

console.log(response.Result.Link); // PDF Link
```

## 📚 Flow Facturare în Owlia

```
1. Admin generează contract pentru client
   ↓
2. Admin apasă "Emite Factură" pe contract
   ↓
3. Modal se deschide cu date pre-completate:
   - Client (nume, CUI, adresă)
   - Servicii din pachet
   ↓
4. Admin editează/adaugă produse:
   - Nume produs
   - Cantitate
   - Preț unitar
   - TVA
   ↓
5. Sistem calculează:
   - Total fără TVA
   - Total TVA
   - Total de plată
   ↓
6. La apăsare "Emite Factură":
   - Se calculează hash SHA-1
   - Se face request la FGO API
   - Se salvează în DB
   - Se returnează link PDF
```

## 🔒 Hash Calculation

Hash-ul se calculează diferit în funcție de operație:

### Emitere Factură
```
Hash = SHA-1(CodUnic + CheiePrívata + NumeClient).toUpperCase()
```

### Operații pe Factură (anulare, print)
```
Hash = SHA-1(CodUnic + CheiePrívata + NumarFactura).toUpperCase()
```

## 📝 Tipuri Documente Suportate

- **FACTURA** - Factură fiscală normală
- **PROFORMA** - Factură proformă (nu fiscală)
- **AVANS** - Factură de avans

## 🎯 Validări Importante

### CUI România
- Pentru clienți PJ din România
- Format: numeric, 2-10 cifre
- Fără prefix "RO"

### Date Obligatorii Client
- Nume (denumire firmă)
- CUI
- Țară
- Județ (dacă țara = RO)

### Articole Factura
- Minim 1 articol
- Cantitate > 0
- Preț unitar >= 0
- TVA între 0-100%

## 📊 Modele Database

```prisma
model Invoice {
  id              String        @id @default(cuid())
  clientId        String
  contractId      String?
  fgoSerie        String?       // Serie din FGO
  fgoNumar        String?       // Numar din FGO
  fgoId           String?       // ID FGO
  fgoLink         String?       // Link PDF
  type            InvoiceType   @default(FACTURA)
  status          InvoiceStatus @default(DRAFT)
  total           Float
  items           Json          // Array of items
  fgoResponse     Json?         // Full FGO response
  emitedAt        DateTime?
  createdAt       DateTime      @default(now())
}
```

## 🐛 Troubleshooting

### "Can't reach FGO API"
- Verifică `FGO_API_URL` în `.env`
- Testează conexiunea: `curl https://api-testuat.fgo.ro/v1`

### "Hash invalid"
- Verifică `FGO_COD_UNIC` și `FGO_CHEIE_PRIVATA`
- Hash-ul trebuie să fie UPPERCASE
- Nu include spații în denumirea clientului

### "CUI invalid"
- Elimină prefix "RO"
- Doar cifre, 2-10 caractere
- Pentru test, dezactivează `ValideazaCodUnicRo: false`

## 📖 Documentație FGO

- [Specificații API FGO](http://testapp.fgo.ro/publicws/files/specificatii-api-latest.pdf)
- [Portal FGO](https://www.fgo.ro)
- [Mediu Test FGO](https://testuat.fgo.ro)

## ⚠️ Note Importante

1. **Rate Limiting**: 1 request / secundă pentru facturare
2. **Timeout**: Maximum 15 secunde per request
3. **Verificare Duplicat**: Dezactivată implicit
4. **TVA Standard**: 19% pentru România
5. **Serie Factură**: Trebuie configurată în FGO înainte

