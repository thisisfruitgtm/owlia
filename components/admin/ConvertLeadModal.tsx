"use client";

import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
  lead: {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    industry: string | null;
    revenue: number | null;
    targetClients: number | null;
    recommendedPackage: string | null;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConvertLeadModal({ lead, onClose, onSuccess }: Props) {
  const [converting, setConverting] = useState(false);
  const [formData, setFormData] = useState({
    name: lead.name || "",
    email: lead.email,
    phone: lead.phone || "",
    industry: lead.industry || "",
    revenue: lead.revenue?.toString() || "",
    targetClients: lead.targetClients?.toString() || "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setConverting(true);

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || null,
          industry: formData.industry,
          revenue: parseInt(formData.revenue) || 0,
          targetClients: parseInt(formData.targetClients) || 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la conversie");
      }

      alert(`Client ${formData.name} creat cu succes!\nParolă temporară: ${data.temporaryPassword}`);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-light">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <UserPlus className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy">Convertește Lead în Client</h2>
              <p className="text-sm text-gray">Email: {lead.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <X size={24} className="text-navy" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              Nume complet *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={converting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              Telefon
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={converting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-1">
              Industrie *
            </label>
            <Input
              type="text"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              required
              disabled={converting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Venituri estimate (RON) *
              </label>
              <Input
                type="number"
                value={formData.revenue}
                onChange={(e) =>
                  setFormData({ ...formData, revenue: e.target.value })
                }
                required
                disabled={converting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Clienți țintă *
              </label>
              <Input
                type="number"
                value={formData.targetClients}
                onChange={(e) =>
                  setFormData({ ...formData, targetClients: e.target.value })
                }
                required
                disabled={converting}
              />
            </div>
          </div>

          {lead.recommendedPackage && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 <strong>Pachet recomandat:</strong> {lead.recommendedPackage}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Vei putea asigna pachetul după crearea clientului
              </p>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-yellow-900">
              <strong>Notă:</strong> Se va crea cont cu parolă temporară care va fi afișată o singură dată.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={converting}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              {converting ? "Se convertește..." : "Creează Client"}
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth"
              disabled={converting}
            >
              Anulează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

