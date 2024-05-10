import authOptions from "@/app/api/auth/[...nextauth]/options";
import { updateDayIsPerformed } from "@/app/api/lib/db/models/Day";
import { findUserByEmail } from "@/app/api/lib/db/models/User";
import { safeParseJSONBody } from "@/app/api/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type Params = {
  params: {
    id: string,
    dayID: string
  }
}

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  const userQuery = await findUserByEmail(session?.user?.email as string);
  if (userQuery.status === "error") {
    return NextResponse.json({
      ...userQuery
    });
  }

  if (userQuery?.data === null) {
    return NextResponse.json({
      ...userQuery
    });
  }

  const user = userQuery.data
  const habitID = params.id;
  const dayID = params.dayID;


  const body = await safeParseJSONBody<{ isPerformed: boolean }>(req);

  if (body.isPerformed == undefined) {
    return NextResponse.json({ status: "error", error: "Day's isPerformed was not provided" }, { status: 400 });
  }

  // TODO: probably check that body.isPerformed is a boolean first

  const habitUpdate = await updateDayIsPerformed({ userID: user.id, habitID, dayID, isPerformed: body.isPerformed });

  if (habitUpdate.status === "error") {
    return NextResponse.json(habitUpdate, { status: 500 });
  }

  return NextResponse.json(habitUpdate, {
    status: 200
  });
}
