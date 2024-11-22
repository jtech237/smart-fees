import { NextRequest, NextResponse } from "next/server";
import { authRedirect } from "./middlewares/alreadLogged";

export async function middleware (req: NextRequest){
  const response = await authRedirect(req);
  if (response !== NextResponse.next()) return response;
}

export const config = {
  matcher: ["/signin", ], // Routes à surveiller
};