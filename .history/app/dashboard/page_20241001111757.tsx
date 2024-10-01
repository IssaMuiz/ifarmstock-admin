"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Navbar from "@/components/navbar";

const DashBoard = () => {
  const { data: session } = useSession();
  return (
    <section className="mt-40">
      <Navbar />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl text-semibold">
            Welcome,
            {session && (
              <span className="text-green-600 ml-1">{session.user?.name}</span>
            )}
          </p>
          <p className="text-gray-500">
            View the statistics about your business. Also manage and add
            products.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center border border-black p-2 rounded-md cursor-pointer hover:bg-green-600 hover:text-white hover:border-green-600">
            <p className="">View Produts</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          <div className="flex gap-2 items-center border border-black p-2 rounded-md cursor-pointer hover:bg-green-600 hover:text-white hover:border-green-600">
            <p className="">View Shops</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

          </div>
        </div>
      </div>
      <button onClick={() => signOut()}>Logout</button>
    </section>
  );
};

export default DashBoard;
