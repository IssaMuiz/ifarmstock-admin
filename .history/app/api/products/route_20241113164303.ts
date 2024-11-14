/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { title, description, price, images, category } = await req.json();

    console.log(title, description, price, images, category);

    if (!title || !description || !price || !category || !images) {
      return NextResponse.json({ message: "All fields are required" });
    }

    const newProduct = await new Products({
      title,
      description,
      price,
      category,
      images,
    });
    await newProduct.save();
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const products = await Products.find().skip(skip).limit(limit);
    const totalProducts = await Products.countDocuments();

    return new Response(
      JSON.stringify({
        products,
        totalPages: Math.ceil(totalProducts / limit),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching products" }, error);
  }
}
