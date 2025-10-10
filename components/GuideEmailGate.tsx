"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface Props {
  onUnlock: (guideAccessId: string) => void;
}

export default function GuideEmailGate({ onUnlock }: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/guide/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          gdprConsent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to unlock guide");
      }

      const { guideAccessId } = await response.json();
      
      // Unlock the guide
      onUnlock(guideAccessId);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("A apărut o eroare. Te rugăm să încerci din nou.");
    }
  };

  return (
    <div className="fixed inset-0 bg-navy/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-10 relative animate-slide-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📥</div>
          <h2 className="text-3xl font-bold text-navy mb-3">
            Descarcă Ghidul Gratuit
          </h2>
          <p className="text-gray text-lg">
            "Cât Buget să Aloci pentru Marketing în Primul An"
          </p>
        </div>

        <div className="bg-cream rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-navy mb-3">Ce vei descoperi:</h3>
          <ul className="space-y-2 text-gray">
            <li className="flex items-start gap-2">
              <span className="text-navy">✓</span>
              <span>Procente recomandate pentru fiecare industrie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy">✓</span>
              <span>Calculator simplu de buget</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy">✓</span>
              <span>Top 7 greșeli de evitat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy">✓</span>
              <span>Ce cheltuieli sunt eligibile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy">✓</span>
              <span>Checklist complet de implementare</span>
            </li>
          </ul>
        </div>

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
              placeholder="email@exemplu.ro"
              className="w-full px-5 py-4 border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth text-lg"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="mt-1.5 w-5 h-5 text-navy border-gray-light rounded focus:ring-navy"
              />
              <span className="text-sm text-gray leading-relaxed">
                Sunt de acord cu{" "}
                <Link
                  href="/politica-confidentialitate"
                  target="_blank"
                  className="text-navy underline hover:no-underline"
                >
                  politica de confidențialitate
                </Link>
                {" "}și să primesc ghidul gratuit pe email *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !gdprConsent}
            className="w-full py-5 bg-navy hover:bg-navy/90 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "⏳ Se procesează..."
            ) : (
              <>
                <span>📥</span>
                Deblochează Ghidul Gratuit
              </>
            )}
          </button>

          <p className="text-xs text-gray text-center mt-4">
            Ghidul va fi afișat instant și vei primi o copie PDF pe email
          </p>
        </form>
      </div>
    </div>
  );
}

