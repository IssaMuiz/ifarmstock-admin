import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between w-full items-center fixed top-0 left-0 right-0 h-50 px-6 py-4 border-b shadow-md mx-auto">
      <div className="hidden gap-3 w-max items-center">
        <div className="flex md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 hover:fill-green-600 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <Link href="/" className="left-nav flex gap-3 items-center">
          <h1 className="md:text-2xl font-semibold text-xl">iFarmStock</h1>
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
        </Link>
      </div>
      <div className="flex w-max items-center gap-2">
        <div className="hidden md:flex md:gap-1 lg:gap-5">
          <Link
            href="/admin-dashboard"
            className="hover:text-green-600 hover:bg-gray-200 lg:p-3 md:p-2 rounded-md"
          >
            <p>Dashboard</p>
          </Link>
          <Link
            href="/products"
            className="hover:text-green-600 hover:bg-gray-200 lg:p-3 md:p-2 rounded-md"
          >
            <p>Products</p>
          </Link>
          <Link
            href="/categories"
            className="hover:text-green-600 hover:bg-gray-200 lg:p-3 md:p-2 rounded-md"
          >
            <p>Categories</p>
          </Link>
          <Link
            href="/Orders"
            className="hover:text-green-600 hover:bg-gray-200 lg:p-3 md:p-2 rounded-md"
          >
            <p>Orders</p>
          </Link>
          <Link
            href="/Settings"
            className="hover:text-green-600 hover:bg-gray-200 lg:p-3 md:p-2 rounded-md"
          >
            <p>Settings</p>
          </Link>
        </div>
        <div className="flex items-center gap-3 ml-3">
          <Image
            className="rounded-full"
            src={session?.user?.image || "/assets/images/avatar.png"}
            alt="user-profile-image"
            height={30}
            width={30}
          />
          <button
            className="bg-green-600 text-white p-1 font-semibold rounded-md hover:bg-green-700"
            type="button"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
