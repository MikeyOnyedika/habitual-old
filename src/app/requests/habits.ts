import { AxiosError } from "axios";
import { THabit, TNewHabit } from "../types";
import api from "./axios.config";

export async function addHabit({ name, description, stopDate }: TNewHabit): Promise<{
  status: "success",
  data: THabit
} | {
  status: "error",
  error: string
}> {
  try {
    const startDate = new Date().toISOString();
    const { data, status } = await api.post("/habits", {
      name, description, startDate, stopDate
    })
    return {
      status: "success",
      data: data.data
    }
  } catch (er) {
    const err = er as AxiosError;
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}

export async function fetchHabits(): Promise<{
  status: "success", data: THabit[]
} | {
  status: "error", error: string
}> {
  try {
    const { data } = await api.get("/habits");
    return data as {
      status: "success",
      data: THabit[]
    }
  } catch (er) {
    const err = er as AxiosError;
    if (err.response) {
      // console.log("err response: ", err.response.data);
      return {
        status: "error",
        error: (err.response.data as any).error as string
      }
    }
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}


export async function fetchHabit(id: string): Promise<{
  status: "success",
  data: THabit
} | {
  status: "error",
  error: string
}> {
  try {
    return {
      data: {
        id: "aksdfasdfask",
        name: "Do 10 pushups every morning",
        description: "it's just that; I aim to do pushups for the next 20days",
        startDate: "2024/05/01",
        stopDate: "2024/05/15",
        currentDay: "ldkadfkasf",
      },
      status: "success"
    }
  } catch (err) {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }
}