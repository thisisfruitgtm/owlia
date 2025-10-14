"use client";

interface TimelineItem {
  id: string;
  month: number;
  milestone: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  completedAt: string | null;
}

interface Props {
  timeline: TimelineItem[];
  startDate: Date;
}

export default function TimelineGantt({ timeline, startDate }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "DELAYED":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getMonthName = (monthOffset: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthOffset - 1);
    return date.toLocaleDateString("ro-RO", { month: "short", year: "numeric" });
  };

  const totalMonths = Math.max(...timeline.map((t) => t.month), 12);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-light overflow-x-auto">
      <h3 className="text-xl font-bold text-navy mb-6">Timeline Gantt (12 Luni)</h3>

      {/* Month Headers */}
      <div className="flex gap-1 mb-4 min-w-[800px]">
        <div className="w-48 flex-shrink-0" />
        {Array.from({ length: totalMonths }, (_, i) => (
          <div
            key={i}
            className="flex-1 text-center text-xs font-semibold text-gray border-l border-gray-light px-1"
          >
            <div>{getMonthName(i + 1)}</div>
            <div className="text-navy">L{i + 1}</div>
          </div>
        ))}
      </div>

      {/* Timeline Rows */}
      <div className="space-y-2 min-w-[800px]">
        {timeline.map((item) => (
          <div key={item.id} className="flex gap-1 items-center group">
            {/* Milestone Name */}
            <div className="w-48 flex-shrink-0 pr-4">
              <p className="text-sm font-semibold text-navy truncate">
                {item.milestone}
              </p>
              <p className="text-xs text-gray truncate">
                {item.description}
              </p>
            </div>

            {/* Gantt Bar */}
            <div className="flex-1 relative h-12 flex items-center">
              <div className="absolute inset-0 flex gap-1">
                {Array.from({ length: totalMonths }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 border-l border-gray-light ${
                      i === item.month - 1 ? "bg-gray-50" : ""
                    }`}
                  />
                ))}
              </div>

              {/* Bar */}
              <div
                className="absolute h-8 rounded-lg flex items-center px-3 shadow-md transition-all group-hover:shadow-lg"
                style={{
                  left: `${((item.month - 1) / totalMonths) * 100}%`,
                  width: `${(1 / totalMonths) * 100}%`,
                }}
              >
                <div
                  className={`w-full h-full rounded-lg ${getStatusColor(
                    item.status
                  )} flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-semibold">
                    L{item.month}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 pt-6 border-t border-gray-light">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-sm text-gray">Completată</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span className="text-sm text-gray">În Progres</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-sm text-gray">Întârziată</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300" />
          <span className="text-sm text-gray">În Așteptare</span>
        </div>
      </div>
    </div>
  );
}

