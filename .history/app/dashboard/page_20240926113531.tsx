import React from "react";
import { useSession } from "next-auth/react";

const DashBoard = () => {
  const { data: session } = useSession();
  return (
    <div className="mt-40">
      <p>Dashboard</p>

      <button>Logout</button>
    </div>
  );
};

export default DashBoard;
