"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Package, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface PackageOption {
  id: string;
  name: string;
  price: number;
  features: any[];
}

interface Props {
  clientId: string;
  currentPackageId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignPackageModal({
  clientId,
  currentPackageId,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(currentPackageId);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customPackage, setCustomPackage] = useState({
    name: "",
    price: "",
    duration: "12", // Durata în luni (default 12)
    features: [""],
  });
  const [error, setError] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  const handleAssignExisting = async () => {
    if (!selectedPackageId) {
      setError("Selectează un pachet");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selectedPackageId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Eroare la asignarea pachetului");
      }

      alert("Pachet asignat cu succes!");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCustom = async () => {
    if (!customPackage.name || !customPackage.price || !customPackage.duration) {
      setError("Completează toate câmpurile obligatorii");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Create custom package
      const createResponse = await fetch("/api/admin/packages/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customPackage.name,
          price: parseInt(customPackage.price),
          duration: parseInt(customPackage.duration),
          features: customPackage.features.filter((f) => f.trim() !== "").map((f) => ({ title: f })),
          active: true,
        }),
      });

      if (!createResponse.ok) {
        const data = await createResponse.json();
        throw new Error(data.error || "Eroare la crearea pachetului");
      }

      const { package: newPackage } = await createResponse.json();

      // Assign package to client
      const assignResponse = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: newPackage.id }),
      });

      if (!assignResponse.ok) {
        throw new Error("Eroare la asignarea pachetului");
      }

      alert("Pachet custom creat și asignat cu succes!");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    setCustomPackage({
      ...customPackage,
      features: [...customPackage.features, ""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...customPackage.features];
    newFeatures[index] = value;
    setCustomPackage({ ...customPackage, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setCustomPackage({
      ...customPackage,
      features: customPackage.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-light">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-navy/10 rounded-xl">
              <Package size={24} className="text-navy" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy">Asignează Pachet</h2>
              <p className="text-sm text-gray">Alege un pachet existent sau creează unul custom</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            disabled={saving}
          >
            <X size={24} className="text-gray" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setShowCustomForm(false)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-smooth ${
                !showCustomForm ? "bg-white text-navy shadow-sm" : "text-gray"
              }`}
            >
              Pachete Existente
            </button>
            <button
              onClick={() => setShowCustomForm(true)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-smooth ${
                showCustomForm ? "bg-white text-navy shadow-sm" : "text-gray"
              }`}
            >
              Pachet Custom
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-navy" />
            </div>
          ) : !showCustomForm ? (
            /* Existing Packages */
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-smooth ${
                    selectedPackageId === pkg.id
                      ? "border-navy bg-navy/5"
                      : "border-gray-light hover:border-navy/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-navy">{pkg.name}</h3>
                    <span className="text-xl font-bold text-navy">
                      {(pkg.price / 1000).toFixed(0)}K RON
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.slice(0, 3).map((feature: any, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-dark"
                      >
                        {feature.title}
                      </span>
                    ))}
                    {pkg.features.length > 3 && (
                      <span className="text-xs text-gray">+{pkg.features.length - 3} mai multe</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Custom Package Form */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Nume Pachet *
                  </label>
                  <Input
                    value={customPackage.name}
                    onChange={(e) => setCustomPackage({ ...customPackage, name: e.target.value })}
                    placeholder="Ex: Pachet Startup"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Preț (RON) *
                  </label>
                  <Input
                    type="number"
                    value={customPackage.price}
                    onChange={(e) => setCustomPackage({ ...customPackage, price: e.target.value })}
                    placeholder="Ex: 15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Durata (luni) *
                  </label>
                  <Input
                    type="number"
                    value={customPackage.duration}
                    onChange={(e) => setCustomPackage({ ...customPackage, duration: e.target.value })}
                    placeholder="Ex: 12"
                    min="1"
                    max="24"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-navy">
                    Servicii Incluse
                  </label>
                  <button
                    onClick={addFeature}
                    className="flex items-center gap-1 text-sm text-navy hover:underline"
                    type="button"
                  >
                    <Plus size={16} />
                    Adaugă serviciu
                  </button>
                </div>
                <div className="space-y-2">
                  {customPackage.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Serviciu ${index + 1}`}
                      />
                      {customPackage.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index)}
                          className="px-3 text-red-600 hover:bg-red-50 rounded-lg"
                          type="button"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> După ce creezi pachetul custom, vei putea genera timeline-ul pentru client.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-light bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-white transition-smooth"
            disabled={saving}
          >
            Anulează
          </button>
          <Button
            onClick={showCustomForm ? handleCreateCustom : handleAssignExisting}
            disabled={saving || (!showCustomForm && !selectedPackageId)}
            className="flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {showCustomForm ? "Creare..." : "Asignare..."}
              </>
            ) : (
              <>
                <Package size={18} />
                {showCustomForm ? "Creează & Asignează" : "Asignează Pachet"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

