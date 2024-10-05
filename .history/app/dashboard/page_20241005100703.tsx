"use client";

import React from "react";
import { useSession } from "next-auth/react";

const DashBoard = () => {
  const { data: session } = useSession();
  return <section className="mt-32"></section>;
};

export default DashBoard;
