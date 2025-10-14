"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
  userId: string;
  clientName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SendNotificationModal({
  userId,
  clientName,
  onClose,
  onSuccess,
}: Props) {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    type: "info",
    title: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Eroare la trimiterea notificării");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-light">
          <div>
            <h2 className="text-2xl font-bold text-navy">Trimite Notificare</h2>
            <p className="text-sm text-gray">Către: {clientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <X size={24} className="text-navy" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Tip Notificare *
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy"
              required
              disabled={sending}
            >
              <option value="info">Informație</option>
              <option value="success">Succes</option>
              <option value="warning">Avertizare</option>
              <option value="error">Eroare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Titlu *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ex: Actualizare Timeline"
              required
              disabled={sending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Mesaj *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Scrie mesajul notificării..."
              rows={5}
              required
              disabled={sending}
              className="w-full px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy resize-none"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={sending}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {sending ? "Se trimite..." : "Trimite Notificare"}
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth"
              disabled={sending}
            >
              Anulează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

