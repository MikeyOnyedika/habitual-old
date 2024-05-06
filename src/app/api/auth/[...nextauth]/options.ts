import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { checkPasswordValidity, validateLoginBody } from "../../lib/utils";
import { findUserByEmail } from "../../lib/db/models/User";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials, req) {
        const id = "";
        const email = "";
        const bodyValidation = validateLoginBody({ email: credentials?.email ?? "", password: credentials?.password ?? "" });

        if (bodyValidation.status === "error") {
          return {
            id, email,
            status: bodyValidation.status,
            error: bodyValidation.error
          }
        }

        // check if user with the email exists in db
        const userQuery = await findUserByEmail(bodyValidation.data.email);

        if (userQuery.status === "error") {
          return {
            id, email,
            status: "error",
            error: userQuery.error
          }
        }

        if (userQuery.data == null) {
          return {
            id, email,
            status: "error",
            error: "Email or Password is incorrect"
          }
        }

        // compare the password with the hashed one
        const isPasswordCorrect = checkPasswordValidity(bodyValidation.data.password, userQuery.data.password);
        if (isPasswordCorrect === false) {
          return {
            id, email,
            status: "error",
            error: "Email or Password is incorrect"
          }
        }

        return {
          id: userQuery.data.id,
          email: userQuery.data.email,
          status: "success",
        }
      }
    })
  ],
  callbacks: {
    signIn({ user: u }) {
      const user = u as unknown as any
      if (user.error) {
        throw new Error(user.error);
      }
      return true
    },
    session({ session, user }) {
      console.log("session callback: user: ", user);
      console.log("session callback: session: ", session);
      return session
    }
  }
}
export default authOptions
