/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

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

/* export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    console.log("Received delete request for ID:", id);
    if (!id) {
      return NextResponse.json({ error: "Invalid product ID" });
    }
    const deleteProduct = await Products.findByIdAndDelete(id);

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
 */
