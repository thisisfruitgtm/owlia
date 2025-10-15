"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { posthog } from "@/lib/analytics/posthog";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!gdprConsent) {
      setError("Trebuie să accepți politica de confidențialitate");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/guide/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, gdprConsent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "A apărut o eroare");
      }

      setSuccess(true);
      setDownloadUrl(data.downloadUrl);
      
      // Track guide download in PostHog
      if (typeof window !== 'undefined' && posthog) {
        posthog.capture('guide_download_started', {
          email,
          access_id: data.accessId,
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setGdprConsent(false);
    setError("");
    setSuccess(false);
    setDownloadUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray hover:text-navy transition-smooth"
        >
          <X size={24} />
        </button>

        {!success ? (
          <>
            <h2 className="text-3xl font-bold text-navy mb-4">
              Descarcă Ghidul Gratuit
            </h2>
            <p className="text-gray mb-6">
              Îți trimitem pe email ghidul complet despre alocarea corectă a
              bugetului de marketing pentru Start-Up Nation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email-ul tău"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-navy border-gray-light rounded focus:ring-navy"
                  disabled={loading}
                />
                <label htmlFor="gdpr" className="text-sm text-gray">
                  Sunt de acord ca datele mele să fie procesate conform{" "}
                  <a
                    href="/politica-confidentialitate"
                    target="_blank"
                    className="text-navy underline"
                  >
                    Politicii de confidențialitate
                  </a>
                </label>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Se trimite..." : "Trimite-mi Ghidul"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
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
            <h3 className="text-2xl font-bold text-navy mb-3">
              Email trimis cu succes!
            </h3>
            <p className="text-gray mb-6">
              Verifică inbox-ul la <strong>{email}</strong> pentru linkul de
              download. Dacă nu vezi email-ul, verifică și folderul spam.
            </p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-navy text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-xl transition-smooth mb-4"
              >
                Deschide Ghidul Acum
              </a>
            )}
            <button
              onClick={handleClose}
              className="block w-full text-gray hover:text-navy transition-smooth"
            >
              Închide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

