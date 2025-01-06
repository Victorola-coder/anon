import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Set token in cookies when signing in
  const token = request.cookies.get("token")?.value;
  let isAuthenticated = false;

  if (token) {
    isAuthenticated = true;
  }

  const isAuthPage =
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
