export type THabit = {
  id: string,
  name: string,
  description: string,
  startDate: string,
  stopDate: string,
  createdAt: string,
  updatedAt: string,
  ownerID: string,
}

export type TNewHabit = Omit<THabit, "id" | "createdAt" | "updatedAt" | "ownerID">

export type THabitFormState = TNewHabit;

export type TDay = {
  id: string,
  habitID: string,
  date: string,
  isPerformed: boolean,
  createdAt: string,
  updatedAt: string
}

export type TNewDay = Omit<TDay, "id" | "isPerformed" | "createdAt" | "updatedAt">

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

