import { NextResponse, NextRequest } from "next/server";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import mongoose from "mongoose";

await connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
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
    const { id } = params;
    const { title, description, price, category, images, stock } =
      await req.json();

    if (!title || !description || !price || !category || !images || !stock) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { title, description, price, category, images, stock },
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
    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" });
    }
    const deleteProduct = await Products.findByIdAndDelete(id);

    if (!deleteProduct) {
      return NextResponse.json(
        { message: "Product not found" },
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
