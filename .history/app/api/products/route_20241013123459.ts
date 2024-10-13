/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  await connect();
  if (req.method === "POST") {
    try {
      const { title, description, price, images, category } = await req.json();

      console.log(title, description, price, images, category);

      if (!title || !description || !price || !category || !images) {
        return NextResponse.json({ message: "All fields are required" });
      }

      const newProduct = await Products.create({
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
  } else if (req.method === "GET") {
    try {
      const products = await Products.find({});

      return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message });
    }
  } else {
    return NextResponse.json({ message: "Only POST method is allowed" });
  }
}
