"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

export default function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomepage = pathname === "/";

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-light z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Logo className="h-10 w-auto" />
          </Link>
          
          {!isHomepage && (
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 text-sm text-gray hover:text-navy transition-smooth"
            >
              ← Înapoi la Homepage
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Servicii Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth flex items-center gap-1">
              Servicii
              <span className="text-xs">▼</span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-light rounded-xl shadow-xl py-2">
                <Link
                  href="/servicii/marketing-digital"
                  className="block px-6 py-3 text-sm font-semibold text-navy hover:bg-cream transition-smooth"
                >
                  📊 Marketing Digital
                </Link>
                <Link
                  href="/servicii/web-design"
                  className="block px-6 py-3 text-sm font-semibold text-navy hover:bg-cream transition-smooth"
                >
                  💻 Web Design & Development
                </Link>
                <Link
                  href="/servicii/branding"
                  className="block px-6 py-3 text-sm font-semibold text-navy hover:bg-cream transition-smooth"
                >
                  🎨 Branding
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/#case-studies"
            className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth"
          >
            Cazuri de Succes
          </Link>

          <Link
            href="/start-up-nation"
            className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth"
          >
            Start-Up Nation
          </Link>

          <Link
            href="/despre"
            className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth"
          >
            Despre
          </Link>

          <a
            href="https://wa.me/40123456789?text=Bună!%20Vreau%20să%20discutăm."
            className="text-sm font-semibold text-navy hover:opacity-75 transition-smooth"
          >
            Contact
          </a>

          {status === "loading" ? (
            <div className="h-10 w-32 bg-gray-light animate-pulse rounded-lg"></div>
          ) : session ? (
            <>
              <Link
                href={
                  session.user.role === "ADMIN"
                    ? "/admin"
                    : `/client/${session.user.clientId}`
                }
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-navy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-light">
          <div className="px-6 py-4 space-y-4">
            <div>
              <div className="text-sm font-semibold text-navy/60 mb-2">
                Servicii
              </div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/servicii/marketing-digital"
                  className="block text-sm font-semibold text-navy hover:opacity-75"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📊 Marketing Digital
                </Link>
                <Link
                  href="/servicii/web-design"
                  className="block text-sm font-semibold text-navy hover:opacity-75"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  💻 Web Design
                </Link>
                <Link
                  href="/servicii/branding"
                  className="block text-sm font-semibold text-navy hover:opacity-75"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🎨 Branding
                </Link>
              </div>
            </div>

            <Link
              href="/#case-studies"
              className="block text-sm font-semibold text-navy hover:opacity-75"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cazuri de Succes
            </Link>

            <Link
              href="/start-up-nation"
              className="block text-sm font-semibold text-navy hover:opacity-75"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start-Up Nation
            </Link>

            <Link
              href="/despre"
              className="block text-sm font-semibold text-navy hover:opacity-75"
              onClick={() => setMobileMenuOpen(false)}
            >
              Despre
            </Link>

            <a
              href="https://wa.me/40123456789?text=Bună!%20Vreau%20să%20discutăm."
              className="block text-sm font-semibold text-navy hover:opacity-75"
            >
              Contact
            </a>

            {status === "loading" ? (
              <div className="h-10 w-full bg-gray-light animate-pulse rounded-lg"></div>
            ) : session ? (
              <>
                <Link
                  href={
                    session.user.role === "ADMIN"
                      ? "/admin"
                      : `/client/${session.user.clientId}`
                  }
                  className="block text-sm font-semibold text-navy hover:opacity-75"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Ieși din cont
                </Button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Intră în cont
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
