import React from "react";

interface Sidebar {
  showSidebar: boolean;
}
const Sidenav = ({ showSidebar }: Sidebar) => {
  return (
    <aside className="h-20 overflow-y-auto">
      <div
        className={`fixed w-80 overflow-x-hidden scrollbar  overflow-auto z-20 left-0 top-0 bottom-0 transform transition-transform duration-300  bg-gray-600 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-green-600 h-16 flex items-center gap-2 font-bold justify-center">
          <p className="text-2xl">iFarmStock</p>
          <p className="bg-white p-1 rounded-sm font-semibold text-sm">ADMIN</p>
        </div>
        <div className="flex flex-col items-start gap-3 text-white text-xl font-semibold mt-10">
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.54 19.25H21.31C21.2159 19.2194 21.1288 19.1706 21.0537 19.1062C20.9785 19.0418 20.9169 18.9632 20.8723 18.8749C20.8277 18.7866 20.8009 18.6903 20.7937 18.5917C20.7864 18.493 20.7988 18.3939 20.83 18.3C21.2622 16.9152 21.3626 15.4482 21.1231 14.0175C20.8837 12.5868 20.3111 11.2324 19.4516 10.0638C18.5921 8.89521 17.4698 7.94514 16.1754 7.29034C14.8809 6.63553 13.4506 6.29435 12 6.29435C10.5494 6.29435 9.11906 6.63553 7.82462 7.29034C6.53019 7.94514 5.4079 8.89521 4.54841 10.0638C3.68892 11.2324 3.11633 12.5868 2.87688 14.0175C2.63743 15.4482 2.73784 16.9152 3.17 18.3C3.21197 18.396 3.23338 18.4997 3.23284 18.6044C3.2323 18.7092 3.20983 18.8126 3.16687 18.9082C3.12391 19.0037 3.06142 19.0892 2.98341 19.1591C2.90541 19.229 2.81363 19.2818 2.71398 19.314C2.61434 19.3463 2.50903 19.3574 2.40485 19.3465C2.30068 19.3356 2.19994 19.303 2.10912 19.2508C2.01831 19.1986 1.93943 19.128 1.87758 19.0434C1.81573 18.9589 1.77226 18.8624 1.75 18.76C1.28255 17.2814 1.14055 15.7191 1.33375 14.1804C1.52694 12.6417 2.05074 11.1631 2.86922 9.84591C3.68769 8.52873 4.78146 7.40423 6.07545 6.54957C7.36945 5.69492 8.83303 5.13034 10.3658 4.89459C11.8985 4.65884 13.4641 4.7575 14.9551 5.1838C16.4461 5.61009 17.8273 6.35393 19.0037 7.36426C20.1802 8.3746 21.1241 9.62751 21.7708 11.037C22.4174 12.4465 22.7515 13.9792 22.75 15.53C22.75 16.6259 22.5814 17.7154 22.25 18.76C22.1977 18.9057 22.1011 19.0313 21.9738 19.1192C21.8464 19.2071 21.6947 19.2528 21.54 19.25Z"
                fill="#ffffff"
              />
              <path
                d="M21.54 19.25H2.45999C2.26108 19.25 2.07031 19.171 1.92966 19.0303C1.78901 18.8897 1.70999 18.6989 1.70999 18.5C1.70999 18.3011 1.78901 18.1103 1.92966 17.9697C2.07031 17.829 2.26108 17.75 2.45999 17.75H21.54C21.7389 17.75 21.9297 17.829 22.0703 17.9697C22.211 18.1103 22.29 18.3011 22.29 18.5C22.29 18.6989 22.211 18.8897 22.0703 19.0303C21.9297 19.171 21.7389 19.25 21.54 19.25Z"
                fill="#ffffff"
              />
              <path
                d="M12 16.25C11.9015 16.2505 11.8038 16.2312 11.7128 16.1935C11.6218 16.1557 11.5392 16.1001 11.47 16.03C11.3295 15.8894 11.2507 15.6988 11.2507 15.5C11.2507 15.3013 11.3295 15.1106 11.47 14.97L15.47 10.97C15.613 10.8661 15.788 10.8161 15.9643 10.8287C16.1406 10.8413 16.3067 10.9157 16.4335 11.0389C16.5602 11.162 16.6394 11.326 16.6571 11.5018C16.6747 11.6777 16.6297 11.8541 16.53 12L12.53 16C12.4633 16.0756 12.3819 16.1367 12.2908 16.1797C12.1997 16.2227 12.1007 16.2466 12 16.25Z"
                fill="#ffffff"
              />
            </svg>
            <p>Dashboard</p>
          </div>
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <p>Products</p>
          </div>
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>

            <p>Categories</p>
          </div>
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <p>Products</p>
          </div>
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <p>Products</p>
          </div>
          <div className="flex gap-5 w-full items-center py-3 px-6 hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <p>Products</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidenav;
