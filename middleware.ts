import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes - only ADMIN role
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    // Client routes - CLIENT role or ADMIN
    if (path.startsWith("/client")) {
      const clientId = path.split("/")[2];
      
      if (token?.role === "ADMIN") {
        return NextResponse.next();
      }
      
      if (token?.role === "CLIENT" && token?.clientId === clientId) {
        return NextResponse.next();
      }
      
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};

