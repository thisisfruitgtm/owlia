"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-64 bg-navy min-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}

