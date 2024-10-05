import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ToggleSidebar {
  toggleSidebar: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
}
const Navbar = ({ toggleSidebar }: ToggleSidebar) => {
  const { data: session } = useSession();
  return (
    <nav className="bg-white h-16 fixed top-0 left-0 right-0 shadow-md z-10 p-1">
      <div className="mx-auto flex justify-between">
        <div className="leftnav flex gap-5 items-center">
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer hover:fill-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <input
            type="text"
            placeholder="Search"
            className="p-1 bg-gray-200 rounded-md w-72 border outline-none"
          />
        </div>
        <div className="right-nav flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            className="fill:#1A1A1A;"
          >
            <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"></path>
          </svg>
          <div className="flex items-center gap-2">
            <Image
              src={session?.user?.image || "/assets/images/avatar.png"}
              alt="profile-image"
              width={45}
              height={45}
              className="rounded-md"
            />
            <div className=" flex-col hidden md:flex text-sm">
              <p className=" font-semibold">{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
