/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/auth";
import { connect } from "@/lib/config/mongodb";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

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
            return NextResponse.json(
              { error: "Invalid log in details" },
              { status: 400 }
            );
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (!passwordMatch) {
            return NextResponse.json(
              { error: "Invalid credentials" },
              { status: 400 }
            );
          }
          return user;
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
          const userExist = await User.findOne({ email });
          if (userExist) {
            return user;
          }

          const newUser = new User({
            name: name,
            email: email,
          });

          const res = await newUser.save();
          if (res.status === 200 || res.status === 201) {
            return user;
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
  },
});

export { handler as GET, handler as POST };
