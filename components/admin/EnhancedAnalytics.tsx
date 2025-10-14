"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

interface Props {
  metrics: Metric[];
}

export default function EnhancedAnalytics({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 border border-gray-light">
          <p className="text-sm text-gray mb-2">{metric.label}</p>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-navy">{metric.value}</div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              metric.trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {metric.trend === "up" ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

