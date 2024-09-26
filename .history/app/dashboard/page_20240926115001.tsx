'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const DashBoard = () => {
  const { data: session } = useSession();
  return (
    <div className="mt-40">
      <p>Dashboard</p>
      {session && <span>{session.user?.name}</span>}
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default DashBoard;
