/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";

type Params = {
  params: {
    id: string;
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    if (!params || !params.id) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }
    const { id } = params;

    const { title, price, category, description, images } = await req.json();

    const updatedProduct = await Products.findByIdAndUpdate(id, {
      title,
      price,
      description,
      category,
      images,
    });

    return NextResponse.json(updatedProduct, {
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product", error);
    return NextResponse.json({ error: "Server Error" });
  }
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    console.log("GET request received with params:", params);
    if (!params || !params.id) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const { id } = params;

    const product = await Products.findOne({ _id: id });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
}
