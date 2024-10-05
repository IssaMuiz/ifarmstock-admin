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
  const [showSidebar, setShowSidenav] = useState(false);

  const toggleSidebar = () => {
    setShowSidenav((prev) => !prev);
  };
  return (
    <SessionProvider>
      <main className="flex ">
        <Sidenav showSidebar={showSidebar} />
        <div
          className={`fixed block md:hidden inset-0 bg-black transition-opacity duration-300 ease-in-out z-10 ${
            showSidebar
              ? "opacity-70 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
        <section
          className={`relative z-0 transition-all duration-300 ease-in-out ${
            showSidebar ? "md:ml-60" : "w-full"
          }  flex-1`}
        >
          <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

          {children}
        </section>
      </main>
    </SessionProvider>
  );
}
