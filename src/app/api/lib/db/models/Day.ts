import { TDay, TNewDay } from "@/app/types";
import DBDay from "../mongooseModels/DBDay";

export async function addHabitDays(habitDays: (TNewDay & { isPerformed: boolean })[]): Promise<{ status: "success" } | { status: "error", error: string }> {
  try {
    await DBDay.insertMany(habitDays);
    return {
      status: "success",
    }
  } catch (er) {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}

export async function getDays(userID: string, habitID: string): Promise<{
  status: "success",
  data: TDay[]
} | {
  status: "error",
}> {
  try {
    const days = await DBDay.find({
      habitID
    }).sort({ date: 1 });
    return {
      status: "success",
      data: days.map(day => ({
        id: day._id,
        habitID: day.habitID,
        date: day.date,
        isPerformed: day.isPerformed,
        createdAt: day.createdAt,
        updatedAt: day.updatedAt
      })) as TDay[]
    }
  } catch (err) {
    return {
      status: "error"
    }
  }
}

export async function deleteHabitDays(habitID: string): Promise<{ status: "success" | "error" }> {
  try {
    await DBDay.deleteMany({ habitID });
    return { status: "success" }
  } catch (er) {
    return {
      status: "error"
    }
  }
}

export async function updateDayIsPerformed({ userID, habitID, dayID, isPerformed }: {
  userID: string, habitID: string, dayID: string, isPerformed: boolean
}): Promise<
  { status: "success", data: TDay } | { status: "error", error: string }
> {
  try {
    const day = await DBDay.findById(dayID);
    if (!day) {
      throw new Error();
    }
    day.isPerformed = isPerformed;
    await day.save();
    return {
      status: "success", data: {
        id: day._id,
        isPerformed: day.isPerformed,
        habitID: day.habitID,
        date: day.date,
        createdAt: day.createdAt,
        updatedAt: day.updatedAt
      } as TDay
    }
  } catch (er) {
    return {
      status: "error",
      error: "Couldn't update day"
    }
  }
}
