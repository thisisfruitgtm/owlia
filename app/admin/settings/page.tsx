"use client";

import { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon } from "lucide-react";
import Button from "@/components/ui/Button";

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      setSettings(data.settings || []);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setError("Eroare la încărcarea setărilor");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: string, currentValue: string) => {
    const newValue = currentValue === "true" ? "false" : "true";
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: newValue } : s))
    );
  };

  const handleSave = async () => {
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la salvarea setărilor");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-navy rounded-lg">
            <SettingsIcon size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy">Setări</h1>
            <p className="text-gray">Configurează modulele platformei</p>
          </div>
        </div>
      </div>

      {/* Module Toggles */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light">
          <h2 className="text-xl font-bold text-navy">Module Active</h2>
        </div>

        <div className="divide-y divide-gray-light">
          {settings.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray">
              Nu există setări disponibile
            </div>
          ) : (
            settings.map((setting) => (
              <div key={setting.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-smooth">
                <div className="flex-1">
                  <h3 className="font-semibold text-navy mb-1">
                    {setting.key.split(".")[1]?.replace(/([A-Z])/g, " $1").trim() || setting.key}
                  </h3>
                  <p className="text-sm text-gray">
                    {setting.description || "Fără descriere"}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(setting.key, setting.value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.value === "true"
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                  disabled={saving}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.value === "true" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {settings.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-light">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                ✓ Setările au fost salvate cu succes!
              </div>
            )}

            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
              <Save size={18} />
              {saving ? "Se salvează..." : "Salvează Modificările"}
            </Button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-navy mb-2">ℹ️ Despre Setări</h3>
        <p className="text-sm text-gray mb-2">
          Modulele pot fi activate sau dezactivate pentru a controla ce
          funcționalități sunt disponibile pe platformă.
        </p>
        <ul className="text-sm text-gray space-y-1 list-disc list-inside">
          <li>
            <strong>Calculator:</strong> Afișează calculatorul de buget pe landing page
          </li>
          <li>
            <strong>Pricing:</strong> Afișează secțiunea de prețuri pe landing page
          </li>
          <li>
            <strong>FAQ:</strong> Afișează secțiunea de întrebări frecvente
          </li>
          <li>
            <strong>Contracts:</strong> Permite generarea de contracte în admin
          </li>
          <li>
            <strong>Notifications:</strong> Activează notificările prin email
          </li>
        </ul>
      </div>
    </div>
  );
}

