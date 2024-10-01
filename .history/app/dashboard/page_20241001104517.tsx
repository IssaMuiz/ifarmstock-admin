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
      <p className="text-3xl text-semibold mr-1">
        Welcome,
        {session && (
          <span className="text-green-600">{session.user?.name}</span>
        )}
      </p>
      <button onClick={() => signOut()}>Logout</button>
    </section>
  );
};

export default DashBoard;
