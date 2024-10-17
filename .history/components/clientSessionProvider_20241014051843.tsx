"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidenav from "./sidenav";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <section className="flex flex-col min-h-screen">
        <Sidenav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div
          className={`fixed block xl:hidden inset-0 bg-black transition-opacity duration-300 ease-in-out z-10 ${
            showSidebar
              ? "opacity-40 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
        <main
          className={`relative z-0 transition-all duration-300 ease-in-out ${
            showSidebar ? "xl:ml-64" : "w-full"
          }  flex-grow`}
        >
          {!noNavRoutes.includes(pathname) && (
            <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
          )}
          <ToastContainer
            position="top-center"
            className="w-full"
            toastClassName={() =>
              "bg-green-500 text-white text-center rounded-sm "
            }
            bodyClassName="text-sm font-medium"
          />
          {children}
        </main>
        <footer
          className={`${
            showSidebar ? "xl:ml-64" : "w-full"
          } transition-all duration-300 ease-in-out `}
        >
          <Footer />
        </footer>
      </section>
    </SessionProvider>
  );
}
