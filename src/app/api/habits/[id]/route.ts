import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import { findUserByEmail } from "../../lib/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { deleteHabit } from "../../lib/db/models/Habit";

// delete a habit
export async function DELETE(req: NextRequest, { params }: {
  params: { id: string }
}) {
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

  const deleteHabitResult = await deleteHabit(habitID, user.id);
  if (deleteHabitResult.statusCode === 403) {
    return NextResponse.json(deleteHabitResult, { status: 403 })
  }

  if (deleteHabitResult.statusCode === 500) {
    return NextResponse.json(deleteHabitResult, { status: 500 })
  }

  return NextResponse.json(deleteHabitResult, { status: 200 })
} 
