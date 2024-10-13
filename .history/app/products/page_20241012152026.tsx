import React from "react";

const Products = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button
          type="button"
          className="p-3 font-semibold text-lg bg-green-500 hover:bg-green-600 rounded-sm text-white"
        >
          New product
        </button>
      </div>
      <hr />
      <div className="bg-white rounded-sm md:overflow-x-auto mt-8">
        <div className="relative pt-5 mx-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 absolute left-3 top-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            className="p-3 pl-12 w-full border border-gray-300 rounded-sm"
            type="text"
            placeholder="Start typing to search for products"
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
