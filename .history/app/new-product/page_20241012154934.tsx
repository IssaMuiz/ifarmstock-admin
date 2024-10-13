import React from "react";

const NewProduct = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="bg-white mx-8 rounded-md shadow-md">
        <h2>Title</h2>
        <input
          type="text"
          placeholder="Product title"
          className="w-full border border-gray-300 rounded-sm p-2"
        />
      </div>
    </section>
  );
};

export default NewProduct;
