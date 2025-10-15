"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, Package, FileText, Calendar, Mail, CheckCircle2, Clock, Eye, MousePointer } from "lucide-react";

interface Analytics {
  traffic?: {
    pageviews: {
      total: number;
      trend: number[];
      labels: string[];
    };
    sessions: {
      total: number;
      trend: number[];
      labels: string[];
    };
    topPages: Array<{
      page: string;
      count: number;
    }>;
    activeUsers: number;
  };
  clients: {
    total: number;
    active: number;
    pending: number;
    completed: number;
    byPackage: Record<string, number>;
  };
  leads: {
    total: number;
    converted: number;
    conversionRate: number;
    bySource: Record<string, number>;
  };
  contracts: {
    total: number;
    draft: number;
    sent: number;
    signed: number;
  };
  timeline: {
    totalMilestones: number;
    completed: number;
    inProgress: number;
    completionRate: number;
  };
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray">Se încarcă...</div>
      </div>
    );
  }

  if (!analytics) {
    return <div className="text-center text-gray py-12">Nu s-au putut încărca datele</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Analytics & Rapoarte</h1>
        <p className="text-gray">
          Overview complet al performanței platformei
        </p>
      </div>

      {/* Traffic Analytics (PostHog) */}
      {analytics.traffic && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <TrendingUp size={24} />
            Trafic Website (PostHog) - Ultimele 30 zile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-light">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="text-blue-600" size={20} />
                <p className="text-sm text-gray">Pageviews</p>
              </div>
              <p className="text-3xl font-bold text-navy">
                {analytics.traffic.pageviews.total.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-light">
              <div className="flex items-center gap-3 mb-2">
                <MousePointer className="text-purple-600" size={20} />
                <p className="text-sm text-gray">Sessions</p>
              </div>
              <p className="text-3xl font-bold text-navy">
                {analytics.traffic.sessions.total.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-light">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-green-600" size={20} />
                <p className="text-sm text-gray">Active Users</p>
              </div>
              <p className="text-3xl font-bold text-navy">
                {analytics.traffic.activeUsers.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Top Pages */}
          {analytics.traffic.topPages.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-light">
              <h3 className="text-sm font-semibold text-navy mb-3">Top Pagini</h3>
              <div className="space-y-2">
                {analytics.traffic.topPages.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray truncate flex-1 mr-4">
                      {item.page}
                    </span>
                    <span className="font-semibold text-navy">
                      {item.count.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Total Clienți</p>
              <p className="text-2xl font-bold text-navy">
                {analytics.clients.total}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray">
            {analytics.clients.active} activi
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Lead Conversion</p>
              <p className="text-2xl font-bold text-navy">
                {analytics.leads.conversionRate}%
              </p>
            </div>
          </div>
          <div className="text-sm text-gray">
            {analytics.leads.converted} din {analytics.leads.total}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <FileText className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Contracte Semnate</p>
              <p className="text-2xl font-bold text-navy">
                {analytics.contracts.signed}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray">
            {analytics.contracts.total} total
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-50 rounded-xl">
              <CheckCircle2 className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray">Milestones Complete</p>
              <p className="text-2xl font-bold text-navy">
                {analytics.timeline.completionRate}%
              </p>
            </div>
          </div>
          <div className="text-sm text-gray">
            {analytics.timeline.completed} din {analytics.timeline.totalMilestones}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clients by Package */}
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <Package size={20} />
            Clienți pe Pachet
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.clients.byPackage).map(([pkg, count]) => (
              <div key={pkg} className="flex items-center justify-between">
                <span className="text-gray">{pkg || "Fără pachet"}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-light rounded-full h-2">
                    <div
                      className="bg-navy h-2 rounded-full"
                      style={{
                        width: `${(count / analytics.clients.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-navy w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leads by Source */}
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <Mail size={20} />
            Leads pe Sursă
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.leads.bySource).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-gray capitalize">{source}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-light rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / analytics.leads.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-navy w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2">
            <Clock size={20} />
            Activitate Recentă
          </h3>
        </div>
        <div className="p-6">
          {analytics.recentActivity.length === 0 ? (
            <p className="text-center text-gray py-8">
              Nicio activitate recentă
            </p>
          ) : (
            <div className="space-y-3">
              {analytics.recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-white rounded-lg">
                    {activity.type === "client" && <Users size={16} className="text-blue-600" />}
                    {activity.type === "contract" && <FileText size={16} className="text-purple-600" />}
                    {activity.type === "lead" && <TrendingUp size={16} className="text-green-600" />}
                    {activity.type === "milestone" && <Calendar size={16} className="text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-navy">{activity.message}</p>
                    <p className="text-xs text-gray mt-1">
                      {new Date(activity.timestamp).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

