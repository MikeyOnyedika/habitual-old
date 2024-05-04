import api from "@/app/requests/axios.config"
import { AxiosError } from "axios"
import { THabit } from "../types";


// TODO: complete this after UI is done
export async function fetchHabits() {
  try {
    const { data } = await api.get("/habits");
    return {
      status: "success",
      data
    }
  } catch (er) {
    const err = er as AxiosError;
    if (err.response) {
      return {
        status: "error",
        error: (err.response.data as any).error
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
