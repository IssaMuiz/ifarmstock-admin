/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import Products from "./models/product";
import { connectDB } from "./config/mongodb";
import { redirect } from "next/navigation";

export const addProduct = async (formData: any) => {
  const { title, description, price, images, category } =
    Object.fromEntries(formData);

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
