import { NextResponse, NextRequest } from "next/server";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import mongoose from "mongoose";

await connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET request received with params:", params);
  if (!params || !params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = await Products.findById(params.id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { title, description, price, category, images } = await req.json();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" });
    }

    if (!title || !description || !price || !category || !images) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { title, description, price, category, images },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      updatedProduct
    );
  } catch (error) {
    console.error("Error updating product", error);
    return NextResponse.json(
      { message: "Server error, try again later" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    console.log("Received delete request for ID:", id);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" });
    }
    const deleteProduct = await Products.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );

    if (!deleteProduct) {
      return NextResponse.json(
        { message: "Product not found for id", id },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    return NextResponse.json(
      { message: "Server error, try again later" },
      { status: 500 }
    );
  }
}
