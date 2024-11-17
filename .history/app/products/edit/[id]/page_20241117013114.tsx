/* eslint-disable @typescript-eslint/no-explicit-any */

import EditProductForm from "@/components/editProductForm";

type Params = {
  params: {
    id: string;
  };
};

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Product");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const EditProduct = async ({ params }: Params) => {
  const { id } = params;

  const { product } = await getTopicById(id);
  console.log("id", id);

  const { title, price, description, category, images } = product;

  /* const handleChange = async (
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
  }; */
  return (
    <section className="mt-14 min-h-screen  mx-2 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Edit Product</h1>
      </div>
      <EditProductForm
        title={title}
        price={price}
        description={price}
        category={category}
        images={images}
      />
    </section>
  );
};

export default EditProduct;
