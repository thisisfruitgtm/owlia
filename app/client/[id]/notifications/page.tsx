import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { Bell, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientNotificationsPage({ params }: Props) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          notifications: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!client) {
    redirect("/auth/login");
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={24} className="text-green-600" />;
      case "warning":
        return <AlertCircle size={24} className="text-orange-600" />;
      case "error":
        return <AlertCircle size={24} className="text-red-600" />;
      default:
        return <Info size={24} className="text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-100";
      case "warning":
        return "bg-orange-50 border-orange-100";
      case "error":
        return "bg-red-50 border-red-100";
      default:
        return "bg-blue-50 border-blue-100";
    }
  };

  const notifications = client.user.notifications;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Notificări</h1>
            <p className="text-gray">
              Toate actualizările și anunțurile importante despre proiectul tău
            </p>
          </div>
          {notifications.filter((n) => !n.read).length > 0 && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              {notifications.filter((n) => !n.read).length} noi
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <Bell size={64} className="mx-auto mb-4 text-gray opacity-30" />
          <h3 className="text-xl font-bold text-navy mb-2">
            Nicio notificare încă
          </h3>
          <p className="text-gray">
            Vei primi notificări când apar actualizări importante în proiect
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                bg-white rounded-xl p-6 border transition-smooth
                ${notification.read ? "border-gray-light" : "border-navy/30 shadow-md"}
              `}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-navy">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        NOU
                      </span>
                    )}
                  </div>

                  <p className="text-gray mb-3">{notification.message}</p>

                  <div className="flex items-center gap-2 text-sm text-gray">
                    <Clock size={14} />
                    <span>
                      {new Date(notification.createdAt).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-navy mb-2">
          Despre Notificări
        </h3>
        <p className="text-gray mb-3">
          Vei primi notificări pentru:
        </p>
        <ul className="list-disc list-inside text-gray space-y-1">
          <li>Actualizări de status în timeline</li>
          <li>Contracte noi generate</li>
          <li>Fișiere noi încărcate</li>
          <li>Mesaje importante de la echipa OWLIA</li>
          <li>Reminder-uri pentru etape în curs</li>
        </ul>
      </div>
    </div>
  );
}

