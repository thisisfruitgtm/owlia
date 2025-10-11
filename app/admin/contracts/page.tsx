"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Download, Eye, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Contract {
  id: string;
  data: {
    contractNumber?: string;
    title?: string;
    clientName?: string;
    packageName?: string;
    [key: string]: any;
  };
  status: string;
  createdAt: string;
  client: {
    id: string;
    name: string;
  };
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await fetch("/api/admin/contracts/all");
      const data = await response.json();
      setContracts(data.contracts || []);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (contractId: string) => {
    window.open(`/api/admin/contracts/${contractId}/download`, "_blank");
  };

  const filteredContracts = contracts.filter((contract) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contract.client.name.toLowerCase().includes(searchLower) ||
      contract.data.contractNumber?.toLowerCase().includes(searchLower) ||
      contract.data.packageName?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "success" | "warning" | "info" | "default"> = {
      SIGNED: "success",
      SENT: "info",
      DRAFT: "warning",
    };
    return variants[status] || "default";
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
          <h1 className="text-3xl font-bold text-navy">Contracte</h1>
          <p className="text-gray mt-1">
            {contracts.length} {contracts.length === 1 ? "contract" : "contracte"} total
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-light">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" size={20} />
          <input
            type="text"
            placeholder="Caută după client, număr contract sau pachet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        {filteredContracts.length === 0 ? (
          <div className="text-center py-12 text-gray">
            <FileText size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">
              {searchTerm ? "Niciun contract găsit" : "Niciun contract generat încă"}
            </p>
            <p className="text-sm">
              {searchTerm
                ? "Încearcă alt termen de căutare"
                : "Generează contracte din paginile clientului"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-light">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Pachet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-navy/10 rounded-lg">
                          <FileText className="text-navy" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-navy">
                            {contract.data.title || "Contract"}
                          </div>
                          <div className="text-sm text-gray">
                            Nr. {contract.data.contractNumber || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/clients/${contract.client.id}`}
                        className="font-medium text-navy hover:underline"
                      >
                        {contract.client.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {contract.data.packageName || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadge(contract.status)}>
                        {contract.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {new Date(contract.createdAt).toLocaleDateString("ro-RO")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/clients/${contract.client.id}`}
                          className="p-2 text-navy hover:bg-navy/10 rounded-lg transition-smooth"
                          title="Vezi client"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDownload(contract.id)}
                          className="p-2 text-navy hover:bg-navy/10 rounded-lg transition-smooth"
                          title="Descarcă PDF"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="text-sm text-gray mb-1">Total Contracte</div>
          <div className="text-3xl font-bold text-navy">{contracts.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="text-sm text-gray mb-1">Semnate</div>
          <div className="text-3xl font-bold text-green-600">
            {contracts.filter((c) => c.status === "SIGNED").length}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="text-sm text-gray mb-1">Draft</div>
          <div className="text-3xl font-bold text-orange-600">
            {contracts.filter((c) => c.status === "DRAFT").length}
          </div>
        </div>
      </div>
    </div>
  );
}

