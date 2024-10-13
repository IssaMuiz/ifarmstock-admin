import React from "react";

const NewProduct = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="bg-white mx-12 rounded-sm shadow-md">
        <div className="px-12">
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
