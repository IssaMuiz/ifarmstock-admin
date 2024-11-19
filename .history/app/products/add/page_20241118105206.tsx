import ImagePreview from "@/components/imagePreview";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addProduct } from "@/lib/actions";

const NewProduct = () => {
  const categories = ["Electronics", "Clothing", "Shoes", "Phones"];

  /* async function handleSubmit(formData: FormData) {
    "use server";

    try {
      const product = await addProduct(formData);
      console.log("Product added successfully", product);
      return { success: true, message: "Product added successfully" };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        message: error.message || "Failed to add product",
      };
    }
  } */

  return (
    <section className="mt-14 min-h-screen  mx-2 md:mx-24">
      <div>
        <h1 className="text-2xl font-semibold mb-8">Add New Product</h1>
      </div>
      <form action={addProduct} className="bg-white rounded-sm shadow-md py-5">
        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="text-md font-semibold">Title</label>
          <input
            type="text"
            placeholder="Product title"
            className="w-full border border-gray-300 rounded-sm p-2"
            name="title"
            required
            /* value={product.title} */
            /* onChange={handleChange} */
          />
        </div>
        <div className="px-5 md:px-32 mb-3">
          <label htmlFor="category" className="text-md font-semibold pt-5">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            /* value={product.category}
            onChange={handleChange} */
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
          <ImagePreview />
        </div>
        <div className="px-5 md:px-32 mb-3 pt-5">
          <label className="text-md font-semibold">Description</label>
          <textarea
            placeholder="Product description"
            className="w-full border border-gray-300 rounded-sm p-2"
            name="description"
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
            required
          />
        </div>
        <div className="px-5 md:px-32 mb-3 pt-5">
          <button
            type="submit"
            className="p-2 w-full hover:bg-green-600 bg-green-500 text-white font-semibold rounded-sm"
          >
            {/* loading ? <Spinner /> : */ "Save product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewProduct;
