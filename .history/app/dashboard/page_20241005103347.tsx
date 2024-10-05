"use client";

import React from "react";

const DashBoard = () => {
  return (
    <section className="mt-24">
      <div>
        <p className="text-2xl font-semibold">Dashboard</p>
      </div>
      <div>
        <div className="flex flex-col gap-5 items-center justify-between mt-10 bg-white rounded-sm shadow-md">
          <p className="">Total sells</p>
          <div>
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
              </span>{" "}
              <span>34.7%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
