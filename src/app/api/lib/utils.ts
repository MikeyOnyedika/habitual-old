import { TLoginBody, TSignupBody, TZodError } from "@/app/types"
import bcrypt from "bcrypt"
import zod from "zod"

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
