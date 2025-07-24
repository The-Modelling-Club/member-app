import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const publicUrl = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/not-found",
    "/verify-otp",
  ];

  if (publicUrl.includes(req.nextUrl.pathname)) {
    return res;
  }

  let accessToken = req.cookies.get("tmcAuthToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
