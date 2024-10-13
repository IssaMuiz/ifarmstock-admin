import React from "react";

const NewProduct = () => {
  return (
    <section className="mt-24 min-h-screen  mx-12 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Add New Product</h1>
      </div>
      <div className="bg-white rounded-sm shadow-md">
        <div className="px-5 md:px-12">
          <h2 className="text-xl font-semibold mb-3 pt-5">Title</h2>
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
