"use client";
import PriceDisplay from "@/components/priceDisplay";
import RecentOrders from "@/components/recentOrders";
import dynamic from "next/dynamic";
import React from "react";

const DashBoard = () => {
  const price = 12000000;
  const price2 = 200000;

  const BarChart = dynamic(() => import("../../components/barChart"), {
    ssr: false,
  });

  return (
    <section className="mt-24 min-h-screen">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        <div className="flex flex-col gap-5  bg-white rounded-sm shadow-md">
          <p className="text-gray-500 font-semibold pt-4 pl-3">Total sells</p>
          <div className="flex justify-between items-center md:flex-col gap-2 p-7">
            <div className="text-2xl font-semibold">
              <PriceDisplay price={price} />
            </div>
            <div className="flex flex-col items-end md:items-center">
              <p className="text-green-600 flex items-center gap-1 font-semibold">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
                <span>34.7%</span>
              </p>
              <p className="text-gray-500 text-xs whitespace-nowrap">
                Compared to last month
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-sm shadow-md">
          <p className="text-gray-500 font-semibold whitespace-nowrap pt-4 pl-3">
            Average order value
          </p>
          <div className="flex justify-between items-center md:flex-col gap-2 p-7">
            <div className="text-2xl font-semibold">
              <PriceDisplay price={price2} />
            </div>
            <div className="flex flex-col items-end md:items-center">
              <p className="text-red-600 flex items-center gap-1 font-semibold">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                    />
                  </svg>
                </span>
                <span>54.7%</span>
              </p>
              <p className="text-gray-500 text-xs whitespace-nowrap">
                Compared to last month
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-sm shadow-md">
          <p className="text-gray-500 font-semibold whitespace-nowrap pt-4 pl-3">
            Total orders
          </p>
          <div className="flex justify-between items-center md:flex-col gap-2 p-7">
            <div className="text-2xl font-semibold">{580}</div>
            <div className="flex flex-col items-end md:items-center">
              <p className="text-green-600 flex items-center gap-1 font-semibold">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
                <span>24.7%</span>
              </p>
              <p className="text-gray-500 text-xs whitespace-nowrap">
                Compared to last month
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 shadow-md">
        <div className="bg-white col-span-1">
          <h1 className="mx-5 text-xl font-semibold pt-5">Active users</h1>
          <div className="bg-green-200 text-2xl font-semibold text-center p-5 text-green-600 mx-5 h-20 mt-5 rounded-sm">
            {148}
          </div>
          <div className="flex justify-between items-center p-2 mx-5 font-semibold text-gray-500">
            <p>Active pages</p>
            <p>Users</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/products/Chi-live-broiler</p>
            <p>{15}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/categories/day-old-chicks</p>
            <p>{12}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/categories/frozen-chickens</p>
            <p>{8}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/account/orders</p>
            <p>{6}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/cart</p>
            <p>{4}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/checkout</p>
            <p>{4}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center p-2 mx-5">
            <p>/pages/about-us</p>
            <p>{1}</p>
          </div>
        </div>

        <div className="bg-white shadow-md col-span-2">
          <p className="text-xl font-semibold mx-5 p-2 ">Income statistics</p>
          <div className="p-4">
            <BarChart />
          </div>
        </div>
      </div>
      <div className="col-span-3 mt-5">
        <RecentOrders />
      </div>
      <footer className="mt-5 text-xs text-gray-500 font-semibold ">
        <hr className="-mx-5" />
        <p className="p-4 md:text-center">
          iFarmStock Admin - livestock farming made easy &copy; IfarmStock.ng
          2024
        </p>
      </footer>
    </section>
  );
};

export default DashBoard;
