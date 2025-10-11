import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/middleware-config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};

