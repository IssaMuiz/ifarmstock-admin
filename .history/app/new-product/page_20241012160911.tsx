import React from "react";

const NewProduct = () => {
  return (
    <section className="mt-24 min-h-screen  mx-12 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Add New Product</h1>
      </div>
      <form className="bg-white rounded-sm shadow-md">
        <div className="px-5 md:px-12">
          <h2 className="text-lg font-semibold mb-3 pt-5">Title</h2>
          <input
            type="text"
            placeholder="Product title"
            className="w-full border border-gray-300 rounded-sm p-2"
          />
        </div>
        <div className="px-5 md:px-12">
          <h2 className="text-lg font-semibold mb-3 pt-5">Select Category</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="No category selected"
              className="w-full border border-gray-300 rounded-sm p-2"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewProduct;
