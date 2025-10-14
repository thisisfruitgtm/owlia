"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, AlertCircle, Info, Clock, Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
      });
      
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
      });
      
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

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

  const unreadCount = notifications.filter((n) => !n.read).length;

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
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Notificări</h1>
            <p className="text-gray">
              Toate actualizările și anunțurile importante despre proiectul tău
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                  {unreadCount} {unreadCount === 1 ? "nouă" : "noi"}
                </div>
                <Button onClick={markAllAsRead} className="flex items-center gap-2">
                  <Check size={18} />
                  Marchează toate citite
                </Button>
              </>
            )}
          </div>
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
                bg-white rounded-xl p-6 border transition-smooth cursor-pointer
                ${notification.read ? "border-gray-light" : "border-navy/30 shadow-md"}
              `}
              onClick={() => !notification.read && markAsRead(notification.id)}
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
