import { safeParseJSONBody, validateSignupBody } from "../lib/utils";
import { createUser } from "../lib/db/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // accept the credentials
  const body = await safeParseJSONBody<{ email: string, password: string }>(req);

  // validate them
  const parsedBody = validateSignupBody(body);

  if (parsedBody.status === "error") {
    return NextResponse.json({
      status: "error",
      errors: parsedBody.errors
    }, { status: 400 })
  }

  // create a user in db
  const newUserResult = await createUser(parsedBody.data);

  if (newUserResult.status === "error") {
    return NextResponse.json({
      status: "error",
      error: newUserResult.error
    }, { status: 500 })
  }

  if (newUserResult.status === "duplicate") {
    return NextResponse.json({
      status: "success",
      message: newUserResult.message
    })
  }

  return Response.json({
    status: "success",
    data: newUserResult.data
  }, { status: 201 });

}
