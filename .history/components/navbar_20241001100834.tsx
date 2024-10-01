import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between fixed top-0 left-0 right-0 h-50 px-6 py-4 container border-b">
      <div className="left-nav flex gap-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 fill-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>

        <p>Admin</p>
      </div>
      <div className="flex gap-5">
        <Link href="/">
          <p>Dashboard</p>
        </Link>
        <Link href="/">
          <p>Products</p>
        </Link>
        <Link href="/">
          <p>Categories</p>
        </Link>
        <Link href="/">
          <p>Orders</p>
        </Link>
        <Link href="/">
          <p>Settings</p>
        </Link>
        <Image
          src={session?.user?.image || "/assets/images/avatar.png"}
          alt="user-profile-image"
          height={30}
          width={30}
        />
      </div>
    </nav>
  );
};

export default Navbar;
