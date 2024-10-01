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
      <div>
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
      </div>
      <button onClick={() => signOut()}>Logout</button>
    </section>
  );
};

export default DashBoard;
