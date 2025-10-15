"use client";

import { useState } from "react";
import { X, Loader2, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddLeadModal({ onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    revenue: "",
    targetClients: "",
    source: "recomandare",
    notes: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/leads/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          industry: formData.industry || null,
          revenue: formData.revenue ? parseInt(formData.revenue) : null,
          targetClients: formData.targetClients ? parseInt(formData.targetClients) : null,
          source: formData.source,
          notes: formData.notes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la adăugarea lead-ului");
      }

      alert("Lead adăugat cu succes!");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-light">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-navy/10 rounded-xl">
              <UserPlus size={24} className="text-navy" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy">Adaugă Lead Manual</h2>
              <p className="text-sm text-gray">Lead din recomandare sau alt canal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            disabled={loading}
          >
            <X size={24} className="text-gray" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Nume Complet *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ion Popescu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ion@companie.ro"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Telefon
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0712345678"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Industrie
              </label>
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Ex: E-commerce, Restaurant"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Venit Anual (RON)
              </label>
              <Input
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                placeholder="100000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Clienți Țintă (lunar)
              </label>
              <Input
                type="number"
                value={formData.targetClients}
                onChange={(e) => setFormData({ ...formData, targetClients: e.target.value })}
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Sursă *
            </label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
              required
            >
              <option value="recomandare">Recomandare</option>
              <option value="telefon">Telefon</option>
              <option value="email">Email</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="networking">Networking Event</option>
              <option value="alta">Altă sursă</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Note / Detalii
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Detalii despre lead, cerințe specifice, etc."
              rows={3}
              className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none"
            />
          </div>

          <div className="bg-cream rounded-xl p-4">
            <p className="text-sm text-gray">
              💡 <strong>Tip:</strong> După adăugare, poți converti lead-ul în client direct din lista de leads.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-light bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-white transition-smooth"
            disabled={loading}
          >
            Anulează
          </button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Adăugare...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Adaugă Lead
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

