/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse, NextApiRequest } from "next";
import Products from "@/lib/models/product";
import { connectDB } from "@/lib/config/mongodb";
import { uploadToCloudinary } from "@/lib/config/cloudinary";

await connectDB();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;
  console.log("GET request received with params:", id);
  if (!id) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: "Invalid product" });
  }
  try {
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
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
