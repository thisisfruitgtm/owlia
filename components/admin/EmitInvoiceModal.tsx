"use client";

import { useState } from "react";
import { X, Loader2, FileText, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface InvoiceItem {
  name: string;
  um: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  description?: string;
}

interface Props {
  clientId: string;
  clientName: string;
  contractId?: string;
  onClose: () => void;
  onSuccess: (invoice: any) => void;
}

export default function EmitInvoiceModal({
  clientId,
  clientName,
  contractId,
  onClose,
  onSuccess,
}: Props) {
  const [emitting, setEmitting] = useState(false);
  const [error, setError] = useState("");
  const [invoiceType, setInvoiceType] = useState<"FACTURA" | "PROFORMA" | "AVANS">("FACTURA");
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      name: "",
      um: "BUC",
      quantity: 1,
      unitPrice: 0,
      vatRate: 0.19,
      description: "",
    },
  ]);
  const [dataEmitere, setDataEmitere] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dataScadenta, setDataScadenta] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [observatii, setObservatii] = useState("");

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        um: "BUC",
        quantity: 1,
        unitPrice: 0,
        vatRate: 0.19,
        description: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateItemTotal = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const vat = subtotal * item.vatRate;
    return subtotal + vat;
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTotalFaraTVA = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTotalTVA = () => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice * item.vatRate,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmitting(true);

    try {
      const response = await fetch("/api/admin/invoices/fgo/emitere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          contractId,
          type: invoiceType,
          items: items.map((item) => ({
            name: item.name,
            um: item.um,
            quantity: parseFloat(item.quantity.toString()),
            unitPrice: parseFloat(item.unitPrice.toString()),
            vatRate: parseFloat(item.vatRate.toString()),
            description: item.description || undefined,
          })),
          dataEmitere,
          dataScadenta,
          observatii: observatii || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la emiterea facturii");
      }

      alert(
        `Factură ${data.invoice.numarComplet} emisă cu succes!\nTotal: ${data.invoice.total.toFixed(2)} RON\n\nLink PDF: ${data.invoice.link}`
      );
      onSuccess(data.invoice);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setEmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-light z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-navy/10 rounded-xl">
              <FileText size={24} className="text-navy" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy">Emitere Factură FGO</h2>
              <p className="text-sm text-gray">Client: {clientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            disabled={emitting}
          >
            <X size={24} className="text-gray" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Invoice Type & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Tip Factură
              </label>
              <select
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
              >
                <option value="FACTURA">Factură</option>
                <option value="PROFORMA">Proformă</option>
                <option value="AVANS">Avans</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Data Emitere
              </label>
              <Input
                type="date"
                value={dataEmitere}
                onChange={(e) => setDataEmitere(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Data Scadență
              </label>
              <Input
                type="date"
                value={dataScadenta}
                onChange={(e) => setDataScadenta(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy">Produse / Servicii</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-navy hover:underline text-sm font-semibold"
              >
                <Plus size={16} />
                Adaugă Produs
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 space-y-3 relative"
                >
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-navy mb-1">
                        Denumire Produs/Serviciu *
                      </label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        placeholder="Ex: Pachet Marketing Digital"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        UM
                      </label>
                      <select
                        value={item.um}
                        onChange={(e) => updateItem(index, "um", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
                      >
                        <option value="BUC">BUC</option>
                        <option value="ORA">ORA</option>
                        <option value="ZI">ZI</option>
                        <option value="LUNA">LUNA</option>
                        <option value="SET">SET</option>
                        <option value="SERVICIU">SERVICIU</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        Cantitate *
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        Preț Unitar (RON) *
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        TVA (%)
                      </label>
                      <select
                        value={item.vatRate}
                        onChange={(e) =>
                          updateItem(index, "vatRate", parseFloat(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
                      >
                        <option value="0.19">19%</option>
                        <option value="0.09">9%</option>
                        <option value="0.05">5%</option>
                        <option value="0">0% (Scutit)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-navy mb-1">
                        Descriere (opțional)
                      </label>
                      <Input
                        value={item.description || ""}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        placeholder="Detalii suplimentare despre produs/serviciu"
                      />
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray">Total articol:</span>
                    <span className="text-lg font-bold text-navy">
                      {calculateItemTotal(item).toFixed(2)} RON
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observatii */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Observații (opțional)
            </label>
            <textarea
              value={observatii}
              onChange={(e) => setObservatii(e.target.value)}
              placeholder="Note suplimentare pentru factură"
              rows={3}
              className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none"
            />
          </div>

          {/* Totals */}
          <div className="bg-navy/5 rounded-xl p-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray">Total fără TVA:</span>
              <span className="text-lg font-semibold text-navy">
                {calculateTotalFaraTVA().toFixed(2)} RON
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray">Total TVA:</span>
              <span className="text-lg font-semibold text-navy">
                {calculateTotalTVA().toFixed(2)} RON
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="text-xl font-bold text-navy">TOTAL:</span>
              <span className="text-2xl font-bold text-navy">
                {calculateTotal().toFixed(2)} RON
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Notă:</strong> Factura va fi emisă automat în FGO și va primi un număr unic. 
              Link-ul PDF va fi disponibil imediat după emitere.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white flex items-center justify-between p-6 border-t border-gray-light">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-white transition-smooth"
            disabled={emitting}
          >
            Anulează
          </button>
          <Button
            onClick={handleSubmit}
            disabled={emitting}
            className="flex items-center gap-2"
          >
            {emitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Emitere în FGO...
              </>
            ) : (
              <>
                <FileText size={18} />
                Emite Factură
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

