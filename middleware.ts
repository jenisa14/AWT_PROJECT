import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Read role from cookie
  const roleCookie = request.cookies.get("role")?.value;
  const role = roleCookie?.toUpperCase();

  // 2. Redirect unauthenticated users
  if (!role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Role-based Access Control
  const isAdminPath = pathname.startsWith("/admin");
  const isStaffPath = pathname.startsWith("/staff");
  const isStudentPath = pathname.startsWith("/student");

  // Redirect to correct dashboard if trying to access wrong role path
  if (isAdminPath && role !== "ADMIN") {
    return NextResponse.redirect(new URL(`/${role.toLowerCase()}/dashboard`, request.url));
  }

  if (isStaffPath && role !== "STAFF" && role !== "ADMIN") {
    return NextResponse.redirect(new URL(`/${role.toLowerCase()}/dashboard`, request.url));
  }

  if (isStudentPath && role !== "STUDENT") {
    return NextResponse.redirect(new URL(`/${role.toLowerCase()}/dashboard`, request.url));
  }

  return NextResponse.next();
}

// 4. Matcher configuration
export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/student/:path*",
  ],
};
