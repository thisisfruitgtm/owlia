"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Mail, Phone, Briefcase, DollarSign } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ContractsSection from "@/components/admin/ContractsSection";

interface ClientDetail {
  id: string;
  name: string;
  phone: string | null;
  industry: string;
  revenue: number;
  targetClients: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
  package: {
    id: string;
    name: string;
    price: number;
  } | null;
  timeline: any[];
  contracts: any[];
  files: any[];
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchClient();
    }
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${params.id}`);
      const data = await response.json();
      setClient(data.client);
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/clients/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/clients");
      } else {
        alert("Eroare la ștergerea clientului");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Eroare la ștergerea clientului");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray">Se încarcă...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray mb-4">Client nu a fost găsit.</p>
        <Link href="/admin/clients" className="text-navy hover:underline">
          Înapoi la lista de clienți
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "success" | "warning" | "info" | "default"> = {
      ACTIVE: "success",
      PENDING: "warning",
      COMPLETED: "info",
      INACTIVE: "default",
    };
    return variants[status] || "default";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <ArrowLeft size={24} className="text-navy" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-navy">{client.name}</h1>
            <p className="text-gray">{client.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy/90 transition-smooth font-semibold"
          >
            <Edit size={18} />
            Editează
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-smooth font-semibold"
          >
            <Trash2 size={18} />
            Șterge
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Mail size={20} className="text-blue-600" />
            <span className="text-sm text-gray">Email</span>
          </div>
          <p className="text-lg font-semibold text-navy">{client.user.email}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Phone size={20} className="text-green-600" />
            <span className="text-sm text-gray">Telefon</span>
          </div>
          <p className="text-lg font-semibold text-navy">
            {client.phone || "N/A"}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-purple-600" />
            <span className="text-sm text-gray">Industrie</span>
          </div>
          <p className="text-lg font-semibold text-navy">{client.industry}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={20} className="text-orange-600" />
            <span className="text-sm text-gray">Status</span>
          </div>
          <Badge variant={getStatusBadge(client.status)}>
            {client.status}
          </Badge>
        </div>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <h2 className="text-xl font-bold text-navy mb-4">Informații Business</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray">Venituri estimate:</span>
              <span className="font-semibold text-navy">
                {(client.revenue / 1000).toFixed(0)}K RON
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Clienți țintă:</span>
              <span className="font-semibold text-navy">
                {client.targetClients}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Pachet:</span>
              <span className="font-semibold text-navy">
                {client.package?.name || "Fără pachet"}
              </span>
            </div>
            {client.package && (
              <div className="flex justify-between">
                <span className="text-gray">Preț pachet:</span>
                <span className="font-semibold text-navy">
                  {(client.package.price / 1000).toFixed(0)}K RON
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <h2 className="text-xl font-bold text-navy mb-4">Informații Cont</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray">Creat la:</span>
              <span className="font-semibold text-navy">
                {new Date(client.createdAt).toLocaleDateString("ro-RO")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Ultimul update:</span>
              <span className="font-semibold text-navy">
                {new Date(client.updatedAt).toLocaleDateString("ro-RO")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">User ID:</span>
              <span className="font-mono text-sm text-navy">{client.user.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder sections */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <h2 className="text-xl font-bold text-navy mb-4">Timeline</h2>
        <p className="text-gray">Timeline va fi implementat în Faza 5</p>
      </div>

      <ContractsSection clientId={client.id} contracts={client.contracts || []} />

      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <h2 className="text-xl font-bold text-navy mb-4">Fișiere</h2>
        <p className="text-gray">Fișiere vor fi implementate în Faza 6</p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Ștergi clientul?
            </h3>
            <p className="text-gray mb-6">
              Această acțiune va șterge permanent clientul <strong>{client.name}</strong> și
              toate datele asociate (contracte, fișiere, timeline). Acțiunea nu poate fi anulată.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {deleting ? "Se șterge..." : "Da, șterge"}
              </Button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth"
                disabled={deleting}
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

