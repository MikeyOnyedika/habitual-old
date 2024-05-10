import { AxiosError } from "axios";
import api from "./axios.config";
import { TDay } from "../types";

export async function updateDayStatus(habitID: string, isHabitPerformed: boolean, dayID: string): Promise<{
  status: "success",
  data: TDay
} | {
  status: "error",
  error: string
}> {
  try {
    const { data, status } = await api.patch(`/habits/${habitID}/days/${dayID}`, {
      isPerformed: isHabitPerformed
    })
    return {
      status: "success",
      data: data.data as TDay
    }
  } catch (er) {
    const err = er as AxiosError;
    return {
      status: "error",
      error: "Couldn't update day"
    }
  }
}

export async function fetchDays(habitID: string): Promise<
  {
    status: "success",
    data: TDay[]
  } | {
    status: "error",
    error: string
  }
> {
  try {
    const { data } = await api.get(`/habits/${habitID}/days`);
    return {
      status: "success",
      data: data.data as TDay[]
    }
  } catch (er) {
    const err = er as AxiosError;
    return {
      status: "error",
      error: "Couldn't update day"
    }
  }
}
