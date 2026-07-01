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
    jwt({ token, user }) { if (user) (token as any).role = (user as any).role; return token; },
    session({ session, token }) { if (session.user) (session.user as any).role = (token as any).role; return session; }
  },
  providers: []
};
