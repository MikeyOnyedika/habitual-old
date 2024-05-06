import { createUser } from "./User";
import { connectDB } from "../connect";
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

describe("database connection", () => {
  test("connection to database works", async () => {
    const conn = await connectDB();
    expect(conn.status).toBe("success")
  }, 10000)
})
//
describe("createUser fn", () => {
  test("creating new user with duplicate email fails", async () => {
    const res1 = await createUser({
      email: "mary@gmail.com", password: "another"
    })

    expect(res1.status).toBe("success");
    const res2 = await createUser({
      email: "mary@gmail.com", password: "another"
    })
    expect(res2.status).toBe("error");

  }, 10000);
});
