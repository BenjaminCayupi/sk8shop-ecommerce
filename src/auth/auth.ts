import { checkAuthUser } from "@/actions/auth/check-auth-user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          //Check if the user exist and validate password
          const user = await checkAuthUser(email as string, password as string);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          console.log("error :", error);
          return null;
        }
      },
    }),
  ],
});
