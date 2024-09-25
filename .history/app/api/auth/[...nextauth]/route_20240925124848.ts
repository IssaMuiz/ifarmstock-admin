import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/auth";
import { connect } from "@/lib/config/mongodb";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          /* const passwordMatch = await bcryptjs.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user; */
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
