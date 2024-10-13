/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();
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
  await connect();

  try {
    const products = await Products.find({});

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching products" }, error);
  }
}
