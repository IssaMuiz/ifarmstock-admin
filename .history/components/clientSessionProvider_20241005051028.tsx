"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidenav from "./sidenav";

export default function ClientSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showSidebar, setShowSidenav] = useState(true);

  const toggleSidebar = () => {
    setShowSidenav((prev) => !prev);
  };
  return (
    <SessionProvider>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidenav showSidebar={showSidebar} />
      {children}
    </SessionProvider>
  );
}
