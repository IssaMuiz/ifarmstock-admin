"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidenav from "./sidenav";
import { usePathname } from "next/navigation";
import Footer from "./footer";
export default function ClientSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  const noNavRoutes = [
    "/",
    "/forgot-password",
    "/reset-password",
    "/signup",
    "/verify-email",
  ];
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <SessionProvider>
      <main className="flex ">
        <Sidenav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div
          className={`fixed block xl:hidden inset-0 bg-black transition-opacity duration-300 ease-in-out z-10 ${
            showSidebar
              ? "opacity-40 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
        <section
          className={`relative z-0 transition-all duration-300 ease-in-out ${
            showSidebar ? "xl:ml-64" : "w-full"
          }  flex-1`}
        >
          {!noNavRoutes.includes(pathname) && (
            <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
          )}

          {children}
        </section>
        <Footer />
      </main>
    </SessionProvider>
  );
}
