"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Package {
  id: string;
  name: string;
  price: number;
}

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    industry: "",
    revenue: "",
    targetClients: "",
    packageId: "",
    status: "ACTIVE",
    companyName: "",
    cui: "",
    regCom: "",
    address: "",
    legalRepName: "",
    legalRepRole: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchClient();
    fetchPackages();
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${params.id}`);
      const data = await response.json();
      
      setFormData({
        name: data.client.name || "",
        phone: data.client.phone || "",
        industry: data.client.industry || "",
        revenue: data.client.revenue?.toString() || "",
        targetClients: data.client.targetClients?.toString() || "",
        packageId: data.client.package?.id || "",
        status: data.client.status || "ACTIVE",
        companyName: data.client.companyName || "",
        cui: data.client.cui || "",
        regCom: data.client.regCom || "",
        address: data.client.address || "",
        legalRepName: data.client.legalRepName || "",
        legalRepRole: data.client.legalRepRole || "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/clients/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          revenue: parseInt(formData.revenue) || 0,
          targetClients: parseInt(formData.targetClients) || 1,
          packageId: formData.packageId || null,
          newPassword: formData.newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la actualizarea clientului");
      }

      router.push(`/admin/clients/${params.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/clients/${params.id}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
        >
          <ArrowLeft size={24} className="text-navy" />
        </Link>
        <h1 className="text-3xl font-bold text-navy">Editează Client</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 border border-gray-light space-y-6"
      >
        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">
            Informații Personale
          </h2>
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
                disabled={saving}
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
                disabled={saving}
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">
            Informații Companie
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Denumire companie
              </label>
              <Input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Ex: SC EXEMPLU SRL"
                disabled={saving}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">
                  CUI
                </label>
                <Input
                  type="text"
                  value={formData.cui}
                  onChange={(e) =>
                    setFormData({ ...formData, cui: e.target.value })
                  }
                  placeholder="Ex: RO12345678"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">
                  Reg. Com.
                </label>
                <Input
                  type="text"
                  value={formData.regCom}
                  onChange={(e) =>
                    setFormData({ ...formData, regCom: e.target.value })
                  }
                  placeholder="Ex: J40/1234/2020"
                  disabled={saving}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Adresă
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Ex: Str. Exemplu nr. 10, București"
                disabled={saving}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">
                  Reprezentant legal
                </label>
                <Input
                  type="text"
                  value={formData.legalRepName}
                  onChange={(e) =>
                    setFormData({ ...formData, legalRepName: e.target.value })
                  }
                  placeholder="Ex: Ion Popescu"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">
                  Funcție
                </label>
                <Input
                  type="text"
                  value={formData.legalRepRole}
                  onChange={(e) =>
                    setFormData({ ...formData, legalRepRole: e.target.value })
                  }
                  placeholder="Ex: Director General"
                  disabled={saving}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">
            Informații Business
          </h2>
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
                disabled={saving}
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
                  disabled={saving}
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
                    setFormData({
                      ...formData,
                      targetClients: e.target.value,
                    })
                  }
                  placeholder="Ex: 100"
                  required
                  disabled={saving}
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
                disabled={saving}
              >
                <option value="">Fără pachet</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {(pkg.price / 1000).toFixed(0)}K RON
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy"
                disabled={saving}
              >
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">
            Securitate
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-1">
                Parolă nouă
              </label>
              <Input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="Lasă gol pentru a păstra parola actuală"
                disabled={saving}
              />
              <p className="text-xs text-gray mt-1">
                Minimum 6 caractere. Lasă gol dacă nu vrei să schimbi parola.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="flex-1">
            <Save size={18} />
            {saving ? "Se salvează..." : "Salvează Modificările"}
          </Button>
          <Link
            href={`/admin/clients/${params.id}`}
            className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth text-center"
          >
            Anulează
          </Link>
        </div>
      </form>
    </div>
  );
}

