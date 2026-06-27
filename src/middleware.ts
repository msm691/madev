import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');

    if (isAuthPage) {
      if (isAuth) {
        // Redirection selon le rôle si déjà connecté
        switch (token?.role) {
          case "ADMIN":
            return NextResponse.redirect(new URL("/admin", req.url));
          case "MERCHANT":
            return NextResponse.redirect(new URL("/merchant", req.url));
          case "STUDENT":
          default:
            return NextResponse.redirect(new URL("/student", req.url));
        }
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Vérification des droits d'accès
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/merchant") && token?.role !== "MERCHANT" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // On gère les accès dans la fonction middleware principale
        return true; 
      },
    },
  }
);

export const config = {
  matcher: ["/student/:path*", "/merchant/:path*", "/admin/:path*", "/login"],
};
