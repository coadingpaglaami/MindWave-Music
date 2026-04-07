import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  if (
    pathname.startsWith("/media") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  )
    return NextResponse.next();
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute)
    return NextResponse.redirect(new URL("/login", req.url));

  if (token && isPublicRoute) return NextResponse.redirect(new URL("/admin"));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
