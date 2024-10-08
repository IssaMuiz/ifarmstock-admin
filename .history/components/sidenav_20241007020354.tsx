import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = ({ showSidebar }: Sidebar) => {
  return (
    <nav className="h-80">
      <div
        className={`fixed w-60 overflow-x-hidden scrollbar  overflow-auto z-20 left-0 top-0 bottom-0 transform transition-transform duration-300  bg-gray-600 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
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
