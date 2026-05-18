// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';

const SECRET = process.env.NEXTAUTH_SECRET ?? '';

function redirectToSignin(req: NextRequest) {
  return NextResponse.redirect(new URL("/auth/signin", req.url));
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: SECRET });

  if (!token || token.error === "RefreshAccessTokenError") {
    return redirectToSignin(req);
  }

  try {
    const refreshToken = token.refresh ?? '';
    const refreshTokenExpiry = jwtDecode(refreshToken).exp ?? 0;

    if (Date.now() > refreshTokenExpiry * 1000) {
      return redirectToSignin(req);
    }
  } catch (error) {
    return redirectToSignin(req);
  }
  

  if (typeof token.userinfo.role === 'string') {
    switch (token.userinfo.role) {
      case "lecturer":
        if (!req.nextUrl.pathname.startsWith("/profile/lecturer") &&
            !req.nextUrl.pathname.startsWith("/courses") &&
            !req.nextUrl.pathname.startsWith("/mycourses") &&
            !req.nextUrl.pathname.startsWith("/quiz")) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        break;
      case "student":
        if (!req.nextUrl.pathname.startsWith("/profile/student")  &&
            !req.nextUrl.pathname.startsWith("/peserta")) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        break;
      default:
        return redirectToSignin(req);
    }
  }
}

export const config = { matcher: ["/profile/:path*", "/courses/:path*", "/peserta/:path*", "/mycourses/:path*"] }