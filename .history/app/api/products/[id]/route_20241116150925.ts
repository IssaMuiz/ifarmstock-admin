/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import { uploadToCloudinary } from "@/lib/config/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return NextResponse.json({ error: "Error parsing form data" });
      }

      const { title, description, category, price } = await fields;
      const uploadedImages = [];

      if (files.images) {
        const images = Array.isArray(files.images)
          ? files.images
          : [files.images];

        for (const image of images) {
          const uploadedUrl = await uploadToCloudinary(
            image.filepath,
            "product-images"
          );

          uploadedImages.push(uploadedUrl);
        }
        const updatedProduct = await Products.findByIdAndUpdate(
          id,
          {
            title,
            description,
            price,
            category,
            images: uploadedImages.length > 0 ? uploadedImages : undefined,
          },
          { new: true }
        );

        if (!updatedProduct) {
          return NextResponse.json({ error: "Product not found" });
        }

        return NextResponse.json(updatedProduct);
      }
    });
  } catch (error) {
    console.error("Error updating product", error);
    return NextResponse.json({ error: "Server Error" });
  }
}

export async function GET(params: any) {
  await connectDB();
  const { id } = params;
  try {
    console.log("GET request received with params:", id);
    if (!id) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

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
