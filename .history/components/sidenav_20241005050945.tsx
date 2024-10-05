import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = (showSidebar: Sidebar) => {
  return (
    <nav className="bg-black mt-24 z-30">
      {showSidebar && (
        <div className="fixed left-0 top-0 bottom-0 w-52 ">hello world</div>
      )}
    </nav>
  );
};

export default Sidenav;
