import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@/lib/adapter";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_URL!,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user }) {
      console.log(session);
      if (session.user) {
        session.user.id = user?.id;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
