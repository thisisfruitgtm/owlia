import { prisma } from "@/lib/db/prisma";
import { Users, Briefcase, Mail, DollarSign, Plus, Eye } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch stats
  const [totalClients, activeProjects, newLeads, packages] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.lead.count({ where: { converted: false } }),
    prisma.package.findMany({ where: { active: true } }),
  ]);

  // Calculate total revenue (from active clients)
  const activeClients = await prisma.client.findMany({
    where: { status: "ACTIVE" },
    include: { package: true },
  });

  const totalRevenue = activeClients.reduce((sum: number, client: typeof activeClients[0]) => {
    return sum + (client.package?.price || 0);
  }, 0);

  // Get recent clients
  const recentClients = await prisma.client.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      package: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <Link
          href="/admin/clients/new"
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy/90 transition-smooth font-semibold"
        >
          <Plus size={20} />
          Adaugă Client
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clienți"
          value={totalClients}
          icon={Users}
          color="blue"
          change={{ value: 12, label: "față de luna trecută" }}
        />
        <StatsCard
          title="Proiecte Active"
          value={activeProjects}
          icon={Briefcase}
          color="green"
        />
        <StatsCard
          title="Lead-uri Noi"
          value={newLeads}
          icon={Mail}
          color="purple"
        />
        <StatsCard
          title="Venituri"
          value={`${(totalRevenue / 1000).toFixed(0)}K RON`}
          icon={DollarSign}
          color="orange"
          change={{ value: 8, label: "față de luna trecută" }}
        />
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Clienți Recenți</h2>
          <Link
            href="/admin/clients"
            className="text-sm text-navy hover:underline font-semibold"
          >
            Vezi toți →
          </Link>
        </div>
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
              {recentClients.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray"
                  >
                    Nu există clienți încă.{" "}
                    <Link
                      href="/admin/clients/new"
                      className="text-navy hover:underline font-semibold"
                    >
                      Adaugă primul client
                    </Link>
                  </td>
                </tr>
              ) : (
                recentClients.map((client: typeof recentClients[0]) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-navy">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {client.user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {client.package?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          client.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : client.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : client.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="text-navy hover:underline flex items-center gap-1"
                      >
                        <Eye size={16} />
                        Vezi
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/clients/new"
          className="bg-white rounded-xl p-6 border border-gray-light hover:shadow-lg transition-smooth group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-smooth">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Adaugă Client Nou</h3>
              <p className="text-sm text-gray">
                Creează un cont nou pentru un client
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/clients?filter=leads"
          className="bg-white rounded-xl p-6 border border-gray-light hover:shadow-lg transition-smooth group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-smooth">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Vezi Lead-uri</h3>
              <p className="text-sm text-gray">
                {newLeads} lead-uri noi de convertit
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

