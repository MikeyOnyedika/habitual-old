import { NextRequest, NextResponse } from "next/server"
import { generateRangedDateStrings, getDateString, safeParseJSONBody, validateCreateHabitBody } from "../lib/utils"
import { getServerSession } from "next-auth"
import authOptions from "../auth/[...nextauth]/options"
import { findUserByEmail } from "../lib/db/models/User"
import { TNewDay, TNewHabit } from "@/app/types"
import { addHabit, deleteHabit, getHabits } from "../lib/db/models/Habit"
import { addHabitDays } from "../lib/db/models/Day"

export const GET = async (req: NextRequest) => {
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

  const habitsResult = await getHabits(user.id);
  if (habitsResult.status === "error") {
    return NextResponse.json({
      status: "error",
      error: "Something went wrong"
    }, {
      status: 500
    })
  }

  return NextResponse.json(habitsResult);
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const userQuery = await findUserByEmail(session?.user?.email as string);
  if (userQuery.status === "error") {
    return NextResponse.json({
      ...userQuery
    });
  }

  if (!userQuery?.data?.email) {
    return NextResponse.json({
      ...userQuery
    });
  }

  // get the json payload
  const parsedBody = await safeParseJSONBody<TNewHabit>(req);
  const validatedBody = validateCreateHabitBody(parsedBody);

  if (validatedBody.status === "error") {
    return NextResponse.json({
      status: "error",
      errors: validatedBody.errors
    }, { status: 400 });
  }

  const reqBody = validatedBody.data;
  // compare the date string of the startDate provided by the client and the date string gotten here on the server. If there're not the same, tell client to set their system clock properly
  const currentDateFromClient = getDateString(reqBody.startDate);
  const currentDate = getDateString(new Date().toISOString());

  if (currentDate !== currentDateFromClient) {
    return NextResponse.json({
      status: "error",
      error: "Make sure your system clock is set properly"
    }, {
      status: 400
    });
  }

  const userID = userQuery.data.id;


  // confirm that the startDate is less than the stopDate
  const startDate = new Date(reqBody.startDate);
  const stopDate = new Date(reqBody.stopDate);
  if (startDate > stopDate) {
    return NextResponse.json({
      status: "error",
      error: "Start Date should not be greater than Stop Date"
    }, { status: 400 })
  }

  // actually add a new habit
  const habitRes = await addHabit({ ...reqBody, ownerID: userID });
  if (habitRes.status === "error") {
    return NextResponse.json({
      status: "error",
      error: "Something went wrong"
    }, { status: 500 })
  }

  // generate the habit days
  const habitDateStrings = generateRangedDateStrings(reqBody.startDate, reqBody.stopDate);

  // generate habitDays from the habit strings
  const habitDays = habitDateStrings.map(habitDate => {
    return {
      date: habitDate,
      habitID: habitRes.data.id,
      isPerformed: false
    }
  })

  // enter each of the habitDays into the db
  const addHabitDaysResult = await addHabitDays(habitDays);
  if (addHabitDaysResult.status === "error") {
    // delete the habit
    await deleteHabit(habitRes.data.id, userID);
    return NextResponse.json({
      status: "error", error: "Something went wrong"
    }, { status: 500 });
  }

  return NextResponse.json(habitRes, {
    status: 201
  })
}
