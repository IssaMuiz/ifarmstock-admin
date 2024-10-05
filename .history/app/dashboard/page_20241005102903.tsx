"use client";

import React from "react";

const DashBoard = () => {
  return (
    <section className="mt-32">
      <div>
        <p className="text-3xl font-semibold">Dashboard</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Total sells</p>
          <div>
            <p className="text-green-600 flex items-center gap-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
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
