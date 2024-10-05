"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "./navbar";

export default function ClientSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
