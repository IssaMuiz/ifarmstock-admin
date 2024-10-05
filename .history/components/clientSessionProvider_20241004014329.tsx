"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidenav from "./sidenav";

export default function ClientSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <Sidenav />
      {children}
    </SessionProvider>
  );
}
