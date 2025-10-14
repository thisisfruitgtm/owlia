"use client";

import { Bell } from "lucide-react";

interface Props {
  clientName: string;
  email: string;
}

export default function ClientHeader({ clientName, email }: Props) {
  return (
    <header className="bg-white border-b border-gray-light sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">
            Bine ai revenit, {clientName.split(" ")[0]}!
          </h1>
          <p className="text-sm text-gray">{email}</p>
        </div>

        <button className="relative p-2 hover:bg-gray-50 rounded-xl transition-smooth">
          <Bell size={24} className="text-navy" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

