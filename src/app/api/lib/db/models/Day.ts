import { TNewDay } from "@/app/types";
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
