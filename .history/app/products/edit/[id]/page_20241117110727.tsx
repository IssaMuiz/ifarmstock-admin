/* eslint-disable @typescript-eslint/no-explicit-any */

import EditProductForm from "@/components/editProductForm";
import React from "react";

type Params = {
  params: {
    id: string;
  };
};

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Product");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const EditProduct = async ({ params }: Params) => {
  const { id } = await params;

  const { product } = await getTopicById(id);
  console.log("id", id);

  const { title, price, description, category, images } = product;

  return (
    <section className="mt-14 min-h-screen  mx-2 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Edit Product</h1>
      </div>
      <EditProductForm
        id={id}
        title={title}
        price={price}
        description={description}
        category={category}
        images={images}
      />
    </section>
  );
};

export default EditProduct;
