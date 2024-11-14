/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/auth";
import { connectDB } from "@/lib/config/mongodb";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });

        if (
          user &&
          (await bcryptjs.compare(credentials!.password, user.password))
        ) {
          return { id: user._id.toString(), name: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        return true;
      }
      if (account.provider === "credentials") {
        try {
          const { name, email } = user;
          await connectDB();
          const userExist = await User.findOne({ email });
          if (userExist) {
            return user;
          }

          const newUser = new User({
            name: name,
            email: email,
          });

          const res = await newUser.save();
          if (res) {
            return user;
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/",
    error: "/",
    newUser: "/dashboard",
  },
  debug: true,
});

export { handler as GET, handler as POST };
