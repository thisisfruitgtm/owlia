"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, Calculator, Package, FileText, Filter, Search, CheckCircle2, XCircle, Download, UserPlus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import ConvertLeadModal from "@/components/admin/ConvertLeadModal";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  industry: string | null;
  revenue: number | null;
  targetClients: number | null;
  recommendedBudget: string | null;
  recommendedPackage: string | null;
  source: string | null;
  packageInterest: string | null;
  converted: boolean;
  createdAt: string;
  guideAccess: any[];
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterConverted, setFilterConverted] = useState("all");
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, filterSource, filterConverted]);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads");
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Source filter
    if (filterSource !== "all") {
      filtered = filtered.filter((lead) => lead.source === filterSource);
    }

    // Conversion filter
    if (filterConverted !== "all") {
      filtered = filtered.filter(
        (lead) => lead.converted === (filterConverted === "converted")
      );
    }

    setFilteredLeads(filtered);
  };

  const toggleConverted = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ converted: !currentStatus }),
      });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const getSourceIcon = (source: string | null) => {
    switch (source) {
      case "calculator":
        return <Calculator size={16} />;
      case "package-modal":
        return <Package size={16} />;
      case "guide":
        return <FileText size={16} />;
      default:
        return <Users size={16} />;
    }
  };

  const getSourceLabel = (source: string | null) => {
    switch (source) {
      case "calculator":
        return "Calculator";
      case "package-modal":
        return "Package Modal";
      case "guide":
        return "Guide Download";
      default:
        return "Unknown";
    }
  };

  const stats = {
    total: leads.length,
    converted: leads.filter((l) => l.converted).length,
    calculator: leads.filter((l) => l.source === "calculator").length,
    packageModal: leads.filter((l) => l.source === "package-modal").length,
    guide: leads.filter((l) => l.source === "guide").length,
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Lead Management</h1>
          <p className="text-gray">
            Toate lead-urile capturate din calculator, package modal și ghid
          </p>
        </div>
        <a
          href="/api/admin/export/leads"
          download
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-smooth font-semibold"
        >
          <Download size={20} />
          Export CSV
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-navy" />
            <span className="text-sm text-gray">Total Leads</span>
          </div>
          <p className="text-2xl font-bold text-navy">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 size={20} className="text-green-600" />
            <span className="text-sm text-gray">Convertiți</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Calculator size={20} className="text-blue-600" />
            <span className="text-sm text-gray">Calculator</span>
          </div>
          <p className="text-2xl font-bold text-navy">{stats.calculator}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Package size={20} className="text-purple-600" />
            <span className="text-sm text-gray">Package</span>
          </div>
          <p className="text-2xl font-bold text-navy">{stats.packageModal}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <FileText size={20} className="text-orange-600" />
            <span className="text-sm text-gray">Ghid</span>
          </div>
          <p className="text-2xl font-bold text-navy">{stats.guide}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
              />
              <Input
                type="text"
                placeholder="Caută după email, nume, industrie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            <option value="all">Toate sursele</option>
            <option value="calculator">Calculator</option>
            <option value="package-modal">Package Modal</option>
            <option value="guide">Ghid</option>
          </select>

          <select
            value={filterConverted}
            onChange={(e) => setFilterConverted(e.target.value)}
            className="px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            <option value="all">Toate statusurile</option>
            <option value="converted">Convertiți</option>
            <option value="not-converted">Neconvertiți</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-light">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Lead Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Business
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Recomandare
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Sursă
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-navy">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray">
                    Niciun lead găsit
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-smooth">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-navy">
                          {lead.name || "Anonim"}
                        </p>
                        <p className="text-sm text-gray">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-xs text-gray">{lead.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.industry ? (
                        <div>
                          <p className="text-sm font-medium text-navy">
                            {lead.industry}
                          </p>
                          {lead.revenue && (
                            <p className="text-xs text-gray">
                              {(lead.revenue / 1000).toFixed(0)}K RON
                            </p>
                          )}
                          {lead.targetClients && (
                            <p className="text-xs text-gray">
                              {lead.targetClients} clienți
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {lead.recommendedPackage ? (
                        <div>
                          <Badge variant="info" size="sm">
                            {lead.recommendedPackage}
                          </Badge>
                          {lead.recommendedBudget && (
                            <p className="text-xs text-gray mt-1">
                              {lead.recommendedBudget} RON
                            </p>
                          )}
                        </div>
                      ) : lead.packageInterest ? (
                        <Badge variant="warning" size="sm">
                          {lead.packageInterest}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(lead.source)}
                        <span className="text-sm text-navy">
                          {getSourceLabel(lead.source)}
                        </span>
                      </div>
                      {lead.guideAccess.length > 0 && (
                        <p className="text-xs text-gray mt-1">
                          +{lead.guideAccess.length} guide download(s)
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {lead.converted ? (
                        <Badge variant="success" size="sm">
                          Convertit
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          Lead
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray">
                        {new Date(lead.createdAt).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!lead.converted && (
                          <button
                            onClick={() => setConvertingLead(lead)}
                            className="px-3 py-1 text-sm font-semibold rounded-lg transition-smooth bg-navy text-white hover:bg-navy/90 flex items-center gap-1"
                          >
                            <UserPlus size={14} />
                            Client
                          </button>
                        )}
                        <button
                          onClick={() => toggleConverted(lead.id, lead.converted)}
                          className={`px-3 py-1 text-sm font-semibold rounded-lg transition-smooth ${
                            lead.converted
                              ? "bg-gray-100 text-gray hover:bg-gray-200"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                        >
                          {lead.converted ? (
                            <span className="flex items-center gap-1">
                              <XCircle size={14} />
                              Revert
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={14} />
                              Marchează
                            </span>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert Lead Modal */}
      {convertingLead && (
        <ConvertLeadModal
          lead={convertingLead}
          onClose={() => setConvertingLead(null)}
          onSuccess={fetchLeads}
        />
      )}
    </div>
  );
}

