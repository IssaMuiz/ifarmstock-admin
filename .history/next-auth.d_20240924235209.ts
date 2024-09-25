import { DefaultSession, DefaultUser } from "next-auth";

declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}
