import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: any) {
    // const token = req.nextauth.token;
    // console.log("token: ", token);
    // const url = req.nextUrl.pathname;
    // return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) {
          return true;
        }
        return false;
      }
    }
  }
)

export const config = {
  matcher: ["/habits"]
}
