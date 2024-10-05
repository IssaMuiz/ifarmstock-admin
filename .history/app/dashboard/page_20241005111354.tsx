"use client";
import PriceDisplay from "@/components/priceDisplay";
import React from "react";

const DashBoard = () => {
  const price = 12000000;
  return (
    <section className="mt-24">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
      </div>
      <div>
        <div className="flex flex-col gap-5 mt-10 bg-white rounded-sm shadow-md p-8">
          <p className="text-gray-500 font-semibold">Total sells</p>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold">
              <PriceDisplay price={price} />
            </div>
            <div className="flex flex-col items-end">
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
      </div>
    </section>
  );
};

export default DashBoard;
