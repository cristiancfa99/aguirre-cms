import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const loggedIn = !!auth?.user;
      const isLogin = nextUrl.pathname === "/admin/login";
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      if (isLogin) {
        if (loggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }
      if (isAdmin) return loggedIn;
      return true;
    },
    jwt({ token, user }) { if (user) (token as Record<string, unknown>).role = (user as Record<string, unknown>).role; return token; },
    session({ session, token }) { if (session.user) (session.user as Record<string, unknown>).role = (token as Record<string, unknown>).role; return session; }
  },
  providers: []
};
