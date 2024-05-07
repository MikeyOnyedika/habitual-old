import api from "@/app/requests/axios.config"
import { AxiosError } from "axios"
import { THabit, TUser, TZodError } from "../types";
import { signIn } from "next-auth/react";


export async function createAccount(email: string, password: string): Promise<
  {
    status: "success",
    data: TUser | string,
  } | {
    status: "error",
    error: string | TZodError[]
  }
> {
  try {
    const { data, status } = await api.post("/signup", {
      email, password
    })
    if (status === 201) {
      return {
        status: "success",
        data: data.data
      }
    }
    return {
      status: "success",
      data: data.message
    }
  } catch (er) {
    const err = er as AxiosError
    if (err.response) {
      if (err.response.status === 400) {
        return {
          status: "error",
          error: (err.response.data as any).errors as TZodError[]
        }
      }
      return {
        status: "error",
        error: (err.response.data as any).error
      }
    }
    return {
      status: "error",
      error: "Couldn't complete signup"
    }
  }
}

export async function logIn({ email, password }: { email: string, password: string }): Promise<{
  status: "success"
} | {
  status: "error",
  error: string
}> {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false
  });
  if (res?.error) {
    return {
      status: "error",
      error: res.error
    }
  }
  return {
    status: "success"
  }
}


