/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath, redirect } from "next/cache";
import Products from "./models/product";
import { connectDB } from "./config/mongodb";
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

    await Products.create({
      title,
      description,
      price,
      images: imageUrl,
      category,
    });

    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Product");
  }
};