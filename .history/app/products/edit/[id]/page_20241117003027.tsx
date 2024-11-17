/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import EditProductForm from "@/components/editProductForm";

interface ProductForm {
  title: string;
  newImages: File[];
  description: string;
  price: number;
  category: string;
  existingImages: File[];
}

const EditProduct = ({ id }) => {
  const { id } = params;

  console.log("id", id);

  const categories = ["Electronics", "Clothing", "Shoes", "Phones"];
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    category: "",
    price: 0,
    newImages: [],
    existingImages: [],
  });

  const router = useRouter();
  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        if (!id) return;
        const { data } = await axios.get(`/api/products/${id}`);
        console.log(data);
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          newImages: data.images || [],
          existingImages: data.existingImages || [],
          price: data.price,
        });

        const imageUrls = data.images.filter(
          (img: any): img is string => typeof img === "string"
        );

        setPreview(imageUrls);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct(id);
  }, [id]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "issa_muiz_preset");

    const uploadResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dzjcenb8h/image/upload",
      formData
    );

    return uploadResponse.data.secure_url;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!form || !e.target.files) return;

    const fileArray = Array.from(e.target.files);

    const newPreview = fileArray.map((file) => URL.createObjectURL(file));
    setPreview(newPreview);

    setForm({ ...form, newImages: fileArray });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form?.title);
      formData.append("description", form?.description);
      formData.append("price", form?.price.toString());
      formData.append("category", form?.category);

      form?.newImages.forEach((file: File) => {
        if (file instanceof File) {
          formData.append("images", file);
        } else {
          formData.append("existingImages", file);
        }
      });

      const response = await axios.put(
        `/api/products/${productId}`,
        uploadImage
      );

      if (response.status === 200) {
        router.push("/products");
        toast.success("Product update successfully", {
          autoClose: 6000,
          position: "top-right",
          closeButton: false,
          hideProgressBar: true,
          style: {
            width: "300px",
            fontSize: "35px",
            marginTop: "50px",
            padding: "15px",
          },
        });
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="mt-14 min-h-screen  mx-2 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Edit Product</h1>
        <EditProductForm
          id={id}
          title={title}
          price={price}
          category={category}
          description={description}
          images={images}
        />
      </div>
    </section>
  );
};

export default EditProduct;
