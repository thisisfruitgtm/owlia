import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { Package, Calendar, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDashboard({ params }: Props) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: true,
      package: true,
      timeline: {
        orderBy: { month: "asc" },
      },
      contracts: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
      files: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!client) {
    redirect("/auth/login");
  }

  // Calculate progress
  const completedMilestones = client.timeline.filter((t) => t.status === "COMPLETED").length;
  const totalMilestones = client.timeline.length;
  const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  // Next milestone
  const nextMilestone = client.timeline.find(
    (t) => t.status === "PENDING" || t.status === "IN_PROGRESS"
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-navy to-navy/80 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Bine ai venit, {client.name}!
        </h2>
        <p className="text-white/80">
          Aici poți urmări progresul proiectului tău și accesa toate documentele.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Pachet</p>
              <p className="text-xl font-bold text-navy">
                {client.package?.name || "Fără pachet"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Progres</p>
              <p className="text-xl font-bold text-navy">{progress.toFixed(0)}%</p>
            </div>
          </div>
          <div className="w-full bg-gray-light rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <FileText className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Contracte</p>
              <p className="text-xl font-bold text-navy">{client.contracts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Calendar className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Etape</p>
              <p className="text-xl font-bold text-navy">
                {completedMilestones}/{totalMilestones}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Milestone */}
      {nextMilestone && (
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-navy mb-1">
                Următoarea Etapă
              </h3>
              <p className="text-sm text-gray">Luna {nextMilestone.month}</p>
            </div>
            <Badge
              variant={
                nextMilestone.status === "IN_PROGRESS"
                  ? "warning"
                  : nextMilestone.status === "COMPLETED"
                  ? "success"
                  : "default"
              }
            >
              {nextMilestone.status === "IN_PROGRESS"
                ? "În Progres"
                : nextMilestone.status === "COMPLETED"
                ? "Completată"
                : nextMilestone.status === "DELAYED"
                ? "Întârziată"
                : "În Așteptare"}
            </Badge>
          </div>
          <h4 className="text-xl font-bold text-navy mb-2">
            {nextMilestone.milestone}
          </h4>
          {nextMilestone.description && (
            <p className="text-gray">{nextMilestone.description}</p>
          )}
          {nextMilestone.dueDate && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Clock size={16} className="text-gray" />
              <span className="text-gray">
                Scadență:{" "}
                {new Date(nextMilestone.dueDate).toLocaleDateString("ro-RO")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contracts */}
        <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-light">
            <h3 className="text-lg font-bold text-navy">Contracte Recente</h3>
          </div>
          <div className="p-6">
            {client.contracts.length === 0 ? (
              <p className="text-center text-gray py-8">Niciun contract încă</p>
            ) : (
              <div className="space-y-3">
                {client.contracts.map((contract: any) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-navy" />
                      <div>
                        <p className="font-semibold text-navy text-sm">
                          {contract.data.title || "Contract"}
                        </p>
                        <p className="text-xs text-gray">
                          {new Date(contract.createdAt).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        contract.status === "SIGNED"
                          ? "success"
                          : contract.status === "SENT"
                          ? "info"
                          : "default"
                      }
                    >
                      {contract.status === "SIGNED"
                        ? "Semnat"
                        : contract.status === "SENT"
                        ? "Trimis"
                        : contract.status === "CANCELLED"
                        ? "Anulat"
                        : "Draft"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Files */}
        <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-light">
            <h3 className="text-lg font-bold text-navy">Fișiere Recente</h3>
          </div>
          <div className="p-6">
            {client.files.length === 0 ? (
              <p className="text-center text-gray py-8">Niciun fișier încă</p>
            ) : (
              <div className="space-y-3">
                {client.files.map((file: any) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FileText size={16} className="text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <AlertCircle className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-navy mb-1">
              Ai nevoie de ajutor?
            </h3>
            <p className="text-gray mb-4">
              Echipa OWLIA este aici pentru tine. Contactează-ne pentru orice întrebare.
            </p>
            <a
              href="mailto:contact@owlia.ro"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2 rounded-xl hover:bg-navy/90 transition-smooth font-semibold"
            >
              Contactează Echipa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

