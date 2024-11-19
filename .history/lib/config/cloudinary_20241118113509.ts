/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREY,
});

export async function uploadToCloundinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("upload_preset", "issa_muiz_preset");

  const uploadResponse = await axios.post(
    "https://api.cloudinary.com/v1_1/dzjcenb8h/image/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return uploadResponse.data.secure_url;
}

export default cloudinary;
