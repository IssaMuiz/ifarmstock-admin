import React from "react";

const NewProduct = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="bg-white mx-12 rounded-md shadow-md">
        <div className="px-9">
          <h2 className="text-xl font-semibold">Title</h2>
          <input
            type="text"
            placeholder="Product title"
            className="w-full border border-gray-300 rounded-sm p-2"
          />
        </div>
      </div>
    </section>
  );
};

export default NewProduct;
