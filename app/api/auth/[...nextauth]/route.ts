import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@/lib/adapter";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_URL,

  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
