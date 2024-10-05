"use client";

import React from "react";

const DashBoard = () => {
  return (
    <section className="mt-32">
      <div>
        <p>Dashboard</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Total sells</p>
          <div>
            <p className="text-green-600">
              <span></span> <span>34.7%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
