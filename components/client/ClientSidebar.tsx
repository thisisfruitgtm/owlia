"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Calendar, FolderOpen, Bell, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { signOut } from "next-auth/react";

interface Props {
  clientId: string;
  clientName: string;
}

export default function ClientSidebar({ clientId, clientName }: Props) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: `/client/${clientId}`, icon: Home },
    { name: "Timeline", href: `/client/${clientId}/timeline`, icon: Calendar },
    { name: "Contracte", href: `/client/${clientId}/contracts`, icon: FileText },
    { name: "Fișiere", href: `/client/${clientId}/files`, icon: FolderOpen },
    { name: "Notificări", href: `/client/${clientId}/notifications`, icon: Bell },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm hidden" />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-light flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-light">
          <Link href={`/client/${clientId}`}>
            <Logo className="h-8" />
          </Link>
          <p className="text-sm text-gray mt-2">Portal Client</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth
                  ${
                    isActive
                      ? "bg-navy text-white font-semibold"
                      : "text-gray hover:bg-gray-50"
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-light">
          <div className="mb-3">
            <p className="text-sm font-semibold text-navy truncate">
              {clientName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray hover:bg-red-50 hover:text-red-600 transition-smooth"
          >
            <LogOut size={20} />
            <span>Deconectare</span>
          </button>
        </div>
      </aside>
    </>
  );
}

