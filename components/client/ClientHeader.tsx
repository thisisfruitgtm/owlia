"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  clientName: string;
  email: string;
}

export default function ClientHeader({ clientName, email }: Props) {
  const params = useParams();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      const unread = data.notifications?.filter((n: any) => !n.read).length || 0;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-light sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">
            Bine ai revenit, {clientName.split(" ")[0]}!
          </h1>
          <p className="text-sm text-gray">{email}</p>
        </div>

        <Link
          href={`/client/${params.id}/notifications`}
          className="relative p-2 hover:bg-gray-50 rounded-xl transition-smooth"
        >
          <Bell size={24} className="text-navy" />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
}
