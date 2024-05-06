export type THabit = {
  id: string,
  name: string,
  description: string,
  startDate: string,
  stopDate: string,
  currentDay: string
}


export type THabitFormState = Omit<THabit, "id" | "currentDay">

export type TDay = {
  id: string,
  habitID: string,
  date: string,
  status: TDayStatus
}

export type TDayStatus = "fulfilled" | "unfulfilled" | "pending"

export type TZodError = {
  field: string,
  message: string
}

export type TSignupBody = {
  email: string, password: string
}

export type TLoginBody = TSignupBody

export type TUser = {
  email: string,
  id: string,
  createdAt: string,
  updatedAt: string
}
