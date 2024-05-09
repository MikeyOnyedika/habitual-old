import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { findUserByEmail } from "@/app/api/lib/db/models/User";
import { getDays } from "@/app/api/lib/db/models/Day";

type Param = {
  params: {
    id: string
  }
}

export const GET = async (req: NextRequest, { params: { id } }: Param) => {
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

  const habitID = id;

  // TODO: put a check to make sure the wrong user can't access the days

  // get all the days for a specific habit
  const daysResult = await getDays(user.id, habitID);

  if (daysResult.status === "error") {
    return NextResponse.json({
      status: "error",
      error: "Something went wrong"
    }, { status: 500 });
  }

  return NextResponse.json({
    status: "success",
    data: daysResult.data
  }, {
    status: 200
  });
}
