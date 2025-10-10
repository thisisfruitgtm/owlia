"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Package {
  id: string;
  name: string;
  price: number;
}

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    revenue: "",
    targetClients: "",
    packageId: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          revenue: parseInt(formData.revenue) || 0,
          targetClients: parseInt(formData.targetClients) || 1,
          packageId: formData.packageId || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la crearea clientului");
      }

      setSuccess(true);
      setTempPassword(data.temporaryPassword);

      // Redirect after showing password
      setTimeout(() => {
        router.push(`/admin/clients/${data.client.id}`);
      }, 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-light text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-4">
            Client creat cu succes!
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray mb-2">
              <strong>IMPORTANT:</strong> Parola temporară este:
            </p>
            <p className="text-xl font-mono font-bold text-navy bg-white px-4 py-2 rounded">
              {tempPassword}
            </p>
            <p className="text-xs text-gray mt-2">
              Trimite această parolă clientului pe un canal securizat.
            </p>
          </div>
          <p className="text-gray mb-6">
            Vei fi redirecționat către pagina clientului în 5 secunde...
          </p>
          <Link
            href="/admin/clients"
            className="text-navy hover:underline font-semibold"
          >
            Sau click aici pentru a merge la lista de clienți
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/clients"
          className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
        >
          <ArrowLeft size={24} className="text-navy" />
        </Link>
        <h1 className="text-3xl font-bold text-navy">Adaugă Client Nou</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-light space-y-6">
        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">Informații Personale</h2>
          <div className="space-y-4">
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
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">Informații Business</h2>
          <div className="space-y-4">
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
                placeholder="Ex: E-commerce, HoReCa, Consultanță"
                required
                disabled={loading}
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
                  placeholder="Ex: 500000"
                  required
                  disabled={loading}
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
                  placeholder="Ex: 100"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Pachet
              </label>
              <select
                value={formData.packageId}
                onChange={(e) =>
                  setFormData({ ...formData, packageId: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy"
                disabled={loading}
              >
                <option value="">Fără pachet</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {(pkg.price / 1000).toFixed(0)}K RON
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            <Save size={18} />
            {loading ? "Se creează..." : "Creează Client"}
          </Button>
          <Link
            href="/admin/clients"
            className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth text-center"
          >
            Anulează
          </Link>
        </div>
      </form>
    </div>
  );
}

