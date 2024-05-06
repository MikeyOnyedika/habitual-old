import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        console.log(credentials);
        // check if user with matching email and password exists in the db.
        //
        // else return the error
        return {
          id: "",
          email: "hi@gmail.com",
        }
      }
    })
  ],
  callbacks: {
    signIn({ user }) {
      console.log("user: ", user);
      return true
    }
  }
}
export default authOptions
