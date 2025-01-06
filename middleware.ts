import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get stored auth data from localStorage via cookies
  const authStorage = request.cookies.get("auth-storage")?.value;
  let isAuthenticated = false;

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      isAuthenticated = parsed.state?.isAuthenticated ?? false;
    } catch (e) {
      console.error("Failed to parse auth storage:", e);
    }
  }

  const isAuthPage =
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirect to signin if accessing dashboard without token
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect to dashboard if accessing auth pages with token
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
