"use server";

import { revalidatePath } from "next/cache";
import Products from "./models/product";
import { connectDB } from "./config/mongodb";
import { redirect } from "next/navigation";
import { uploadToCloundinary } from "./config/cloudinary";

export const addProduct = async (data: FormData) => {
  try {
    const { title, description, price, images, category } =
      Object.fromEntries(data);

    await connectDB();

    const file = images as File;
    if (!(file instanceof File)) {
      throw new Error("Invalid image file.");
    }
    const imageUrl = await uploadToCloundinary(file);

    const newProduct = new Products({
      title,
      description,
      price,
      images: imageUrl,
      category,
    });

    await newProduct.save();

    const totalProducts = await Products.countDocuments();
    const productPerPage = 10;
    const totalPages = Math.ceil(totalProducts / productPerPage);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Product");
  }
  revalidatePath("/products");
  redirect(`/products?page=${totalPages}`);
};
