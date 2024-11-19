/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import Products from "./models/product";
import { connectDB } from "./config/mongodb";
import { redirect } from "next/navigation";

export const addProduct = async (data: FormData) => {
  const title = data.get("title");
  const description = data.get("description");
  const title = data.get("title");
  const title = data.get("title");
  const title = data.get("title");

  try {
    await connectDB();

    const newProduct = new Products({
      title,
      description,
      price,
      images,
      category,
    });

    await newProduct.save();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Product");
  }

  revalidatePath("/products");
  redirect("/products");
};
