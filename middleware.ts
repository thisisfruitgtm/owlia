import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/config";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  // If no session, redirect to login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Admin routes - only ADMIN role
  if (path.startsWith("/admin")) {
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Client routes - CLIENT role or ADMIN
  if (path.startsWith("/client")) {
    const clientId = path.split("/")[2];
    
    if (session.user.role === "ADMIN") {
      return NextResponse.next();
    }
    
    if (session.user.role === "CLIENT" && session.user.clientId === clientId) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};

