import { THabit, TNewHabit } from "@/app/types";
import DBHabit from "../mongooseModels/DBHabit";
import mongoose from "mongoose"
import { deleteHabitDays } from "./Day";

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

export async function getHabit(ownerID: string, habitID: string): Promise<
  {
    status: "success",
    data: THabit | null
  } | {
    status: "error",
    error: string
  }> {
  try {
    const habit = await DBHabit.findOne({ _id: habitID, ownerID });
    if (!habit) {
      return {
        status: "success",
        data: null
      }
    }
    return {
      status: "success",
      data: {
        id: habit._id,
        name: habit.name,
        description: habit.description,
        ownerID: habit.ownerID,
        startDate: habit.startDate,
        stopDate: habit.stopDate,
        createdAt: habit.createdAt,
        updatedAt: habit.updatedAt
      }
    };
  } catch (err) {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}


export async function deleteHabit(habitID: string, ownerID: string): Promise<{
  statusCode: 200,
  data: null | THabit
} | {
  statusCode: 403 | 500,
  error: string
}> {
  try {
    const habitToDelete = await DBHabit.findById(habitID);
    if (!habitToDelete) { // this would mean that the habit had already been deleted
      return {
        statusCode: 200,
        data: null
      }
    }
    // check to make sure that the client making this request is the actual owner of the habit
    if (habitToDelete.ownerID !== ownerID) {
      return {
        statusCode: 403,
        error: "You are not allowed to delete this habit"
      }
    }

    // delete the days associated with this habit
    const delDaysRes = await deleteHabitDays(habitID);
    if (delDaysRes.status === "error") {
      return {
        statusCode: 500,
        error: "Couldn't complete request"
      }
    }

    // actually delete  the habit
    const res = await DBHabit.deleteOne({ _id: habitID });
    return {
      statusCode: 200,
      data: habitToDelete
    }
  } catch (err) {
    return {
      statusCode: 500,
      error: "Couldn't complete request"
    }
  }
}
