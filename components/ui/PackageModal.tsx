"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
  prefilledEmail?: string;
  leadId?: string;
}

export default function PackageModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
  prefilledEmail,
  leadId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(prefilledEmail || "");
  const [phone, setPhone] = useState("+40");
  const [gdprConsent, setGdprConsent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/leads/package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          email,
          phone: phone !== "+40" ? phone : null,
          packageName,
          packagePrice,
          gdprConsent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save lead");
      }

      const { whatsappUrl } = await response.json();
      
      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray hover:text-navy text-2xl font-bold"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-navy mb-2">
          {packageName}
        </h3>
        <p className="text-gray mb-6">
          Completează datele pentru a continua discuția pe WhatsApp
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-navy mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-navy mb-2">
              Telefon (opțional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+40712345678"
              className="w-full px-4 py-3 border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-navy border-gray-light rounded focus:ring-navy"
              />
              <span className="text-sm text-gray">
                Sunt de acord cu{" "}
                <Link
                  href="/politica-confidentialitate"
                  target="_blank"
                  className="text-navy underline hover:no-underline"
                >
                  politica de confidențialitate
                </Link>
                {" "}și procesarea datelor personale *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !gdprConsent}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "⏳ Se procesează..."
            ) : (
              <>
                <span>💬</span>
                Continuă pe WhatsApp
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray text-center mt-4">
          Prețul afișat: <strong>{packagePrice} lei</strong>
        </p>
      </div>
    </div>
  );
}

