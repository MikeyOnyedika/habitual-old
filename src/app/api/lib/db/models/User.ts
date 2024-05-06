import { TSignupBody, TUser } from "@/app/types";
import { connectDB } from "../connect";
import DBUser from "../mongooseModels/DBUser";
import { hashPassoword } from "../../utils";

export async function createUser({ email, password }: TSignupBody): Promise<{
  status: "success",
  data: TUser
} | {
  status: "duplicate",
  message: string
} | {
  status: "error",
  error: string
}> {
  const conn = await connectDB();
  if (conn.status === "error") {
    return {
      status: "error",
      error: "Couldn't complete request"
    }
  }

  try {
    const hashedPassword = hashPassoword(password);
    const user = new DBUser({ email, password: hashedPassword });
    await user.save();
    return {
      status: "success",
      data: {
        email: user.email as string,
        id: user.id,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }
    }
  } catch (er) {
    const err = er as unknown as any
    if (err.code === 11000 || err.code === 11001) {
      return {
        status: "duplicate",
        message: "An Account with this email already exists"
      }
    }
    return {
      status: "error",
      error: "Couldn't complete creating user"
    }
  }
}
