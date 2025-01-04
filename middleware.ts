import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for persisted auth store token
  const authStorage = request.cookies.get("auth-storage")?.value;
  let token = null;

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.token;
    } catch (e) {
      // Invalid storage format
    }
  }

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
