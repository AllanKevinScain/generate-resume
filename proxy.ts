import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    if (!token && pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/create", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/:path*"],
};
