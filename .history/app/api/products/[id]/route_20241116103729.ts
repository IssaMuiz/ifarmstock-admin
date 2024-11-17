/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse, NextApiRequest } from "next";
import mongoose from "mongoose";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import { uploadToCloudinary } from "@/lib/config/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await connectDB();

  if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing product ID" });
  }

  if (req.method === "GET") {
    try {
      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product", error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(400).json({ message: "Failed to parse form data" });
        }

        const { title, description, category, price } = fields;
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
            return res.status(400).json({ message: "Product not found" });
          }

          return res.status(200).json(updatedProduct);
        }
      });
    } catch (error) {
      console.error("Error updating product", error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleteProduct = await Products.findByIdAndDelete(id);

      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
/* export async function GET(
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
 */

/* export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
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
 */
