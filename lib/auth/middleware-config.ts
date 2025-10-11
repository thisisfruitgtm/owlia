import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnClient = nextUrl.pathname.startsWith("/client");
      
      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (auth.user.role !== "ADMIN") return false;
        return true;
      }
      
      if (isOnClient) {
        if (!isLoggedIn) return false;
        
        const clientId = nextUrl.pathname.split("/")[2];
        
        if (auth.user.role === "ADMIN") return true;
        if (auth.user.role === "CLIENT" && auth.user.clientId === clientId) return true;
        
        return false;
      }
      
      return true;
    },
  },
  providers: [], // Add providers with an empty array for middleware
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

