/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  title: string;
  images: File[];
  description: string;
  price: number;
  category: string;
}

const NewProduct = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    images: [],
    description: "",
    price: 0,
    category: "",
  });
  const categories = ["Electronics", "Clothing", "Shoes"];
  const [preview, setPreview] = useState<string[]>([]);

  const router = useRouter();

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "images") {
      const target = e.target as HTMLInputElement;
      const selectedFiles = Array.from(target.files || []);

      setProduct((prev) => ({ ...prev, images: selectedFiles }));

      const newPreview = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreview(newPreview);
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    try {
      const imageUploadPromises = product.images.map((image) => {
        const imageFormData = new FormData();

        imageFormData.append("file", image);
        imageFormData.append("upload_preset", "issa_muiz_preset");

        return axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          imageFormData
        );
      });

      const imageUploadResponses = await Promise.all(imageUploadPromises);

      const imageUrls = imageUploadResponses.map(
        (response) => response.data.secure_url
      );
      imageUrls.forEach((url) => {
        formData.append("images", url);
      });
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProduct({
        title: "",
        images: [],
        description: "",
        price: 0,
        category: "",
      });
      setPreview([]);
      if (res.status === 200) {
        alert("Product added successfully");

        router.push("/products");
      } else {
        alert(`Error: ${res.data.error}`);
      }
    } catch {
      alert("An unexpected error occured");
    }
  };
  return (
    <section className="mt-24 min-h-screen  mx-2 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Add New Product</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-sm shadow-md py-5"
      >
        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="text-md font-semibold">Title</label>
          <input
            type="text"
            placeholder="Product title"
            className="w-full border border-gray-300 rounded-sm p-2"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div className="px-5 md:px-32 mb-3">
          <label htmlFor="category" className="text-md font-semibold pt-5">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Images
          </label>
          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div className="space-y-1 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <div className="text-gray-600">
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:text-primary-700"
                >
                  Click to upload
                </a>{" "}
                or drag and drop
              </div>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            <input
              name="images"
              onChange={handleChange}
              type="file"
              className="sr-only"
              accept="image/*"
              required
            />
          </label>
          <div>
            {preview.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Preview ${index}`}
                height={100}
                width={100}
              />
            ))}
          </div>
        </div>
        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="text-md font-semibold">Description</label>
          <textarea
            placeholder="Product description"
            className="w-full border border-gray-300 rounded-sm p-2"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="text-md font-semibold">Price</label>
          <input
            type="number"
            placeholder="Product price"
            className="w-full border border-gray-300 rounded-sm p-2"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="px-5 md:px-32 mb-3 pt-5">
          <button
            type="submit"
            className="p-2 w-full hover:bg-green-600 bg-green-500 text-white font-semibold rounded-sm"
          >
            Save product
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewProduct;
