import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { FileText, Download, Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientContractsPage({ params }: Props) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      contracts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) {
    redirect("/auth/login");
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "SIGNED":
        return "success" as const;
      case "SENT":
        return "info" as const;
      case "CANCELLED":
        return "default" as const;
      default:
        return "warning" as const;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "SIGNED":
        return "Semnat";
      case "SENT":
        return "Trimis";
      case "CANCELLED":
        return "Anulat";
      default:
        return "Draft";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <h1 className="text-3xl font-bold text-navy mb-2">Contracte</h1>
        <p className="text-gray">
          Toate contractele tale în format PDF, disponibile pentru download
        </p>
      </div>

      {/* Contracts List */}
      {client.contracts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray opacity-30" />
          <h3 className="text-xl font-bold text-navy mb-2">
            Niciun contract încă
          </h3>
          <p className="text-gray">
            Contractele tale vor apărea aici după ce sunt generate de echipa OWLIA
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {client.contracts.map((contract: any) => (
            <div
              key={contract.id}
              className="bg-white rounded-xl p-6 border border-gray-light hover:border-navy/20 transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-navy/5 rounded-xl">
                      <FileText size={24} className="text-navy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy">
                        {contract.data.title || "Contract de Servicii"}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(contract.createdAt).toLocaleDateString("ro-RO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <Badge variant={getStatusVariant(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {contract.data.packageName && (
                    <div className="mb-3">
                      <p className="text-sm text-gray">
                        Pachet: <span className="font-semibold text-navy">{contract.data.packageName}</span>
                      </p>
                      {contract.data.packagePrice && (
                        <p className="text-sm text-gray">
                          Valoare:{" "}
                          <span className="font-semibold text-navy">
                            {(contract.data.packagePrice / 1000).toFixed(0)}K RON
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {contract.data.contractNumber && (
                    <p className="text-xs text-gray font-mono">
                      Nr. Contract: {contract.data.contractNumber}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {contract.pdfUrl && (
                    <a
                      href={`/api/admin/contracts/${contract.id}/download`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-xl hover:bg-navy/90 transition-smooth font-semibold whitespace-nowrap"
                    >
                      <Download size={18} />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>

              {contract.status === "SENT" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-900">
                    📩 Contractul a fost trimis. Te rugăm să îl semnezi și să ne returnezi o copie scanată.
                  </p>
                </div>
              )}

              {contract.status === "SIGNED" && contract.data.contractDate && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-900">
                    ✅ Contract semnat la data de {contract.data.contractDate}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-navy mb-2">
          Despre Contracte
        </h3>
        <p className="text-gray mb-3">
          Toate contractele sunt generate în format PDF și pot fi descărcate oricând.
          După ce primești un contract, te rugăm să:
        </p>
        <ul className="list-disc list-inside text-gray space-y-1">
          <li>Citești cu atenție toate clauzele</li>
          <li>Semnezi documentul</li>
          <li>Trimiți o copie scanată la contact@owlia.ro</li>
        </ul>
      </div>
    </div>
  );
}

