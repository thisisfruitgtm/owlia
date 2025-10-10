import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    label: string;
  };
  color?: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-light hover:shadow-lg transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        {change && (
          <span
            className={`text-sm font-semibold ${
              change.value >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change.value >= 0 ? "+" : ""}
            {change.value}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-navy mb-1">{value}</h3>
      <p className="text-sm text-gray">{title}</p>
      {change && (
        <p className="text-xs text-gray mt-2">{change.label}</p>
      )}
    </div>
  );
}

