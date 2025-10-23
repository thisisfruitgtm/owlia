"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Building2, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";

export default function ClientOnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    cui: "",
    regCom: "",
    address: "",
    legalRepName: "",
    legalRepRole: "",
    phone: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    verifyToken();
  }, [params.token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(`/api/onboarding/verify?token=${params.token}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Token invalid sau expirat");
      }

      setClient(data.client);
      // Pre-fill existing data if any
      setFormData({
        companyName: data.client.companyName || "",
        cui: data.client.cui || "",
        regCom: data.client.regCom || "",
        address: data.client.address || "",
        legalRepName: data.client.legalRepName || "",
        legalRepRole: data.client.legalRepRole || "",
        phone: data.client.phone || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: params.token,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la salvarea datelor");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-navy mx-auto mb-4" />
          <p className="text-gray">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (error && !client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Link Invalid</h1>
          <p className="text-gray mb-6">{error}</p>
          <p className="text-sm text-gray">
            Dacă ai nevoie de ajutor, contactează-ne la{" "}
            <a href="mailto:contact@owlia.ro" className="text-navy hover:underline font-semibold">
              contact@owlia.ro
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Date Salvate!</h1>
          <p className="text-gray mb-6">
            Mulțumim! Datele companiei tale au fost salvate cu succes. 
            Echipa OWLIA te va contacta în curând pentru următorii pași.
          </p>
          <a
            href={`/client/${client.id}`}
            className="inline-block px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy/90 transition-smooth"
          >
            Mergi la Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-navy mb-2">Bine ai venit, {client.name}!</h1>
          <p className="text-gray">
            Completează datele companiei tale pentru a continua colaborarea cu OWLIA
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-light">
            <div className="p-3 bg-navy/10 rounded-xl">
              <Building2 size={24} className="text-navy" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Date Companie</h2>
              <p className="text-sm text-gray">Toate câmpurile sunt obligatorii</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Denumire Companie *
              </label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Ex: SC COMPANIA MEA SRL"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  CUI *
                </label>
                <Input
                  value={formData.cui}
                  onChange={(e) => setFormData({ ...formData, cui: e.target.value })}
                  placeholder="Ex: RO12345678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Reg. Com. *
                </label>
                <Input
                  value={formData.regCom}
                  onChange={(e) => setFormData({ ...formData, regCom: e.target.value })}
                  placeholder="Ex: J40/1234/2020"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Adresa Completă (Sediu Social) *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Strada, număr, bloc, scară, etaj, ap, sector/oraș, județ"
                rows={3}
                className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Reprezentant Legal (Nume Complet) *
                </label>
                <Input
                  value={formData.legalRepName}
                  onChange={(e) => setFormData({ ...formData, legalRepName: e.target.value })}
                  placeholder="Ex: Ion Popescu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Funcție Reprezentant *
                </label>
                <Input
                  value={formData.legalRepRole}
                  onChange={(e) => setFormData({ ...formData, legalRepRole: e.target.value })}
                  placeholder="Ex: Director General"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Telefon Contact *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: 0778767940"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Notă:</strong> Aceste date vor fi folosite pentru generarea contractului de colaborare.
                Asigură-te că toate informațiile sunt corecte.
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Se salvează...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Salvează Date
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray mt-6">
          Ai întrebări? Contactează-ne la{" "}
          <a href="mailto:contact@owlia.ro" className="text-navy hover:underline font-semibold">
            contact@owlia.ro
          </a>
        </p>
      </div>
    </div>
  );
}

