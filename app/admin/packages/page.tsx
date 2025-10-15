"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Edit, Trash2, Save, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import PackageFeatureEditor from "@/components/admin/PackageFeatureEditor";

interface Feature {
  title: string;
  description?: string;
}

interface PackageType {
  id: string;
  name: string;
  price: number;
  priceMonthly: number | null;
  description: string | null;
  features: Feature[];
  deliveryDays: number | null;
  conditions: string | null;
  active: boolean;
  visible: boolean;
  createdAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    priceMonthly: string;
    description: string;
    features: Feature[];
    deliveryDays: string;
    conditions: string;
    active: boolean;
    visible: boolean;
  }>({
    name: "",
    price: "",
    priceMonthly: "",
    description: "",
    features: [],
    deliveryDays: "",
    conditions: "",
    active: true,
    visible: true,
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const packageData = {
      name: formData.name,
      price: parseInt(formData.price),
      priceMonthly: formData.priceMonthly
        ? parseInt(formData.priceMonthly)
        : null,
      description: formData.description || null,
      features: formData.features.filter((f) => f.title.trim()),
      deliveryDays: formData.deliveryDays ? parseInt(formData.deliveryDays) : null,
      conditions: formData.conditions || null,
      active: formData.active,
      visible: formData.visible,
    };

    try {
      const url = editingId 
        ? `/api/admin/packages/${editingId}` 
        : "/api/admin/packages";
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Eroare: ${data.error || "Ceva nu a mers bine"}`);
        console.error("API error:", data);
        return;
      }

      alert("Pachet salvat cu succes!");
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error("Error saving package:", error);
      alert("Eroare la salvare. Vezi consola pentru detalii.");
    }
  };

  const handleEdit = (pkg: PackageType) => {
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      priceMonthly: pkg.priceMonthly?.toString() || "",
      description: pkg.description || "",
      features: pkg.features || [],
      deliveryDays: pkg.deliveryDays?.toString() || "",
      conditions: pkg.conditions || "",
      active: pkg.active,
      visible: pkg.visible,
    });
    setEditingId(pkg.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest pachet?")) return;

    try {
      await fetch(`/api/admin/packages/${id}`, {
        method: "DELETE",
      });
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Eroare toggle: ${data.error || "Ceva nu a mers bine"}`);
        console.error("Toggle error:", data);
        return;
      }

      console.log("Toggle success:", data);
      fetchPackages();
    } catch (error) {
      console.error("Error toggling package:", error);
      alert("Eroare la toggle. Vezi consola.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      priceMonthly: "",
      description: "",
      features: [],
      deliveryDays: "",
      conditions: "",
      active: true,
      visible: true,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">
            Management Pachete
          </h1>
          <p className="text-gray">
            Gestionează pachetele de servicii OWLIA
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Pachet Nou
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-navy">
              {editingId ? "Editează Pachet" : "Pachet Nou"}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Nume pachet (ex: SMART)"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                type="number"
                placeholder="Preț (RON)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
              <Input
                type="number"
                placeholder="Preț lunar (opțional)"
                value={formData.priceMonthly}
                onChange={(e) =>
                  setFormData({ ...formData, priceMonthly: e.target.value })
                }
              />
            </div>

            <Input
              type="text"
              placeholder="Descriere scurtă"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Termen livrare (zile lucrătoare, opțional)"
              value={formData.deliveryDays}
              onChange={(e) =>
                setFormData({ ...formData, deliveryDays: e.target.value })
              }
            />

            <textarea
              placeholder="Condiții specifice pachetului (modalități plată, garanție, etc.)"
              value={formData.conditions}
              onChange={(e) =>
                setFormData({ ...formData, conditions: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-light rounded-xl resize-none"
              rows={4}
            />

            <PackageFeatureEditor
              features={formData.features}
              onChange={(features) =>
                setFormData({ ...formData, features })
              }
            />

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm text-gray">
                  Pachet activ (funcțional în sistem)
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={formData.visible}
                  onChange={(e) =>
                    setFormData({ ...formData, visible: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="visible" className="text-sm text-gray">
                  Vizibil pe website public
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 flex items-center justify-center gap-2">
                <Save size={18} />
                {editingId ? "Salvează Modificările" : "Creează Pachet"}
              </Button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-3 border border-gray-light rounded-xl font-semibold hover:bg-gray-50"
              >
                Anulează
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-xl p-6 border transition-smooth ${
              pkg.active ? "border-gray-light" : "border-red-200 bg-red-50/30"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-navy">{pkg.name}</h3>
                  <Badge variant={pkg.active ? "success" : "default"}>
                    {pkg.active ? "Activ" : "Inactiv"}
                  </Badge>
                </div>
                {pkg.description && (
                  <p className="text-gray text-sm">{pkg.description}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-navy">
                  {(pkg.price / 1000).toFixed(0)}K
                </span>
                <span className="text-gray">RON</span>
              </div>
              {pkg.priceMonthly && (
                <p className="text-sm text-gray mt-1">
                  sau {(pkg.priceMonthly / 1000).toFixed(0)}K RON/lună
                </p>
              )}
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-navy mb-2">
                Features ({pkg.features?.length || 0}):
              </h4>
              <ul className="space-y-2">
                {(pkg.features || []).slice(0, 5).map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-sm flex items-start gap-2"
                  >
                    <span className="text-green-600 mt-0.5">✓</span>
                    <div>
                      <span className="text-navy font-medium">{feature.title}</span>
                      {feature.description && (
                        <p className="text-gray text-xs mt-0.5">{feature.description}</p>
                      )}
                    </div>
                  </li>
                ))}
                {(pkg.features?.length || 0) > 5 && (
                  <li className="text-sm text-gray">
                    +{(pkg.features?.length || 0) - 5} mai multe...
                  </li>
                )}
              </ul>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-light">
              <button
                onClick={() => toggleActive(pkg.id, pkg.active)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-smooth ${
                  pkg.active
                    ? "bg-gray-100 text-gray hover:bg-gray-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {pkg.active ? "Dezactivează" : "Activează"}
              </button>
              <button
                onClick={() => handleEdit(pkg)}
                className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-smooth font-semibold"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-smooth font-semibold"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && !showAddForm && (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <Package size={64} className="mx-auto mb-4 text-gray opacity-30" />
          <h3 className="text-xl font-bold text-navy mb-2">
            Niciun pachet încă
          </h3>
          <p className="text-gray mb-4">
            Creează primul pachet de servicii
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={18} />
            Adaugă Pachet
          </Button>
        </div>
      )}
    </div>
  );
}

