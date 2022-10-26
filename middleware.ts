import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const BASE_URL = process.env.USERS_BACKEND_URL || "http://localhost:4001"
const JWT_EXPIRED_MESSAGE = "jwt expired"

export default async function middleware(req: NextRequest) {
  const userToken = req.cookies.get("userToken");
  console.log("Middleware")

  if (userToken === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `bearer ${userToken}`
      })
    })
    const data = await response.json()
    console.log(data?.msg, 'MESSAGE')
    if(!data.ok && msg!== JWT_EXPIRED_MESSAGE) {throw new Error}
    if(!data.ok && msg === JWT_EXPIRED_MESSAGE) {
      console.log("Token expired hola")
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/favorites",
    "/artist",
    "/album",
    "/playlist",
    "/library",
    "/search/:path*",
  ],
};