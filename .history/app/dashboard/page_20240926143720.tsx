"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Navbar from "@/components/navbar";

const DashBoard = () => {
  const { data: session } = useSession();
  return (
    <div className="mt-40">
      <Navbar />
      <p>Dashboard</p>
      {session && <span>{session.user?.name}</span>}
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default DashBoard;
