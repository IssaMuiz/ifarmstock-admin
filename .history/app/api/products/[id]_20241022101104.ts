/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connect();

    const host = req.headers.get("host") || "localhost";
    const { searchParams } = new URL(req.url || "", `http://${host}`);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updateData =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);

    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}
