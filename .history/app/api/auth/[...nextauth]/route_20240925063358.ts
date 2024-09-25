import {connect} from '@/lib/config/mongodb'
import User from '@/lib/models/auth'
import bcryptjs from 'bcryptjs'
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST };
