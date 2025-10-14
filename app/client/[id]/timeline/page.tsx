import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { Calendar, CheckCircle2, Clock, AlertCircle, PlayCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import TimelineGantt from "@/components/client/TimelineGantt";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientTimelinePage({ params }: Props) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      package: true,
      timeline: {
        orderBy: { month: "asc" },
      },
      contracts: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });
  
  // Get start date from contract
  let startDate = new Date();
  if (client?.contracts.length && client.contracts[0].data) {
    const contractData = client.contracts[0].data as any;
    if (contractData.contractDate) {
      const parts = contractData.contractDate.split(".");
      if (parts.length === 3) {
        startDate = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0])
        );
      }
    }
  }

  if (!client) {
    redirect("/auth/login");
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 size={24} className="text-green-600" />;
      case "IN_PROGRESS":
        return <PlayCircle size={24} className="text-blue-600" />;
      case "DELAYED":
        return <AlertCircle size={24} className="text-red-600" />;
      default:
        return <Clock size={24} className="text-gray" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success" as const;
      case "IN_PROGRESS":
        return "info" as const;
      case "DELAYED":
        return "warning" as const;
      default:
        return "default" as const;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Completată";
      case "IN_PROGRESS":
        return "În Progres";
      case "DELAYED":
        return "Întârziată";
      default:
        return "În Așteptare";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">
              Timeline Proiect
            </h1>
            <p className="text-gray">
              Urmărește progresul proiectului tău în timpul celor 12 luni
            </p>
          </div>
          {client.package && (
            <Badge variant="info" className="text-lg px-4 py-2">
              {client.package.name}
            </Badge>
          )}
        </div>
      </div>

      {/* Gantt Chart */}
      {client.timeline.length > 0 && (
        <TimelineGantt timeline={client.timeline as any} startDate={startDate} />
      )}

      {/* Timeline */}
      {client.timeline.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <Calendar size={64} className="mx-auto mb-4 text-gray opacity-30" />
          <h3 className="text-xl font-bold text-navy mb-2">
            Timeline în Pregătire
          </h3>
          <p className="text-gray">
            Timeline-ul va fi disponibil în curând. Echipa OWLIA va configura
            etapele proiectului tău.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-light" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {client.timeline.map((item, index) => (
              <div key={item.id} className="relative flex gap-6">
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    ${
                      item.status === "COMPLETED"
                        ? "bg-green-100"
                        : item.status === "IN_PROGRESS"
                        ? "bg-blue-100"
                        : item.status === "DELAYED"
                        ? "bg-red-100"
                        : "bg-gray-100"
                    }
                  `}
                  >
                    {getStatusIcon(item.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-6 border border-gray-light">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-gray bg-gray-100 px-3 py-1 rounded-full">
                          Luna {item.month}
                        </span>
                        <Badge variant={getStatusVariant(item.status)}>
                          {getStatusLabel(item.status)}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-navy">
                        {item.milestone}
                      </h3>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-gray mb-4">{item.description}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm">
                    {item.dueDate && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray" />
                        <span className="text-gray">
                          Scadență:{" "}
                          {new Date(item.dueDate).toLocaleDateString("ro-RO")}
                        </span>
                      </div>
                    )}
                    {item.completedAt && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-600" />
                        <span className="text-green-600">
                          Completată:{" "}
                          {new Date(item.completedAt).toLocaleDateString("ro-RO")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-navy mb-2">
          Despre Timeline
        </h3>
        <p className="text-gray">
          Fiecare etapă din timeline reprezintă un milestone important în dezvoltarea
          proiectului tău. Vei fi notificat când o nouă etapă începe și când este
          completată. Dacă ai întrebări despre orice etapă, nu ezita să ne contactezi.
        </p>
      </div>
    </div>
  );
}

