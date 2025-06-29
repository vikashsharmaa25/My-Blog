import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function getRoleFromJWT(token: string | undefined): string | null {
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    const payload = JSON.parse(jsonPayload);
    return payload.role || null;
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const role = getRoleFromJWT(accessToken);

  const { pathname } = request.nextUrl;

  const isLoggedIn = accessToken && refreshToken;
  const isAdmin = role === "admin";

  // ---------------------------
  // CASE 1: ADMIN (all access)
  // ---------------------------
  if (isLoggedIn && isAdmin) {
    return NextResponse.next();
  }

  // ---------------------------
  // CASE 2: LOGGED-IN USER (not admin)
  // ---------------------------
  if (isLoggedIn && !isAdmin) {
    if (pathname.startsWith("/admin/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ---------------------------
  // CASE 3: GUEST USER (not logged in)
  // ---------------------------
  const publicRoutes = [
    "/", // home
    "/about", // about
    "/blogs", // blog listing
    "/contact", // contact page
  ];

  const isPublicStaticRoute = publicRoutes.includes(pathname);
  const isPublicDynamicBlog = /^\/blog\/[^\/]+$/.test(pathname); // /blog/:id

  if (!isLoggedIn && (isPublicStaticRoute || isPublicDynamicBlog)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
