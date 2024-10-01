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
      <p>Welcome, {session && <span>{session.user?.name}</span>}</p>
      <button onClick={() => signOut()}>Logout</button>
    </section>
  );
};

export default DashBoard;
