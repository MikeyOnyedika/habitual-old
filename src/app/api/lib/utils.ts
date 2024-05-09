import { TLoginBody, TNewHabit, TSignupBody, TZodError } from "@/app/types"
import bcrypt from "bcrypt"
import zod from "zod"

// parses the req body into an object. If nothing was passed, an empty object is returned
export async function safeParseJSONBody<T = any>(req: Request): Promise<Partial<T>> {
  try {
    const body = (await req.json()) as T
    return body
  } catch (er) {
    return {}
  }
}

export function validateLoginBody(body: { [key: string]: string }): {
  status: "success",
  data: TLoginBody
} | {
  status: "error",
  error: string
} {
  const schema = zod.object({
    email: zod.string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email Address"
    }).email({
      message: "Invalid Email Address"
    }),
    password: zod.string({
      required_error: "Password is required"
    }),
  }).required({ email: true, password: true })

  const res = schema.safeParse(body);
  if (res.success === false) {
    return {
      status: "error",
      error: "Invalid Email or Password"
    }
  }
  return {
    status: "success",
    data: body as TLoginBody
  }
}

export function validateSignupBody(body: { [key: string]: string }): {
  status: "success",
  data: TSignupBody
} | {
  status: "error",
  errors: TZodError[]
} {
  const schema = zod.object({
    email: zod.string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email Address"
    }).email({
      message: "Invalid Email Address"
    }),
    password: zod.string({
      required_error: "Password is required"
    }).min(8, "Password must be atleast 8 characters long"),
  }).required({ email: true, password: true })
  const res = schema.safeParse(body);
  if (res.success === false) {
    return {
      status: "error",
      errors: res.error.issues.map(err => ({
        field: err.path[0] as string,
        message: err.message
      }))
    }
  }
  return {
    status: "success",
    data: body as TSignupBody
  }
}

function getDateFromDateString({ dateString, errorMsg }: { dateString: string, errorMsg: string }): string | Date {
  try {
    const date = new Date(dateString);
    return date;
  } catch (err) {
    return errorMsg;
  }
}

export function validateCreateHabitBody(body: { [key: string]: string }): {
  status: "success",
  data: TNewHabit
} | {
  status: "error",
  errors: TZodError[]
} {
  const schema = zod.object({
    name: zod.string({
      required_error: "Name is required",
    }),
    description: zod.string({
      required_error: "Description is required"
    }),
    startDate: zod.string({
      required_error: "Start Date is required"
    }).transform((str) => {
      const result = getDateFromDateString({ dateString: str, errorMsg: "Invalid Start Date value" });
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    }),
    // TODO: Use a http interceptor to make stopDate an invalid date string to see that the validation works 
    stopDate: zod.string({
      required_error: "Stop Date is required"
    }).transform((str) => {
      const result = getDateFromDateString({ dateString: str, errorMsg: "Invalid Stop Date value" });
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    }), // convert to date string
  }).required({ name: true, stopDate: true, description: true })

  const res = schema.safeParse(body);
  if (res.error) {
    return {
      status: "error",
      errors: res.error.issues.map(issue => ({
        field: issue.path[0] as string,
        message: issue.message
      }))
    }
  }
  return {
    status: "success",
    data: {
      name: res.data.name,
      description: res.data.description,
      startDate: res.data.startDate.toISOString(),
      stopDate: res.data.stopDate.toISOString()
    }
  }
}

export function hashPassoword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function checkPasswordValidity(plainText: string, hashedPassword: string) {
  const isMatches = bcrypt.compareSync(plainText, hashedPassword)
  return isMatches;
}

export function getDateString(dateText: string) {
  const isoDate = new Date(dateText).toISOString();
  const dateString = new Date(isoDate).toDateString();
  return dateString;
}

export function generateRangedDateStrings(from: string, to: string): string[] {
  const fromDate = new Date(new Date(getDateStringFromDateTimeString(from)).toISOString());
  const toDate = new Date(new Date(getDateStringFromDateTimeString(to)).toISOString());
  let currentDate = fromDate;
  const datesWithinRange: string[] = []
  while (currentDate <= toDate) {
    datesWithinRange.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return datesWithinRange;
}

export function getDateStringFromDateTimeString(dateString: string): string {
  if (dateString.includes("T")) {
    let parts = dateString.split("T");
    return parts[0];
  }
  return dateString
}

