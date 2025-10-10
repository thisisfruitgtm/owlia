import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Admin routes - only ADMIN role
  if (path.startsWith("/admin")) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Client routes - CLIENT role or ADMIN
  if (path.startsWith("/client")) {
    const clientId = path.split("/")[2];
    
    if (token.role === "ADMIN") {
      return NextResponse.next();
    }
    
    if (token.role === "CLIENT" && token.clientId === clientId) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};

