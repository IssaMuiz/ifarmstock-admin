import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface ToggleSidebar {
  toggleSidebar: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
  showSidebar: boolean;
}
const Navbar = ({ toggleSidebar, showSidebar }: ToggleSidebar) => {
  const [showProfile, setShowProfile] = useState(false);
  const { data: session } = useSession();

  const toggleShowProfile = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <nav
      className={`bg-white h-16 fixed top-0 left-0 ${
        showSidebar ? "md:left-64" : "w-full"
      } right-0 shadow-md z-10 transition-all ease-in-out duration-300`}
    >
      <div className="mx-auto flex justify-between p-2">
        <div className="leftnav flex-1 flex gap-2 md:gap-5 items-center ">
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 rounded-sm cursor-pointer p-1 hover:bg-gray-300"
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
            className="p-1 bg-gray-200 rounded-md max-w-80 flex-1 border outline-none"
          />
        </div>
        <div className="right-nav flex items-center gap-1">
          <div className="relative cursor-pointer hover:bg-gray-300 rounded-sm p-2">
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
            <span className=" absolute flex items-center justify-center font-semibold top-0 left-5 bg-green-500 p-1 h-5 w-5 rounded-full">
              3
            </span>
          </div>
          <div className="relative ">
            <div
              className="cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={toggleShowProfile}
            >
              <Image
                src={session?.user?.image || "/assets/images/avatar.png"}
                alt="profile-image"
                width={45}
                height={45}
                className="rounded-md p-1"
              />
              <div className="flex-col hidden md:flex p-1">
                <p className="font-semibold text-xs">{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
              </div>
            </div>
            {showProfile && (
              <div className="bg-white shadow top-14 -right-2 absolute w-60 md:w-[18rem] text-xl font-semibold rounded-sm ">
                <div className="flex flex-col gap-3">
                  <p className="hover:bg-gray-300 cursor-pointer px-4 py-2 mt-5 transition-all ease-in-out duration-300">
                    Profile
                  </p>
                  <hr />
                  <p
                    onClick={() => signOut()}
                    className="hover:bg-gray-300 cursor-pointer px-4 py-2 mb-2 transition-all ease-in-out duration-300 border-gray-300"
                  >
                    Sign Out
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
