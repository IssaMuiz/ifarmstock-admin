import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = (showSidebar: Sidebar) => {
  return (
    <nav className="">
      {showSidebar && (
        <div className="fixed left-0 top-0 bottom-0 w-52 bg-black z-20 ">
          <div className="bg-green-600 h-20 flex items-center gap-2 font-semibold">
            <p>iFarmStock</p>
            <p className="bg-white p-1 rounded-sm font-semibold text-sm">
              ADMIN
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidenav;
