import { THabit, TNewHabit } from "@/app/types";
import DBHabit from "../mongooseModels/DBHabit";
import mongoose from "mongoose"

export async function addHabit(newHabit: TNewHabit & { ownerID: string }): Promise<{
  status: "success",
  data: THabit
} | {
  status: "error",
  error: string
}> {
  try {
    const habit = new DBHabit(newHabit);
    await habit.save();
    return {
      status: "success",
      data: {
        id: habit._id.toString(),
        name: habit.name,
        ownerID: habit.ownerID,
        description: habit.description,
        startDate: habit.startDate,
        stopDate: habit.stopDate,
        createdAt: habit.createdAt.toISOString(),
        updatedAt: habit.updatedAt.toISOString()
      }
    }
  } catch (er) {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}

export async function getHabits(ownerID: string): Promise<{
  status: "success",
  data: THabit[]
} | {
  status: "error",
  error: string
}> {
  try {
    const habits = await DBHabit.find({
      ownerID
    });
    console.log("habits: ", habits);
    return {
      status: "success",
      data: habits.map(habit => ({
        id: habit._id,
        name: habit.name,
        description: habit.description,
        ownerID: habit.ownerID,
        startDate: habit.startDate,
        stopDate: habit.stopDate,
        createdAt: habit.createdAt,
        updatedAt: habit.updatedAt
      }))
    }
  } catch (err) {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}
