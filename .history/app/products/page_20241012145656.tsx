import React from "react";

const Products = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          type="button"
          className="p-3 font-semibold text-base bg-green-600 hover:bg-green-700"
        >
          New product
        </button>
      </div>
    </section>
  );
};

export default Products;
