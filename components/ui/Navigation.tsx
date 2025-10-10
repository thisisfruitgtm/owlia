"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-light z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-10 w-32 bg-gray-light animate-pulse rounded-lg"></div>
          ) : session ? (
            <>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : `/client/${session.user.clientId}`}
                className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth"
              >
                Dashboard
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Ieși din cont
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="primary" size="sm">
                Intră în cont
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

