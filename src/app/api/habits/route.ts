import { NextResponse } from "next/server"

export const GET = (req: Request) => {
  return NextResponse.json({
    status: "success",
    data: "hello me"
  })
}
