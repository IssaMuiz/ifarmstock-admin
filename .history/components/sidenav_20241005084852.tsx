import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = ({ showSidebar }: Sidebar) => {
  return (
    <nav className="">
      <div
        className={`fixed overflow-x-hidden scrollbar h-auto overflow-auto z-20 left-0 top-0 bottom-0 w-60 transform transition-transform duration-300 -translate-x-full  bg-gray-600 ${
          showSidebar ? "md:translate-x-0" : "md:-translate-x-full"
        }`}
      >
        <div className="bg-green-600 h-16 flex items-center gap-2 font-bold justify-center">
          <p className="text-2xl">iFarmStock</p>
          <p className="bg-white p-1 rounded-sm font-semibold text-sm">ADMIN</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidenav;
