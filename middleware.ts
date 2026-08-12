import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js middleware entry — auth guards will be wired later.
 * Logic helpers live under /middleware.
 */
const protectedPrefixes = ["/dashboard", "/profile", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  // Placeholder: skip auth enforcement until Auth.js is fully implemented
  if (isProtected) {
    // const session = await auth();
    // if (!session) return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
