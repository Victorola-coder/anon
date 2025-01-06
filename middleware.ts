import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // // Check for persisted auth store token
  // const authStorage = request.cookies.get("auth-storage")?.value;
  // let token = null;
  // if (authStorage) {
  //   try {
  //     const parsed = JSON.parse(authStorage);
  //     token = parsed.state?.token;
  //   } catch (e) {
  //     console.error("Failed to parse auth storage:", e);
  //   }
  // }
  // const isAuthPage =
  //   request.nextUrl.pathname === "/signin" ||
  //   request.nextUrl.pathname === "/signup";
  // const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  // // Redirect to signin if accessing dashboard without token
  // if (!token && isDashboardPage) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
  // // Redirect to dashboard if accessing auth pages with token
  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
