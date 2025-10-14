"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Edit, Trash2, Download } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  industry: string;
  status: string;
  packageName: string | null;
  createdAt: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/admin/clients");
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "success" | "warning" | "info" | "default"> =
      {
        ACTIVE: "success",
        PENDING: "warning",
        COMPLETED: "info",
        INACTIVE: "default",
      };
    return variants[status] || "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Clienți</h1>
        <div className="flex gap-2">
          <a
            href="/api/admin/export/clients"
            download
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-smooth font-semibold"
          >
            <Download size={20} />
            Export CSV
          </a>
          <Link
            href="/admin/clients/new"
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy/90 transition-smooth font-semibold"
          >
            <Plus size={20} />
            Adaugă Client
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-light">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
            size={20}
          />
          <Input
            type="text"
            placeholder="Caută după nume, email sau industrie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center text-gray">Se încarcă...</div>
        ) : filteredClients.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray">
            {searchTerm ? "Niciun client găsit." : "Nu există clienți încă."}
            {!searchTerm && (
              <>
                {" "}
                <Link
                  href="/admin/clients/new"
                  className="text-navy hover:underline font-semibold"
                >
                  Adaugă primul client
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Nume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Industrie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Pachet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-navy">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {client.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {client.packageName || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadge(client.status)}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="p-2 text-navy hover:bg-navy/10 rounded-lg transition-smooth"
                          title="Vezi detalii"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/clients/${client.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-smooth"
                          title="Editează"
                        >
                          <Edit size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-white rounded-xl p-4 border border-gray-light">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray">
            Total: <strong className="text-navy">{filteredClients.length}</strong>{" "}
            clienți
          </span>
          {searchTerm && (
            <span className="text-gray">
              Afișează rezultatele pentru: <strong>{searchTerm}</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

