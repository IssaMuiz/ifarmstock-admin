/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import { uploadToCloudinary } from "@/lib/config/cloudinary";

await connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    console.log("GET request received with params:", id);
    if (!params.id) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Products.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();

    const updatedField: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: formData.get("price"),
      images: formData.get("images"),
    };

    const newImages = formData.getAll("newImages");
    if (newImages.length > 0) {
      const uploadedImages = [];

      for (const image of newImages) {
        if (image instanceof Blob) {
          const buffer = Buffer.from(await image.arrayBuffer());

          const cloudinaryResponse = await uploadToCloudinary(
            buffer,
            "issa-muiz-preset"
          );
          uploadedImages.push(cloudinaryResponse.secure_url);
        }
      }
      updatedField.images = [
        ...uploadedImages,
        ...(formData.getAll("existingImages") || []),
      ];
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      params,
      updatedField,
      {
        new: true,
      }
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
