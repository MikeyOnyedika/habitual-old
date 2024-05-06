import mongoose from "mongoose"

export async function connectDB(): Promise<{
  status: "success",
  data: typeof mongoose
} | {
  status: "error",
  data: null
}> {
  try {
    const conn = await mongoose.connect(process.env.DB_URL as string);
    return {
      status: "success",
      data: conn
    }
  } catch (err) {
    return {
      status: "error",
      data: null
    }
  }
}

