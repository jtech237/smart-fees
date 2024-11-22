import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

export async function authRedirect(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;
  const headersList = headers();
  const referer = (await headersList).get("referer");

  // Si l'utilisateur est connecté et tente d'accéder à /signin
  if (token && url.pathname === "/signin") {
    if (referer) {
      return NextResponse.redirect(new URL(referer, req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Pas de redirection
  return NextResponse.next();
}
