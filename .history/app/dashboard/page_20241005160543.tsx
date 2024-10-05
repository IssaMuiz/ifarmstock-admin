"use client";
import PriceDisplay from "@/components/priceDisplay";
import React from "react";

const DashBoard = () => {
  const price = 12000000;
  const price2 = 200000;
  return (
    <section className="mt-24">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        <div className="flex flex-col gap-5  bg-white rounded-sm shadow-md p-8">
          <p className="text-gray-500 font-semibold">Total sells</p>
          <div className="flex justify-between items-center md:flex-col gap-2">
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
              <p className="text-xs text-gray-500">Compared to last month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-sm shadow-md p-8">
          <p className="text-gray-500 font-semibold">Average order value</p>
          <div className="flex justify-between items-center md:flex-col gap-2">
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
              <p className="text-xs text-gray-500">Compared to last month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-sm shadow-md p-8">
          <p className="text-gray-500 font-semibold">Total orders</p>
          <div className="flex justify-between items-center md:flex-col gap-2">
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
              <p className="text-xs text-gray-500">Compared to last month</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 shadow-md">
        <div className="bg-white">
          <h1>Active users</h1>
          <div className="bg-green-200 text-2xl font-semibold text-center p-3 text-green-600">
            {148}
          </div>
          <div className="flex justify-between items-center p-2">
            <p>Active pages</p>
            <p>Users</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
