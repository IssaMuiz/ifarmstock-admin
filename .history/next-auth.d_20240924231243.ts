declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
