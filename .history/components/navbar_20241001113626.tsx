import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between fixed top-0 left-0 right-0 h-50 border-b shadow-md ">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/" className="left-nav flex gap-3 ">
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

              <p className="text-green-600">Admin</p>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex gap-5">
                <Link
                  href="/admin-dashboard"
                  className="hover:text-green-600 hover:bg-gray-200 p-3 rounded-md"
                >
                  <p>Dashboard</p>
                </Link>
                <Link
                  href="/products"
                  className="hover:text-green-600 hover:bg-gray-200 p-3 rounded-md"
                >
                  <p>Products</p>
                </Link>
                <Link
                  href="/categories"
                  className="hover:text-green-600 hover:bg-gray-200 p-3 rounded-md"
                >
                  <p>Categories</p>
                </Link>
                <Link
                  href="/Orders"
                  className="hover:text-green-600 hover:bg-gray-200 p-3 rounded-md"
                >
                  <p>Orders</p>
                </Link>
                <Link
                  href="/Settings"
                  className="hover:text-green-600 hover:bg-gray-200 p-3 rounded-md"
                >
                  <p>Settings</p>
                </Link>
              </div>

              <div>
                <Image
                  className="rounded-full"
                  src={session?.user?.image || "/assets/images/avatar.png"}
                  alt="user-profile-image"
                  height={30}
                  width={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
