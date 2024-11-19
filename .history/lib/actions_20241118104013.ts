/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import Products from "./models/product";
import { connectDB } from "./config/mongodb";
import { redirect } from "next/navigation";
import { uploadToCloundinary } from "./config/cloudinary";
export const addProduct = async (data: FormData) => {
  try {
    await connectDB();
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const price = parseInt(data.get("price") as string);
    const images = data.get("images") as File;
    const category = data.get("category") as string;

    if (!images) {
      throw new Error("Image is required");
    }

    const imageUrl = await uploadToCloundinary(images);

    const newProduct = new Products({
      title,
      description,
      price,
      images: imageUrl,
      category,
    });

    await newProduct.save();
    redirect("/products");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Product");
  }
};
