import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = (showSidebar: Sidebar) => {
  return (
    <nav className="">
      {showSidebar && (
        <div className="fixed left-0 top-0 bottom-0 w-52 bg-black mt-24 opacity-50">
          hello world, i want to full all these page with this write up so you
          all can see my writing skills and moreover you must have the right
          talent to make it through and with passion and perseverance and
          everything will fall in place later on so far you are not lazy and put
          in more hard work
        </div>
      )}
    </nav>
  );
};

export default Sidenav;
