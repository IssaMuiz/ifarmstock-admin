/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { file } = req.json();

      const uploadResponses = await cloudinary.uploader.upload(file, {
        folder: "ecommerce/products",
      });
      return NextResponse.json(
        { url: uploadResponses.secure_url },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Error uploading image:", error);

      return NextResponse.json(
        { message: "An error occured while uploading the image" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 500 }
    );
  }
}
