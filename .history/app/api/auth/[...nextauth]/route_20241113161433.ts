/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { IUser } from "@/lib/models/auth";
import { connectDB } from "@/lib/config/mongodb";

interface Credentials {
  email: string;
  password: string;
}

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
      async authorize(credentials: Credentials | undefined) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await User.findOne({
            email: credentials?.email,
          }).exec();

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordValid = await user.comparePassword(
            credentials.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password");
          }

          return {
            _id: user._id.toString(),
            name: user.email.split("@")[0],
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error", error);

          return null;
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
