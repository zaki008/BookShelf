import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const tokenLogin = request.cookies.get("tokenLogin")?.value;
  const { pathname } = request.nextUrl;
  if (
    !tokenLogin &&
    pathname !== "/auth/login" &&
    pathname !== "/auth/register"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    tokenLogin &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register"],
};
